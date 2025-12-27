"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Toaster } from "@/components/ui/toaster";

interface DashboardShellProps {
  children: React.ReactNode;
  userEmail?: string;
  userName?: string;
}

export function DashboardShell({
  children,
  userEmail,
  userName,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
            <div className="flex h-16 items-center gap-4 px-4 sm:px-6">
              <div className="flex-1">
                <h1 className="text-lg font-semibold">Vibe AI Marketing</h1>
              </div>
            </div>
          </div>
          <main className="flex-1 overflow-y-auto bg-muted/20">
            <div className="container mx-auto p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          userEmail={userEmail}
          userName={userName}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto bg-muted/20">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>

      <Toaster />
    </div>
  );
}

