-- ===================================
-- Create Storage Bucket for Generated Images
-- ===================================

-- Create storage bucket for AI generated images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'generated-images',
  'generated-images',
  true, -- Public access for easy image display
  10485760, -- 10MB limit per file
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ===================================
-- Storage Policies
-- ===================================

-- Policy: Allow authenticated users to upload images
CREATE POLICY "Users can upload their own images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'generated-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Allow public read access to all images
CREATE POLICY "Public can view all images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'generated-images');

-- Policy: Users can update their own images
CREATE POLICY "Users can update their own images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'generated-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
)
WITH CHECK (
  bucket_id = 'generated-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Users can delete their own images
CREATE POLICY "Users can delete their own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'generated-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- ===================================
-- Comments for documentation
-- ===================================

COMMENT ON TABLE storage.buckets IS 'Storage buckets for file uploads';
COMMENT ON POLICY "Users can upload their own images" ON storage.objects IS 'Allows authenticated users to upload images to their own folder';
COMMENT ON POLICY "Public can view all images" ON storage.objects IS 'Allows anyone to view images (public bucket)';
COMMENT ON POLICY "Users can update their own images" ON storage.objects IS 'Allows users to update only their own images';
COMMENT ON POLICY "Users can delete their own images" ON storage.objects IS 'Allows users to delete only their own images';

