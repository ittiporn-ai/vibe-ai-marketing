import { ImageGenerator } from "@/components/dashboard/ImageGenerator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GeneratePage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">สร้างภาพด้วย AI / Generate Image</h1>
        <p className="text-muted-foreground mt-2">
          บอก AI ว่าคุณต้องการภาพแบบไหน
          <br />
          Tell the AI what image you want to create
        </p>
      </div>

      <ImageGenerator />
    </div>
  );
}

