#!/usr/bin/env node
// Audits the shared movement library against Storage: every image a row points to, and its list
// thumbnail, must be served, decode, and have a sane size; library keys, names and aliases must be clean.
// Read-only: it reads rows with SQL and images over HTTP (the bucket is public).
//
// Usage (local by default):
//   node scripts/audit-movement-library.js
//   SUPABASE_DB_URL=postgresql://… node scripts/audit-movement-library.js --url=https://<ref>.supabase.co
// For prod, scripts/audit-movement-library-prod.sh reads the database password from the Keychain.
// Exits with code 1 when a problem is found, so it can gate a deploy or a CI job.
require("../apps/api/config/load-env");
const { Client } = require("pg");
const sharp = require("sharp");

const BUCKET = "movement-images";
const CONCURRENCY = 16;
const THUMB_SIZE = 160;
// Same rule as the import and the app
const thumbnailPath = (imagePath) => `thumbs/${imagePath.replace(/\.[a-z]+$/i, "")}.webp`;

function parseArgs(argv) {
  const args = { url: "http://127.0.0.1:54321", sample: null };
  for (const a of argv) {
    if (a.startsWith("--url=")) args.url = a.slice("--url=".length);
    else if (a.startsWith("--sample=")) args.sample = Number(a.slice("--sample=".length));
    else throw new Error(`Unknown option ${a}`);
  }
  return args;
}

async function eachLimit(items, limit, fn) {
  let next = 0;
  const worker = async () => {
    while (next < items.length) await fn(items[next++]);
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
}

// Downloads a public object and checks it decodes; returns its size or a problem
async function checkImage(baseUrl, path, expected) {
  const res = await fetch(`${baseUrl}/storage/v1/object/public/${BUCKET}/${path}`);
  if (!res.ok) return { problem: `${path}: HTTP ${res.status}` };
  try {
    const meta = await sharp(Buffer.from(await res.arrayBuffer())).metadata();
    if (expected && (meta.width !== expected.width || meta.height !== expected.height)) {
      return { problem: `${path}: ${meta.width}×${meta.height}, expected ${expected.width}×${expected.height}` };
    }
    if (!meta.width || meta.width < 64 || !meta.height || meta.height < 64) {
      return { problem: `${path}: too small (${meta.width}×${meta.height})` };
    }
    return { ok: true };
  } catch (error) {
    return { problem: `${path}: does not decode (${error.message})` };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const dbUrl = process.env.SUPABASE_DB_URL ?? "postgresql://postgres:postgres@127.0.0.1:54322/postgres";
  const pg = new Client({ connectionString: dbUrl });
  await pg.connect();
  const { rows } = await pg.query(
    `select library_key, name, aliases, image_paths, measure, instructions
     from public.movements where owner_id is null order by library_key`,
  );
  await pg.end();

  const problems = [];
  const warnings = [];

  // Rows
  const keys = new Set();
  for (const row of rows) {
    if (!row.library_key) problems.push(`"${row.name}": library movement without library_key`);
    else if (keys.has(row.library_key)) problems.push(`${row.library_key}: duplicate library_key`);
    keys.add(row.library_key);
    if (row.name.trim() !== row.name || row.name === "") problems.push(`${row.library_key}: blank or untrimmed name`);
    const lower = row.name.toLowerCase();
    if (row.aliases.some((a) => a.toLowerCase() === lower)) warnings.push(`${row.library_key}: an alias equals the name`);
    if (row.image_paths.length === 0) warnings.push(`${row.library_key}: no image`);
    if (row.instructions.length === 0) warnings.push(`${row.library_key}: no instructions`);
  }

  // Media: every image and the thumbnail of the first one
  const toCheck = [];
  for (const row of rows) {
    row.image_paths.forEach((path, i) => {
      toCheck.push({ path });
      if (i === 0) toCheck.push({ path: thumbnailPath(path), expected: { width: THUMB_SIZE, height: THUMB_SIZE } });
    });
  }
  const checked = args.sample ? toCheck.slice(0, args.sample) : toCheck;
  let done = 0;
  await eachLimit(checked, CONCURRENCY, async (item) => {
    const result = await checkImage(args.url, item.path, item.expected);
    if (result.problem) problems.push(result.problem);
    if (++done % 500 === 0) console.log(`  ${done}/${checked.length} files checked`);
  });

  console.log(
    `${rows.length} library movements, ${checked.length} files checked: ` +
      `${problems.length} problems, ${warnings.length} warnings`,
  );
  for (const w of warnings.slice(0, 10)) console.log(`  warning: ${w}`);
  if (warnings.length > 10) console.log(`  … ${warnings.length - 10} more warnings`);
  for (const p of problems.slice(0, 50)) console.log(`  problem: ${p}`);
  if (problems.length > 50) console.log(`  … ${problems.length - 50} more problems`);
  if (problems.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
