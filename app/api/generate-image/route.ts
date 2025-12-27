import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";

// Helper function to enhance prompt using OpenRouter
async function enhancePromptWithAI(prompt: string, style: string): Promise<string> {
  if (!process.env.OPENROUTER_API_KEY) {
    return `${prompt}, in ${style} style`;
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Vibe AI Marketing",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free", // Free model
        messages: [
          {
            role: "system",
            content: "You are an expert at creating detailed image generation prompts. Enhance the user's prompt to be more descriptive and suitable for AI image generation. Keep it under 200 words and in English."
          },
          {
            role: "user",
            content: `Enhance this image prompt for ${style} style: "${prompt}". Make it detailed with lighting, composition, colors, and mood.`
          }
        ],
        max_tokens: 300,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.choices[0]?.message?.content || `${prompt}, in ${style} style`;
    }
  } catch (error) {
    console.error("Error enhancing prompt:", error);
  }

  // Fallback
  return `${prompt}, in ${style} style`;
}

// Map styles to appropriate descriptions for Nano Banana Pro
function getStyleEnhancement(style: string): string {
  const styleMap: Record<string, string> = {
    photorealistic: "photorealistic, highly detailed, professional photography, 8k resolution",
    artistic: "artistic painting, creative composition, vibrant colors, masterpiece",
    cartoon: "cartoon style, vibrant colors, clean lines, playful atmosphere",
    anime: "anime style, cel shaded, vibrant colors, Japanese animation aesthetic",
    "digital-art": "digital art, concept art, detailed illustration, trending on artstation",
  };
  return styleMap[style] || styleMap.photorealistic;
}

// Helper function to download image from URL and upload to Supabase Storage
async function uploadImageToStorage(
  imageUrl: string,
  userId: string,
  supabase: any
): Promise<string> {
  try {
    console.log("📥 Downloading image from Replicate...");
    
    // Download image from Replicate
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }
    
    const imageBuffer = await imageResponse.arrayBuffer();
    const imageBlob = new Blob([imageBuffer], { type: 'image/png' });
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const filename = `${userId}/${timestamp}-${randomString}.png`;
    
    console.log("📤 Uploading to Supabase Storage...");
    console.log("📁 Filename:", filename);
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated-images')
      .upload(filename, imageBlob, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false,
      });
    
    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('generated-images')
      .getPublicUrl(filename);
    
    console.log("✅ Uploaded successfully!");
    console.log("🔗 Public URL:", publicUrlData.publicUrl);
    
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("❌ Error uploading to storage:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // Check authentication
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { prompt, style } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Check if Replicate API token is configured
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: "Replicate API token not configured" },
        { status: 500 }
      );
    }

    // Enhance prompt using AI
    const styleEnhancement = getStyleEnhancement(style || "photorealistic");
    const baseEnhancedPrompt = await enhancePromptWithAI(prompt, style || "photorealistic");
    const finalPrompt = `${baseEnhancedPrompt}, ${styleEnhancement}`;

    console.log("🎨 Generating image with Nano Banana Pro...");
    console.log("📝 Original prompt:", prompt);
    console.log("✨ Enhanced prompt:", finalPrompt);

    // Initialize Replicate client
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    // Generate image using Nano Banana Pro
    const output = await replicate.run(
      "google/nano-banana-pro:latest" as any,
      {
        input: {
          prompt: finalPrompt,
          resolution: "2K",
          aspect_ratio: "4:3",
          output_format: "png",
          safety_filter_level: "block_only_high",
        },
      }
    );

    console.log("✅ Image generated successfully!");
    console.log("Output:", output);

    // Replicate returns the image URL directly or in an array
    let replicateImageUrl: string;
    if (Array.isArray(output)) {
      replicateImageUrl = output[0] as string;
    } else if (typeof output === "string") {
      replicateImageUrl = output;
    } else {
      throw new Error("Unexpected output format from Replicate");
    }

    console.log("🔗 Replicate URL:", replicateImageUrl);

    // Download and upload to Supabase Storage
    let finalImageUrl: string;
    try {
      finalImageUrl = await uploadImageToStorage(replicateImageUrl, user.id, supabase);
      console.log("✅ Image uploaded to Supabase Storage!");
    } catch (storageError) {
      console.error("⚠️ Storage upload failed, using Replicate URL:", storageError);
      // Fallback to Replicate URL if storage upload fails
      finalImageUrl = replicateImageUrl;
    }

    // Save to database
    const { data: imageRecord, error: dbError } = await supabase
      .from("generated_images")
      .insert({
        user_id: user.id,
        prompt: prompt,
        prompt_en: finalPrompt,
        image_url: finalImageUrl,
        style: style || "photorealistic",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save image" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      imageUrl: finalImageUrl,
      imageId: imageRecord.id,
      enhancedPrompt: finalPrompt,
      message: "Image generated successfully with Nano Banana Pro! 🍌",
    });
  } catch (error: any) {
    console.error("❌ Error generating image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}

// Note: To use real image generation, integrate with one of these services:
// 
// 1. Replicate (Stable Diffusion, Flux, etc.)
//    https://replicate.com/docs
// 
// 2. Together AI (Multiple image models)
//    https://www.together.ai/
// 
// 3. Stability AI (Official Stable Diffusion)
//    https://platform.stability.ai/
//
// 4. Fal.ai (Fast image generation)
//    https://fal.ai/
//
// Example with Replicate:
// const response = await fetch("https://api.replicate.com/v1/predictions", {
//   method: "POST",
//   headers: {
//     "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     version: "stability-ai/sdxl",
//     input: { prompt: enhancedPrompt }
//   })
// });

// Alternative implementation with actual image generation using Gemini's text capabilities
// to generate a detailed prompt that could be used with another image generation service:

/*
async function generateImageWithGemini(prompt: string, style: string) {
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Use Gemini to enhance/translate the prompt for better image generation
  const enhancementPrompt = `
    Given this image description: "${prompt}"
    And this desired style: "${style}"
    
    Create a detailed, enhanced prompt for an AI image generator.
    The prompt should be in English and very descriptive.
    Include details about lighting, composition, colors, and mood.
    Keep it under 200 words.
  `;

  const result = await model.generateContent(enhancementPrompt);
  const enhancedPrompt = result.response.text();

  // This enhanced prompt would then be sent to an actual image generation API
  return enhancedPrompt;
}
*/

