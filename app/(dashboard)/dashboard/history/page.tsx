import { createClient } from "@/lib/supabase/server";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import Image from "next/image";

export default async function HistoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Get all user's generated images
  const { data: images } = await supabase
    .from("generated_images")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ประวัติการสร้าง / History</h1>
        <p className="text-muted-foreground mt-2">
          ดูภาพทั้งหมดที่คุณสร้างไว้
          <br />
          View all your generated images
        </p>
      </div>

      {!images || images.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Icon icon="mdi:image-off" className="text-3xl text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">ยังไม่มีประวัติ / No History Yet</h3>
            <p className="text-muted-foreground">
              ภาพที่คุณสร้างจะแสดงที่นี่
              <br />
              Your generated images will appear here
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden group">
              <div className="relative aspect-square">
                {image.image_url ? (
                  <Image
                    src={image.image_url}
                    alt={image.prompt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Icon
                      icon="mdi:image-outline"
                      className="text-4xl text-muted-foreground"
                    />
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <p className="text-sm line-clamp-2 mb-2">{image.prompt}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(image.created_at).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {image.style && (
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-xs">
                      <Icon icon="mdi:palette" className="h-3 w-3" />
                      {image.style}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

