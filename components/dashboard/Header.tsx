"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";

interface HeaderProps {
  userEmail?: string;
  userName?: string;
  onMenuClick: () => void;
}

export function Header({ userEmail, userName, onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "ออกจากระบบสำเร็จ / Logged Out",
        description: "แล้วพบกันใหม่! / See you again!",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด / Error",
        description: "ไม่สามารถออกจากระบบได้ / Could not log out",
        variant: "destructive",
      });
    }
  };

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : userEmail?.slice(0, 2).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Icon icon="mdi:menu" className="h-6 w-6" />
        </Button>

        {/* Breadcrumb / Title */}
        <div className="flex-1">
          <h1 className="text-lg font-semibold">
            Vibe AI Marketing
          </h1>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline-block">{userName || userEmail}</span>
              <Icon icon="mdi:chevron-down" className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/dashboard" className="cursor-pointer">
                <Icon icon="mdi:view-dashboard" className="mr-2 h-4 w-4" />
                <span>Dashboard / แดชบอร์ด</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/dashboard/settings" className="cursor-pointer">
                <Icon icon="mdi:cog" className="mr-2 h-4 w-4" />
                <span>Settings / ตั้งค่า</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
              <Icon icon="mdi:logout" className="mr-2 h-4 w-4" />
              <span>Logout / ออกจากระบบ</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

