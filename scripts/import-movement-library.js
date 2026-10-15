#!/usr/bin/env node
// Imports the shared movement library (movements with owner_id null) from free-exercise-db
// (https://github.com/yuhonas/free-exercise-db, Unlicense), pinned to one commit.
// Stretching and cardio entries are skipped: the app logs loaded sets. Names stay in English;
// the source id is kept as library_key.
//
// Images are copied to the public `movement-images` Storage bucket (`<source id>/0.jpg`…) instead of
// hot-linking GitHub, which is not an image CDN and could move. image_paths holds the object paths.
//
// Safe to re-run: movements are upserted on library_key, and a movement's images are only uploaded
// when its image_paths are not already the expected ones (--refresh-images re-uploads them all).
// Movements removed upstream are left in place: programs and logs may point to them.
//
// Usage (local):
//   SUPABASE_SERVICE_ROLE_KEY=$(supabase status -o json | jq -r .SERVICE_ROLE_KEY) \
//     node scripts/import-movement-library.js [--dry-run] [--refresh-images]
// The target defaults to the local stack; another one is named with --url=https://… and needs --yes.
// Neither the root .env nor SUPABASE_URL is read, so the import never targets prod by accident.

const { createClient } = require("@supabase/supabase-js");

const SOURCE_COMMIT = "f00c92c7dcf1216a928a52c3706c7ce8e2f71ed5";
const SOURCE_BASE = `https://raw.githubusercontent.com/yuhonas/free-exercise-db/${SOURCE_COMMIT}`;
const BUCKET = "movement-images";
const SKIPPED_CATEGORIES = new Set(["stretching", "cardio"]);
const UPLOAD_CONCURRENCY = 8;
const BATCH_SIZE = 200;

const isLocalHost = (url) => ["localhost", "127.0.0.1", "[::1]"].includes(new URL(url).hostname);
const sameArray = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

function parseArgs(argv) {
  const args = { dryRun: false, yes: false, refreshImages: false, url: "http://127.0.0.1:54321" };
  for (const a of argv) {
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--yes") args.yes = true;
    else if (a === "--refresh-images") args.refreshImages = true;
    else if (a.startsWith("--url=")) args.url = a.slice("--url=".length);
    else throw new Error(`Unknown option ${a}`);
  }
  return args;
}

// A source exercise → a library movement row
function toMovement(exercise) {
  return {
    library_key: exercise.id,
    owner_id: null,
    name: exercise.name.trim(),
    equipment: exercise.equipment ?? null,
    // Body-only movements are logged as bodyweight, plus any added load
    load_type: exercise.equipment === "body only" ? "bodyweight_plus" : "external",
    primary_muscles: exercise.primaryMuscles ?? [],
    secondary_muscles: exercise.secondaryMuscles ?? [],
    image_paths: exercise.images ?? [],
  };
}

async function fetchOk(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url}: ${res.status}`);
  return res;
}

async function existingLibrary(supabase) {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await supabase
      .from("movements")
      .select("library_key, image_paths")
      .not("library_key", "is", null)
      .range(from, from + 999);
    if (error) throw error;
    rows.push(...data);
    if (data.length < 1000) break;
  }
  return new Map(rows.map((r) => [r.library_key, r.image_paths]));
}

async function uploadImages(supabase, movement) {
  for (const path of movement.image_paths) {
    const res = await fetchOk(`${SOURCE_BASE}/exercises/${path}`);
    const body = Buffer.from(await res.arrayBuffer());
    const { error } = await supabase.storage.from(BUCKET).upload(path, body, {
      contentType: res.headers.get("content-type") ?? "image/jpeg",
      cacheControl: "31536000",
      upsert: true,
    });
    if (error) throw new Error(`Upload ${path}: ${error.message}`);
  }
}

// Runs fn over items, `limit` at a time
async function eachLimit(items, limit, fn) {
  let next = 0;
  const worker = async () => {
    while (next < items.length) await fn(items[next++]);
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const url = args.url;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is required");
  if (!isLocalHost(url) && !args.yes) throw new Error(`${url} is not local: pass --yes to import there`);

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const exercises = await (await fetchOk(`${SOURCE_BASE}/dist/exercises.json`)).json();
  const movements = exercises.filter((e) => !SKIPPED_CATEGORIES.has(e.category)).map(toMovement);
  const existing = await existingLibrary(supabase);
  const needImages = movements.filter(
    (m) => args.refreshImages || !sameArray(existing.get(m.library_key) ?? [], m.image_paths),
  );
  const created = movements.filter((m) => !existing.has(m.library_key)).length;

  console.log(
    `${exercises.length} source exercises, ${movements.length} kept: ${created} new, ` +
      `${movements.length - created} to update, ${needImages.length} needing images`,
  );
  if (args.dryRun) return;

  // Images first: a row only records image paths once they are uploaded
  let uploaded = 0;
  await eachLimit(needImages, UPLOAD_CONCURRENCY, async (m) => {
    await uploadImages(supabase, m);
    if (++uploaded % 100 === 0) console.log(`  images: ${uploaded}/${needImages.length} movements`);
  });

  for (let i = 0; i < movements.length; i += BATCH_SIZE) {
    const { error } = await supabase
      .from("movements")
      .upsert(movements.slice(i, i + BATCH_SIZE), { onConflict: "library_key" });
    if (error) throw error;
  }

  const { count, error } = await supabase
    .from("movements")
    .select("id", { count: "exact", head: true })
    .not("library_key", "is", null);
  if (error) throw error;
  console.log(`Done: ${count} library movements, images uploaded for ${uploaded}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
