"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950" />
      
      {/* Animated Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-purple-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full mb-6">
            <Icon icon="fluent:sparkle-24-filled" className="text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              AI-Powered Marketing Platform
            </span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          เริ่มสร้างคอนเทนต์ด้วย AI
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Create Content with AI
        </motion.p>

        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          แพลตฟอร์มสร้างภาพด้วย AI ที่ออกแบบมาสำหรับนักการตลาดไทย
          <br />
          สร้างภาพสวยงามได้ในไม่กี่วินาที ไม่ต้องยืนยันอีเมล
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <Link href="/register">
              <Icon icon="mdi:rocket-launch" className="mr-2 h-5 w-5" />
              เริ่มใช้งานฟรี
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
            <Link href="#features">
              <Icon icon="mdi:information-outline" className="mr-2 h-5 w-5" />
              เรียนรู้เพิ่มเติม
            </Link>
          </Button>
        </motion.div>

        {/* Demo Images Grid */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="aspect-square rounded-xl bg-gradient-to-br from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <Icon
                  icon="mdi:image-outline"
                  className="text-4xl text-purple-600 dark:text-purple-300"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

