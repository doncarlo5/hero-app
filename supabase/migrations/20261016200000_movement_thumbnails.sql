-- Library thumbnails: a 160 px WebP of each movement's first image, at thumbs/<id>/0.webp, made by
-- scripts/import-movement-library.js. The bucket accepts WebP for them.
update storage.buckets
set allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'movement-images';
