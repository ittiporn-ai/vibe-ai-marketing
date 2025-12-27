# Supabase Storage Configuration 🗄️

## สรุปการตั้งค่า Storage

เราได้ตั้งค่า **Supabase Storage** สำหรับเก็บภาพที่สร้างจาก AI ให้ถาวรแล้ว ไม่ต้องพึ่งพา URL ชั่วคราวจาก Replicate อีกต่อไป

---

## 🎯 ปัญหาที่แก้ไข

### ปัญหาเดิม:
- ❌ ภาพจาก Replicate มี URL ชั่วคราวที่หมดอายุ
- ❌ ภาพหายหลังจากผ่านไประยะหนึ่ง
- ❌ ไม่สามารถเข้าถึงภาพได้ระยะยาว

### วิธีแก้:
- ✅ ดาวน์โหลดภาพจาก Replicate ทันทีหลังสร้างเสร็จ
- ✅ อัปโหลดไปยัง Supabase Storage
- ✅ ใช้ Public URL จาก Supabase (ถาวร)
- ✅ จัดเก็บตาม user ID เพื่อความเป็นระเบียบ

---

## 📦 Storage Bucket Configuration

### Bucket: `generated-images`

**Properties:**
- **Public:** Yes (เข้าถึงได้สาธารณะ)
- **File Size Limit:** 10MB per file
- **Allowed MIME Types:**
  - `image/png`
  - `image/jpeg`
  - `image/jpg`
  - `image/webp`

**Folder Structure:**
```
generated-images/
├── {user_id_1}/
│   ├── 1703654321000-abc123.png
│   ├── 1703654432000-def456.png
│   └── ...
├── {user_id_2}/
│   ├── 1703654543000-ghi789.png
│   └── ...
└── ...
```

---

## 🔐 Storage Policies (Row Level Security)

### 1. Upload Policy
**Name:** "Users can upload their own images"  
**Operation:** INSERT  
**Target:** authenticated users  
**Rule:** Users can only upload to their own folder (`{user_id}/...`)

```sql
CREATE POLICY "Users can upload their own images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'generated-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

### 2. Read Policy
**Name:** "Public can view all images"  
**Operation:** SELECT  
**Target:** public (ทุกคน)  
**Rule:** ใครก็ได้สามารถดูภาพได้

```sql
CREATE POLICY "Public can view all images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'generated-images');
```

### 3. Update Policy
**Name:** "Users can update their own images"  
**Operation:** UPDATE  
**Target:** authenticated users  
**Rule:** Users can only update their own images

```sql
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
```

### 4. Delete Policy
**Name:** "Users can delete their own images"  
**Operation:** DELETE  
**Target:** authenticated users  
**Rule:** Users can only delete their own images

```sql
CREATE POLICY "Users can delete their own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'generated-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## 🔄 Image Upload Flow

### ขั้นตอนการทำงาน:

1. **User สร้างภาพ** → กด "Generate Image"
2. **API calls Replicate** → Nano Banana Pro สร้างภาพ
3. **Replicate returns URL** → URL ชั่วคราว
4. **Download image** → ดาวน์โหลดภาพจาก Replicate URL
5. **Upload to Supabase** → อัปโหลดไปที่ `generated-images/{user_id}/`
6. **Get public URL** → รับ URL ถาวรจาก Supabase
7. **Save to database** → บันทึก URL ลงฐานข้อมูล
8. **Display image** → แสดงภาพใน UI

### Code Implementation:

```typescript
// app/api/generate-image/route.ts

async function uploadImageToStorage(
  imageUrl: string,
  userId: string,
  supabase: any
): Promise<string> {
  // Download image from Replicate
  const imageResponse = await fetch(imageUrl);
  const imageBuffer = await imageResponse.arrayBuffer();
  const imageBlob = new Blob([imageBuffer], { type: 'image/png' });
  
  // Generate unique filename
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const filename = `${userId}/${timestamp}-${randomString}.png`;
  
  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('generated-images')
    .upload(filename, imageBlob, {
      contentType: 'image/png',
      cacheControl: '3600',
      upsert: false,
    });
  
  if (error) throw error;
  
  // Get public URL
  const { data: publicUrlData } = supabase.storage
    .from('generated-images')
    .getPublicUrl(filename);
  
  return publicUrlData.publicUrl;
}
```

---

## 🌐 Public URL Format

```
https://{project_ref}.supabase.co/storage/v1/object/public/generated-images/{user_id}/{timestamp}-{random}.png
```

**Example:**
```
https://owresixxwaetnspoxpvx.supabase.co/storage/v1/object/public/generated-images/a1b2c3d4-e5f6-7890-abcd-ef1234567890/1703654321000-abc123def456.png
```

---

## 📊 Storage Dashboard

### ดู Storage ใน Supabase Dashboard:

