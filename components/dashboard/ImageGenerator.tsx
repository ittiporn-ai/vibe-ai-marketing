"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

const styles = [
  { value: "photorealistic", label: "Photorealistic", labelTh: "ภาพสมจริง" },
  { value: "artistic", label: "Artistic", labelTh: "ศิลปะ" },
  { value: "cartoon", label: "Cartoon", labelTh: "การ์ตูน" },
  { value: "anime", label: "Anime", labelTh: "อนิเมะ" },
  { value: "digital-art", label: "Digital Art", labelTh: "ดิจิทัลอาร์ต" },
];

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("photorealistic");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "กรุณาใส่คำอธิบายภาพ / Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setGeneratedImage(null);

    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          style,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImage(data.imageUrl);
      toast({
        title: "สร้างภาพสำเร็จ! / Image Generated!",
        description: "ภาพของคุณถูกสร้างเรียบร้อยแล้ว / Your image has been created",
      });

      // Refresh to update stats
      router.refresh();
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด / Error",
        description: error.message || "ไม่สามารถสร้างภาพได้ / Could not generate image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `vibe-ai-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "ดาวน์โหลดสำเร็จ / Downloaded",
      description: "ภาพถูกบันทึกลงเครื่องของคุณแล้ว / Image saved to your device",
    });
  };

  const handleCreateNew = () => {
    setPrompt("");
    setGeneratedImage(null);
    setStyle("photorealistic");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">
              คำอธิบายภาพ / Image Prompt
            </Label>
            <Textarea
              id="prompt"
              placeholder="เช่น: แมวสีส้มนั่งบนชายหาด / e.g., An orange cat sitting on a beach"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              disabled={loading}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              อธิบายภาพที่คุณต้องการเป็นภาษาไทยหรืออังกฤษ
              <br />
              Describe the image you want in Thai or English
            </p>
          </div>

          <div className="space-y-2">
            <Label>สไตล์ภาพ / Image Style</Label>
            <div className="grid grid-cols-2 gap-2">
              {styles.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setStyle(s.value)}
                  disabled={loading}
                  className={`p-3 rounded-lg border-2 transition-colors text-left ${
                    style === s.value
                      ? "border-primary bg-primary/10"
                      : "border-muted hover:border-primary/50"
                  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="font-medium text-sm">{s.labelTh}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Icon icon="mdi:loading" className="mr-2 h-5 w-5 animate-spin" />
                กำลังสร้างภาพ... / Generating...
              </>
            ) : (
              <>
                <Icon icon="mdi:sparkles" className="mr-2 h-5 w-5" />
                สร้างภาพ / Generate Image
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Preview Panel */}
      <Card>
        <CardContent className="p-6">
          {!generatedImage && !loading && (
            <div className="aspect-square rounded-lg border-2 border-dashed flex items-center justify-center text-center p-8">
              <div>
                <Icon
                  icon="mdi:image-outline"
                  className="text-6xl text-muted-foreground mx-auto mb-4"
                />
                <p className="text-muted-foreground">
                  ภาพที่สร้างจะแสดงที่นี่
                  <br />
                  Generated image will appear here
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="aspect-square rounded-lg border flex items-center justify-center">
              <div className="text-center">
                <Icon
                  icon="mdi:loading"
                  className="text-6xl text-primary mx-auto mb-4 animate-spin"
                />
                <p className="text-muted-foreground">
                  กำลังสร้างภาพ...
                  <br />
                  Generating your image...
                </p>
              </div>
            </div>
          )}

          {generatedImage && !loading && (
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden border">
                <Image
                  src={generatedImage}
                  alt={prompt}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleDownload} variant="outline" className="flex-1">
                  <Icon icon="mdi:download" className="mr-2 h-4 w-4" />
                  ดาวน์โหลด / Download
                </Button>
                <Button onClick={handleCreateNew} className="flex-1">
                  <Icon icon="mdi:plus" className="mr-2 h-4 w-4" />
                  สร้างใหม่ / New
                </Button>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Prompt:</strong> {prompt}
                </p>
                <p className="text-sm mt-1">
                  <strong>Style:</strong>{" "}
                  {styles.find((s) => s.value === style)?.labelTh}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

