-- Shared movement library (owner_id null), imported from free-exercise-db (Unlicense) by
-- scripts/import-movement-library.js.
-- * library_key: the source exercise id, the key the import upserts on. Only library movements have one.
-- * primary_muscles / secondary_muscles: the source's muscle groups, to search and group the library.
-- * image_paths: object paths in the public `movement-images` bucket (the first one is the thumbnail).
--   Images are copied to Storage rather than hot-linked from GitHub, which is not an image CDN.

alter table public.movements
  add column library_key text unique,
  add column primary_muscles text[] not null default '{}',
  add column secondary_muscles text[] not null default '{}',
  add column image_paths text[] not null default '{}',
  add constraint movements_library_key_shared check (library_key is null or owner_id is null);

-- Public read (served by URL, no policy needed); only the service role writes
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('movement-images', 'movement-images', true, 1048576, array['image/jpeg', 'image/png'])
on conflict (id) do nothing;
