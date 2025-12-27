"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  {
    icon: "mdi:view-dashboard",
    label: "Dashboard",
    labelTh: "แดชบอร์ด",
    href: "/dashboard",
  },
  {
    icon: "mdi:image-plus",
    label: "Generate",
    labelTh: "สร้างภาพ",
    href: "/dashboard/generate",
  },
  {
    icon: "mdi:history",
    label: "History",
    labelTh: "ประวัติ",
    href: "/dashboard/history",
  },
  {
    icon: "mdi:cog",
    label: "Settings",
    labelTh: "ตั้งค่า",
    href: "/dashboard/settings",
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Icon icon="mdi:sparkles" className="text-xl text-white" />
              </div>
              <span className="font-bold text-lg">Vibe AI</span>
            </Link>
          </div>

          <Separator />

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => onClose()}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon icon={item.icon} className="text-xl" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.labelTh}</span>
                    <span className="text-xs opacity-80">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>

          <Separator />

          {/* Footer */}
          <div className="p-4">
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Icon
                  icon="mdi:information"
                  className="h-5 w-5 text-blue-600 mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">Free Plan</p>
                  <p className="text-xs text-muted-foreground">
                    Unlimited image generation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

