"use client";

import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const steps = [
  {
    icon: "mdi:account-plus",
    title: "สมัครสมาชิก",
    titleEn: "Sign Up",
    description: "สร้างบัญชีผู้ใช้ฟรี ไม่ต้องยืนยันอีเมล",
    descriptionEn: "Create a free account, no email verification needed",
  },
  {
    icon: "mdi:text-box",
    title: "พิมพ์คำอธิบาย",
    titleEn: "Describe Your Image",
    description: "บอก AI ว่าต้องการภาพแบบไหน ภาษาไทยหรืออังกฤษก็ได้",
    descriptionEn: "Tell the AI what you want in Thai or English",
  },
  {
    icon: "mdi:sparkles",
    title: "รับภาพที่สร้าง",
    titleEn: "Get Your Image",
    description: "AI จะสร้างภาพให้คุณภายในไม่กี่วินาที",
    descriptionEn: "AI generates your image in seconds",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            วิธีการใช้งาน
          </h2>
          <p className="text-xl text-muted-foreground">How It Works</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
              )}

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6">
                  <Icon icon={step.icon} className="text-5xl text-white" />
                </div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-lg text-muted-foreground mb-3">
                  {step.titleEn}
                </p>
                <p className="text-muted-foreground">{step.description}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.descriptionEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

