import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">ตั้งค่า / Settings</h1>
        <p className="text-muted-foreground mt-2">
          จัดการบัญชีและการตั้งค่าของคุณ
          <br />
          Manage your account and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลบัญชี / Account Information</CardTitle>
          <CardDescription>
            ข้อมูลส่วนตัวของคุณ / Your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Icon icon="mdi:account" className="text-2xl text-white" />
            </div>
            <div>
              <p className="font-medium">{profile?.full_name || "User"}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">สถานะบัญชี / Account Status</span>
              <span className="text-sm font-medium text-green-600">Active</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">แผนการใช้งาน / Plan</span>
              <span className="text-sm font-medium">Free</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">สมัครสมาชิกเมื่อ / Member Since</span>
              <span className="text-sm text-muted-foreground">
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString("th-TH")
                  : "-"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>การแจ้งเตือน / Notifications</CardTitle>
          <CardDescription>
            จัดการการแจ้งเตือนของคุณ / Manage your notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            การตั้งค่าการแจ้งเตือนจะมาเร็วๆ นี้
            <br />
            Notification settings coming soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

