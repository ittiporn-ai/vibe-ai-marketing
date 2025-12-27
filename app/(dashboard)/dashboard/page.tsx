import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Get user's generated images
  const { data: images, count } = await supabase
    .from("generated_images")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(6);

  // Get this month's count
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count: monthCount } = await supabase
    .from("generated_images")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .gte("created_at", startOfMonth.toISOString());

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">แดชบอร์ด / Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          ยินดีต้อนรับสู่ Vibe AI Marketing Platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ภาพทั้งหมด / Total Images
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Icon icon="mdi:image-multiple" className="text-xl text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{count || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              รูปภาพที่สร้างทั้งหมด
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              เดือนนี้ / This Month
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
              <Icon icon="mdi:calendar-month" className="text-xl text-pink-600 dark:text-pink-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{monthCount || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              ภาพที่สร้างในเดือนนี้
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              สถานะบัญชี / Account Status
            </CardTitle>
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Icon icon="mdi:check-circle" className="text-xl text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Free Plan</div>
            <p className="text-xs text-muted-foreground mt-1">
              สร้างภาพได้ไม่จำกัด
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>เริ่มต้นใช้งาน / Get Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="flex-1">
              <Link href="/dashboard/generate">
                <Icon icon="mdi:image-plus" className="mr-2 h-5 w-5" />
                สร้างภาพใหม่ / Generate Image
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="flex-1">
              <Link href="/dashboard/history">
                <Icon icon="mdi:history" className="mr-2 h-5 w-5" />
                ดูประวัติ / View History
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Images */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ภาพล่าสุด / Recent Images</CardTitle>
          {(count || 0) > 6 && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/history">
                ดูทั้งหมด / View All
                <Icon icon="mdi:arrow-right" className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {!images || images.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Icon icon="mdi:image-off" className="text-3xl text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">ยังไม่มีภาพ / No Images Yet</h3>
              <p className="text-muted-foreground mb-4">
                เริ่มสร้างภาพแรกของคุณด้วย AI
                <br />
                Start creating your first AI-generated image
              </p>
              <Button asChild>
                <Link href="/dashboard/generate">
                  <Icon icon="mdi:image-plus" className="mr-2 h-4 w-4" />
                  สร้างภาพเลย / Create Now
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative aspect-square rounded-lg overflow-hidden bg-muted"
                >
                  {image.image_url ? (
                    <Image
                      src={image.image_url}
                      alt={image.prompt}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon
                        icon="mdi:image-outline"
                        className="text-4xl text-muted-foreground"
                      />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-sm p-4 text-center line-clamp-3">
                      {image.prompt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

