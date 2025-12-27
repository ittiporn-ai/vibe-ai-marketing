"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: "สมัครสมาชิกสำเร็จ! / Registration Successful!",
          description: "กำลังเข้าสู่ระบบ... / Logging you in...",
        });

        // Redirect to dashboard (user is automatically logged in)
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error: any) {
      toast({
        title: "เกิดข้อผิดพลาด / Error",
        description: error.message || "ไม่สามารถสมัครสมาชิกได้ / Could not create account",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Icon icon="mdi:sparkles" className="text-2xl text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            สร้างบัญชีใหม่
          </CardTitle>
          <CardDescription className="text-center">
            Create New Account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">
                ชื่อ-นามสกุล / Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="ชื่อ นามสกุล"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                อีเมล / Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                รหัสผ่าน / Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                disabled={loading}
                minLength={6}
              />
              <p className="text-xs text-muted-foreground">
                รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร / At least 6 characters
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Icon icon="mdi:loading" className="mr-2 h-4 w-4 animate-spin" />
                  กำลังสมัครสมาชิก...
                </>
              ) : (
                <>
                  <Icon icon="mdi:account-plus" className="mr-2 h-4 w-4" />
                  สมัครสมาชิก / Sign Up
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              มีบัญชีอยู่แล้ว? / Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                เข้าสู่ระบบ / Login
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="flex items-start gap-2">
              <Icon
                icon="mdi:information"
                className="h-5 w-5 text-blue-600 mt-0.5"
              />
              <p className="text-xs text-muted-foreground">
                <strong>ไม่ต้องยืนยันอีเมล:</strong> คุณสามารถเริ่มใช้งานได้ทันทีหลังจากสมัครสมาชิก
                <br />
                <strong>No email verification needed:</strong> Start using immediately after signup
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              ← กลับหน้าหลัก / Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

