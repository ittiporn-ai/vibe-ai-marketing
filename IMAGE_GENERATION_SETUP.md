# 🎨 Image Generation Setup Guide

## ✅ สิ่งที่ทำงานแล้ว

ตอนนี้ระบบมี **OpenRouter API** ที่ใช้ในการ:
- ✅ Enhance prompts อัตโนมัติด้วย AI (Llama 3.1)
- ✅ แปลง prompt ไทยเป็นอังกฤษ
- ✅ เพิ่มรายละเอียดให้ prompt (lighting, composition, colors, mood)

**Demo Mode**: ตอนนี้ยังแสดง placeholder images แต่ prompts ได้รับการ enhance แล้ว

---

## 🚀 เปิดใช้งาน Image Generation จริง

เลือก 1 ใน 4 บริการด้านล่าง:

### Option 1: Replicate (แนะนำ) ⭐

**ทำไมดี:**
- มี models หลากหลาย (Stable Diffusion, Flux, SDXL)
- Pay-per-use (จ่ายตามใช้)
- Setup ง่าย

**Setup:**

1. สมัครที่ https://replicate.com
2. ไปที่ https://replicate.com/account/api-tokens
3. สร้าง API token
4. เพิ่มใน `.env.local`:
```env
REPLICATE_API_TOKEN=r8_your_token_here
```

5. ติดตั้ง package:
```bash
npm install replicate
```

6. อัพเดท `app/api/generate-image/route.ts`:
```typescript
import Replicate from "replicate";

// ใน POST function
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

const output = await replicate.run(
  "black-forest-labs/flux-schnell", // Fast & free model
  {
    input: {
      prompt: enhancedPrompt,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "png",
    },
  }
);

const imageUrl = output[0]; // URL ของภาพที่สร้าง
```

**Models แนะนำ:**
- `black-forest-labs/flux-schnell` - เร็ว, ฟรี
- `stability-ai/sdxl` - คุณภาพสูง
- `bytedance/sdxl-lightning-4step` - เร็วมาก

---

### Option 2: Together AI

**ทำไมดี:**
- ราคาถูก
- หลาย models
- API ง่าย

**Setup:**

1. สมัครที่ https://www.together.ai
2. ไปที่ Settings > API Keys
3. สร้าง API key
4. เพิ่มใน `.env.local`:
```env
TOGETHER_API_KEY=your_key_here
```

5. ใช้ API:
```typescript
const response = await fetch(
  "https://api.together.xyz/v1/images/generations",
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.TOGETHER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "black-forest-labs/FLUX.1-schnell",
      prompt: enhancedPrompt,
      width: 1024,
      height: 1024,
      steps: 4,
      n: 1,
    }),
  }
);

const data = await response.json();
const imageUrl = data.data[0].url;
```

---

### Option 3: Fal.ai (เร็วที่สุด) ⚡

**ทำไมดี:**
- เร็วมาก (2-3 วินาที)
- ราคาถูก
- Real-time generation

**Setup:**

1. สมัครที่ https://fal.ai
2. ไปที่ Dashboard > API Keys
3. สร้าง API key
4. เพิ่มใน `.env.local`:
```env
FAL_KEY=your_fal_key_here
```

5. ติดตั้ง package:
```bash
npm install @fal-ai/serverless-client
```

6. ใช้งาน:
```typescript
import * as fal from "@fal-ai/serverless-client";

fal.config({
  credentials: process.env.FAL_KEY,
});

const result = await fal.subscribe("fal-ai/flux/schnell", {
  input: {
    prompt: enhancedPrompt,
    image_size: "square_hd",
  },
});

const imageUrl = result.images[0].url;
```

---

### Option 4: Stability AI (Official)

**ทำไมดี:**
- Official Stable Diffusion
- คุณภาพสูงสุด
- มี Stable Diffusion 3

**Setup:**

1. สมัครที่ https://platform.stability.ai
2. ไปที่ Account > API Keys
3. สร้าง API key
4. เพิ่มใน `.env.local`:
```env
STABILITY_API_KEY=sk-your_key_here
```

5. ใช้ API:
```typescript
const response = await fetch(
  "https://api.stability.ai/v2beta/stable-image/generate/sd3",
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.STABILITY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: enhancedPrompt,
      output_format: "png",
      aspect_ratio: "1:1",
    }),
  }
);

const data = await response.json();
const imageUrl = `data:image/png;base64,${data.image}`;
```

---

## 📊 เปรียบเทียบบริการ

| บริการ | ความเร็ว | ราคา/image | คุณภาพ | Setup ง่าย |
|--------|----------|------------|--------|------------|
| **Replicate** | ⭐⭐⭐ | ~$0.003 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Together AI** | ⭐⭐⭐⭐ | ~$0.002 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Fal.ai** | ⭐⭐⭐⭐⭐ | ~$0.003 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Stability AI** | ⭐⭐⭐ | ~$0.006 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 💡 คำแนะนำ

### สำหรับ Development / Testing:
→ **Replicate** (Flux Schnell model - ฟรี)

### สำหรับ Production:
→ **Fal.ai** (เร็วที่สุด, ราคาดี)

### สำหรับคุณภาพสูงสุด:
→ **Stability AI** (SD3)

---

## 🔧 Template Code สำหรับ Replicate

ไฟล์: `app/api/generate-image/route.ts`

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

async function enhancePromptWithAI(prompt: string, style: string): Promise<string> {
  // ... (ใช้โค้ดเดิม)
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { prompt, style } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Enhance prompt
    const enhancedPrompt = await enhancePromptWithAI(prompt, style || "photorealistic");

    // Generate image with Replicate
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN!,
    });

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: enhancedPrompt,
          num_outputs: 1,
          aspect_ratio: "1:1",
          output_format: "png",
        },
      }
    ) as string[];

    const imageUrl = output[0];

    // Save to database
    const { data: imageRecord, error: dbError } = await supabase
      .from("generated_images")
      .insert({
        user_id: user.id,
        prompt: prompt,
        prompt_en: enhancedPrompt,
        image_url: imageUrl,
        style: style,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json({ error: "Failed to save image" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      imageUrl: imageUrl,
      imageId: imageRecord.id,
      enhancedPrompt: enhancedPrompt,
      message: "Image generated successfully",
    });
  } catch (error: any) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}
```

---

## 🎯 Quick Start (Replicate)

```bash
# 1. ติดตั้ง Replicate
npm install replicate

# 2. เพิ่ม API token ใน .env.local
echo "REPLICATE_API_TOKEN=r8_your_token_here" >> .env.local

# 3. แทนที่โค้ดใน app/api/generate-image/route.ts

# 4. Restart server
npm run dev
```

แค่นี้ก็พร้อมสร้างภาพจริงแล้ว! 🎨

---

## 📝 Notes

- **OpenRouter** ยังคงทำงานในการ enhance prompts
- บริการ Image Generation แยกต่างหาก
- สามารถใช้ร่วมกันได้ (OpenRouter enhance → Image service generate)
- ทุก options ข้างบนมี free tier หรือ pay-per-use

---

**🎊 พร้อมสร้างภาพจริงแล้ว! เลือกบริการที่ชอบแล้วเริ่มได้เลย!**

