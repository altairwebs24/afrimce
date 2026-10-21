create policy "Public read access for media bucket"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');