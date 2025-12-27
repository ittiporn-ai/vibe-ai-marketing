# ✅ Supabase Configuration Complete!

## 🎉 สิ่งที่ทำเสร็จแล้ว

### 1. Project Created ✅
- **Name**: vibe-ai-marketing
- **Region**: Southeast Asia (Singapore)
- **Status**: ACTIVE & HEALTHY
- **URL**: https://owresixxwaetnspoxpvx.supabase.co
- **Project ID**: owresixxwaetnspoxpvx

### 2. Database Schema ✅
- ✅ **profiles** table (พร้อม RLS policies)
  - id (UUID)
  - full_name (TEXT)
  - created_at (TIMESTAMP)
  
- ✅ **generated_images** table (พร้อม RLS policies)
  - id (UUID)
  - user_id (UUID)
  - prompt (TEXT)
  - prompt_en (TEXT)
  - image_url (TEXT)
  - style (TEXT)
  - created_at (TIMESTAMP)

- ✅ **Auto-create profile trigger** (สร้าง profile อัตโนมัติเมื่อสมัครสมาชิก)

### 3. Row Level Security (RLS) ✅
- ✅ Profiles: Users สามารถดู/แก้ไขข้อมูลของตัวเองเท่านั้น
- ✅ Generated Images: Users สามารถดู/สร้าง/ลบภาพของตัวเองเท่านั้น

### 4. Environment Variables ✅
ไฟล์ `.env.local` ได้รับการอัพเดทด้วย:
- ✅ NEXT_PUBLIC_SUPABASE_URL
- ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY
- ⚠️ SUPABASE_SERVICE_ROLE_KEY (ต้องเพิ่มเอง)

---

## 📝 ขั้นตอนที่เหลือ (สำคัญ!)

### ⚠️ Step 1: ดึง Service Role Key

1. ไปที่ Supabase Dashboard: https://supabase.com/dashboard/project/owresixxwaetnspoxpvx
2. ไปที่ **Settings** > **API**
3. หา **service_role** secret key (อยู่ในส่วน Project API keys)
4. **Copy** key นั้น
5. เปิดไฟล์ `.env.local` และแทนที่ `YOUR_SERVICE_ROLE_KEY_HERE` ด้วย key ที่ copy มา

### ⚠️ Step 2: ปิด Email Confirmation (สำคัญมาก!)

1. ไปที่ Supabase Dashboard: https://supabase.com/dashboard/project/owresixxwaetnspoxpvx
2. ไปที่ **Authentication** > **Settings**
3. เลื่อนลงไปหา **Email Auth** section
4. **ปิด** "Enable email confirmations" (toggle เป็นสีเทา)
5. กด **Save** 

นี่จะทำให้ผู้ใช้สามารถสมัครและใช้งานได้ทันทีโดยไม่ต้องยืนยันอีเมล!

### ⚠️ Step 3: ตั้งค่า Redirect URLs

1. ไปที่ **Authentication** > **URL Configuration**
2. ตั้งค่า **Site URL**: `http://localhost:3000`
3. เพิ่ม **Redirect URLs**:
   - `http://localhost:3000`
   - `http://localhost:3000/**`
4. กด **Save**

---

## 🚀 ทดสอบการทำงาน

หลังจากทำ 3 ขั้นตอนข้างบนแล้ว:

1. **Restart dev server**:
   ```bash
   # หยุด server เดิม (Ctrl+C)
   npm run dev
   ```

2. **เปิดเว็บไซต์**: http://localhost:3000

3. **ทดสอบสมัครสมาชิก**:
   - คลิก "เริ่มใช้งานฟรี"
   - กรอกข้อมูล (ใช้อีเมลจริงก็ได้)
   - กด "สมัครสมาชิก"
   - ควรจะ login เข้าสู่ dashboard ได้ทันที!

4. **ทดสอบสร้างภาพ**:
   - ไปที่ "สร้างภาพ / Generate"
   - พิมพ์คำอธิบาย เช่น "แมวสีส้มนั่งบนชายหาด"
   - เลือกสไตล์
   - กด "สร้างภาพ"
   - จะเห็น placeholder image (เพราะยังไม่ได้ต่อ AI จริง)

---

## 🎨 Optional: ตั้งค่า Google Gemini API

หากต้องการสร้างภาพจริงๆ:

1. ไปที่: https://makersuite.google.com/app/apikey
2. สร้าง API key
3. แก้ไขไฟล์ `.env.local`:
   ```env
   GOOGLE_GEMINI_API_KEY=your_real_gemini_api_key
   ```
4. อัพเดทโค้ดใน `app/api/generate-image/route.ts` เพื่อใช้ AI จริง

---

## 📊 ตรวจสอบข้อมูลใน Supabase

### ดู Tables และข้อมูล:
1. ไปที่ https://supabase.com/dashboard/project/owresixxwaetnspoxpvx/editor
2. จะเห็น tables:
   - `profiles` - ข้อมูลผู้ใช้
   - `generated_images` - ภาพที่สร้าง

### ดู Users:
1. ไปที่ **Authentication** > **Users**
2. จะเห็นรายชื่อผู้ใช้ที่สมัครสมาชิก

---

## ✅ Checklist สำหรับเริ่มใช้งาน

- [ ] ดึง Service Role Key และใส่ใน `.env.local`
- [ ] ปิด Email Confirmation ใน Supabase
- [ ] ตั้งค่า Redirect URLs
- [ ] Restart dev server
- [ ] ทดสอบสมัครสมาชิก
- [ ] ทดสอบ login
- [ ] ทดสอบสร้างภาพ

---

## 🔗 Quick Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/owresixxwaetnspoxpvx
- **API Settings**: https://supabase.com/dashboard/project/owresixxwaetnspoxpvx/settings/api
- **Auth Settings**: https://supabase.com/dashboard/project/owresixxwaetnspoxpvx/auth/url-configuration
- **Database Editor**: https://supabase.com/dashboard/project/owresixxwaetnspoxpvx/editor

---

**🎊 เกือบเสร็จแล้ว! แค่ทำ 3 ขั้นตอนข้างบน แล้วเว็บไซต์จะใช้งานได้เต็มรูปแบบ!**

