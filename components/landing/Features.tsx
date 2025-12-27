"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";

const features = [
  {
    icon: "mdi:brain",
    title: "AI Image Generation",
    titleTh: "สร้างภาพด้วย AI",
    description: "Create stunning images with Google Gemini AI technology",
    descriptionTh: "สร้างภาพสวยงามด้วยเทคโนโลยี AI จาก Google Gemini",
  },
  {
    icon: "mdi:lightning-bolt",
    title: "Fast & Easy",
    titleTh: "รวดเร็ว ใช้งานง่าย",
    description: "Generate images in seconds with simple prompts",
    descriptionTh: "สร้างภาพได้ในไม่กี่วินาที เพียงแค่พิมพ์คำอธิบาย",
  },
  {
    icon: "mdi:account-check",
    title: "No Email Verification",
    titleTh: "ไม่ต้องยืนยันอีเมล",
    description: "Sign up and start creating immediately",
    descriptionTh: "สมัครสมาชิกแล้วเริ่มใช้งานได้ทันที",
  },
  {
    icon: "mdi:palette",
    title: "Multiple Styles",
    titleTh: "หลากหลายสไตล์",
    description: "Choose from various artistic styles for your images",
    descriptionTh: "เลือกสไตล์ภาพได้หลากหลายตามต้องการ",
  },
  {
    icon: "mdi:cloud-download",
    title: "Easy Export",
    titleTh: "ดาวน์โหลดง่าย",
    description: "Download your images in high quality",
    descriptionTh: "ดาวน์โหลดภาพคุณภาพสูงได้ทันที",
  },
  {
    icon: "mdi:history",
    title: "Image History",
    titleTh: "ประวัติการสร้าง",
    description: "Access all your previously generated images",
    descriptionTh: "เข้าถึงภาพที่สร้างไว้ทั้งหมดของคุณ",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ฟีเจอร์ที่ครบครัน
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need for AI-powered marketing
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Icon icon={feature.icon} className="text-2xl text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.titleTh}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {feature.title}
                  </p>
                  <p className="text-muted-foreground">{feature.descriptionTh}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