1. เปิด [Supabase Dashboard](https://supabase.com/dashboard)
2. เลือกโปรเจค `vibe-ai-marketing`
3. ไปที่ **Storage** → **generated-images**
4. จะเห็น folders แยกตาม user ID
5. สามารถ preview, download, หรือ delete ภาพได้

### ตรวจสอบ Storage Usage:

```sql
-- Query to check total storage used
SELECT 
  COUNT(*) as total_images,
  SUM(metadata->>'size')::bigint as total_bytes,
  ROUND(SUM((metadata->>'size')::bigint) / 1024.0 / 1024.0, 2) as total_mb
FROM storage.objects
WHERE bucket_id = 'generated-images';
```

---

## 🔧 API Usage Examples

### Upload Image:

```typescript
const { data, error } = await supabase.storage
  .from('generated-images')
  .upload('user-id/image.png', file);
```

### Get Public URL:

```typescript
const { data } = supabase.storage
  .from('generated-images')
  .getPublicUrl('user-id/image.png');

console.log(data.publicUrl);
```

### Delete Image:

```typescript
const { error } = await supabase.storage
  .from('generated-images')
  .remove(['user-id/image.png']);
```

### List User's Images:

```typescript
const { data, error } = await supabase.storage
  .from('generated-images')
  .list('user-id/');
```

---

## 💾 Database Integration

### Schema Update:

ตาราง `generated_images` ใช้ column `image_url` เก็บ URL จาก Supabase Storage:

```sql
CREATE TABLE generated_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  prompt TEXT NOT NULL,
  prompt_en TEXT,
  image_url TEXT NOT NULL, -- Supabase Storage URL
  style TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Example Data:**
```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "user_id": "user-uuid-here",
  "prompt": "แมวสีส้มนั่งบนชายหาด",
  "prompt_en": "An orange cat sitting on the beach...",
  "image_url": "https://owresixxwaetnspoxpvx.supabase.co/storage/v1/object/public/generated-images/...",
  "style": "photorealistic",
  "created_at": "2025-12-27T10:00:00Z"
}
```

---

## 🧪 Testing

### Manual Test:

1. เปิด http://localhost:3000/dashboard/generate
2. พิมพ์ prompt และกด Generate
3. รอสักครู่ (5-15 วินาที)
4. ตรวจสอบ terminal logs:
   ```
   🎨 Generating image with Nano Banana Pro...
   ✅ Image generated successfully!
   📥 Downloading image from Replicate...
   📤 Uploading to Supabase Storage...
   ✅ Uploaded successfully!
   🔗 Public URL: https://...
   ```
5. ภาพจะแสดงในหน้าเว็บ
6. ตรวจสอบใน Supabase Dashboard → Storage
7. ตรวจสอบใน Dashboard → History

### Verify in Database:

```sql
-- Check latest generated images
SELECT 
  id,
  prompt,
  image_url,
  style,
  created_at
FROM generated_images
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🚨 Error Handling

### Fallback Mechanism:

ถ้า Storage upload ล้มเหลว ระบบจะ fallback ไปใช้ Replicate URL:

```typescript
try {
  finalImageUrl = await uploadImageToStorage(replicateImageUrl, user.id, supabase);
  console.log("✅ Image uploaded to Supabase Storage!");
} catch (storageError) {
  console.error("⚠️ Storage upload failed, using Replicate URL:", storageError);
  // Fallback to Replicate URL
  finalImageUrl = replicateImageUrl;
}
```

### Common Errors:

**"Storage bucket not found"**
- สาเหตุ: Bucket ยังไม่ได้สร้าง
- แก้ไข: Run migration `20251227_create_storage.sql`

**"Permission denied"**
- สาเหตุ: RLS policies ไม่ถูกต้อง
- แก้ไข: ตรวจสอบ policies ใน Supabase Dashboard

**"File too large"**
- สาเหตุ: ภาพเกิน 10MB
- แก้ไข: ลด resolution หรือเพิ่ม file size limit

---

## 💰 Storage Costs

### Supabase Storage Pricing:

**Free Tier:**
- ✅ 1GB storage
- ✅ 2GB bandwidth per month

**Pro Plan ($25/month):**
- ✅ 100GB storage
- ✅ 200GB bandwidth
- ✅ Additional storage: $0.021/GB/month
- ✅ Additional bandwidth: $0.09/GB

### ประมาณการ:

**ภาพแต่ละภาพ:**
- Size: ~2-5MB (PNG, 2K resolution)
- ภาพ 200 รูป = ~400MB-1GB

**Bandwidth:**
- View 1 ภาพ = 2-5MB bandwidth
- View 400 ครั้ง = ~1GB bandwidth

**คำแนะนำ:**
- ใช้ Free tier สำหรับ testing (พอสำหรับ 200-500 รูป)
- Upgrade เมื่อมี users มากขึ้น
- ใช้ CDN caching เพื่อลด bandwidth

---

## 🎯 Best Practices

### 1. File Naming:
- ✅ ใช้ timestamp + random string
- ✅ แยก folder ตาม user ID
- ❌ อย่าใช้ชื่อไฟล์ที่ซ้ำกัน

### 2. Security:
- ✅ ใช้ RLS policies
- ✅ Validate file types
- ✅ ตั้ง file size limit
- ❌ อย่าให้ user อัปโหลดไฟล์อื่นที่ไม่ใช่ภาพ

### 3. Performance:
- ✅ ตั้ง cache headers
- ✅ ใช้ CDN ถ้ามี traffic สูง
- ✅ Optimize image size ก่อนอัปโหลด

### 4. Cleanup:
- ✅ ลบภาพเก่าที่ไม่ใช้แล้ว
- ✅ ตั้ง retention policy
- ✅ Monitor storage usage

---

## 📚 References

- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)
- [Storage RLS](https://supabase.com/docs/guides/storage/security/access-control)
- [Storage API Reference](https://supabase.com/docs/reference/javascript/storage)

---

**อัปเดตล่าสุด:** December 27, 2025  
**สถานะ:** ✅ ใช้งานได้แล้ว  
**Version:** 1.0.0 with Supabase Storage

