"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-12 md:p-20 text-center text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Background Patterns */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                พร้อมที่จะเริ่มต้นแล้วหรือยัง?
              </h2>
              <p className="text-xl md:text-2xl mb-4 opacity-90">
                Ready to Get Started?
              </p>
              <p className="text-lg mb-8 opacity-80 max-w-2xl mx-auto">
                เริ่มสร้างภาพด้วย AI วันนี้ ไม่ต้องใช้บัตรเครดิต ไม่ต้องยืนยันอีเมล
                <br />
                Start creating AI-powered images today. No credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 bg-white text-purple-600 hover:bg-gray-100"
                >
                  <Link href="/register">
                    <Icon icon="mdi:rocket-launch" className="mr-2 h-5 w-5" />
                    เริ่มใช้งานฟรี
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

