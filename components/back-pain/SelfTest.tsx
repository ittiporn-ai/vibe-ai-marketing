"use client";

import { useState } from "react";

type Test = {
  id: string;
  title: string;
  how: string[];
  result: string;
  meaning: string;
  illustration: "wall" | "thomas" | "mirror" | "lift-leg";
};

const TESTS: Test[] = [
  {
    id: "wall",
    title: "ทดสอบแนบกำแพง (Wall Test)",
    how: [
      "ยืนหลังพิงกำแพง ส้นเท้าห่างกำแพง ~5 ซม.",
      "ก้น สะบัก ศีรษะ แตะกำแพง",
      "เอามือสอดด้านหลังตรงเอวระหว่างหลังกับกำแพง",
    ],
    result: "ปกติ: มือสอดเข้าได้พอดี (~2-3 ซม.)",
    meaning:
      "ถ้าสอดได้ทั้งฝ่ามือ + กำปั้น = หลังแอ่นมากเกินไป เป็นสัญญาณ Anterior Pelvic Tilt",
    illustration: "wall",
  },
  {
    id: "thomas",
    title: "Thomas Test (สำหรับ Hip Flexors)",
    how: [
      "นอนหงายบนเตียง ปล่อยขาห้อยลงจากขอบ",
      "ดึงเข่าอีกข้างชิดอก",
      "ดูว่าขาที่ห้อยตกลงต่ำกว่าระดับเตียงได้ไหม",
    ],
    result: "ปกติ: ขาห้อยตกต่ำกว่าเตียงได้ราบ",
    meaning:
      "ถ้าขาห้อยอยู่เหนือเตียง หรือลอย = Hip Flexors ตึง (เป็นสาเหตุหลักของ APT)",
    illustration: "thomas",
  },
  {
    id: "mirror",
    title: "ดูในกระจกจากด้านข้าง",
    how: [
      "ยืนตามธรรมชาติ ด้านข้างหันเข้ากระจก",
      "ถ่ายรูปจากด้านข้างได้ยิ่งดี",
      "สังเกตเส้นจากหู → ไหล่ → สะโพก → เข่า → ข้อเท้า",
    ],
    result: "ปกติ: 5 จุดอยู่ในแนวดิ่งเดียวกัน",
    meaning:
      "ถ้าท้องยื่นล้ำเส้น + ก้นยื่นด้านหลัง + หลังแอ่นชัด = ภาพคลาสสิกของ APT",
    illustration: "mirror",
  },
  {
    id: "lift-leg",
    title: "ทดสอบแรงก้น (Single Leg Bridge)",
    how: [
      "นอนหงาย ชันเข่าหนึ่งข้าง",
      "ยกอีกขาตรงขึ้น แล้วยกสะโพกขึ้นเป็นเส้นตรง",
      "ทำ 10 ครั้งต่อข้าง",
    ],
    result: "ปกติ: รู้สึกที่ก้น ไม่ใช่ที่หลังหรือต้นขาหลัง",
    meaning:
      "ถ้ารู้สึก 'ปวดหลัง' หรือ 'ขาหลังเป็นตะคริว' = ก้นไม่ทำงาน, hamstrings + erectors ชดเชย",
    illustration: "lift-leg",
  },
];

export function SelfTest() {
  const [open, setOpen] = useState<string | null>("wall");

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {TESTS.map((test) => (
        <div
          key={test.id}
          className="border rounded-xl overflow-hidden bg-white"
        >
          <button
            onClick={() => setOpen(open === test.id ? null : test.id)}
            className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold">
                ทดสอบ
              </div>
              <div className="font-bold">{test.title}</div>
            </div>
            <span
              className={`text-slate-400 text-xl transition-transform ${
                open === test.id ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>

          {open === test.id && (
            <div className="p-4 pt-0 border-t bg-slate-50/50">
              <TestIllustration kind={test.illustration} />

              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
                  วิธีทำ
                </div>
                <ol className="space-y-1.5 text-sm">
                  {test.how.map((step, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-bold text-slate-500">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-xs font-semibold text-green-700 mb-1">
                  ✓ ผลลัพธ์ปกติ
                </div>
                <div className="text-sm">{test.result}</div>
              </div>

              <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="text-xs font-semibold text-red-700 mb-1">
                  ⚠ ถ้าเป็นแบบนี้ = มีปัญหา
                </div>
                <div className="text-sm">{test.meaning}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TestIllustration({ kind }: { kind: Test["illustration"] }) {
  const common = "w-full max-w-[280px] mx-auto";

  if (kind === "wall") {
    return (
      <svg viewBox="0 0 280 220" className={common}>
        {/* Wall */}
        <rect x="20" y="20" width="14" height="200" fill="#94a3b8" />
        {/* Floor */}
        <line x1="20" y1="220" x2="270" y2="220" stroke="#cbd5e1" strokeWidth="2" />
        {/* Person */}
        <circle cx="80" cy="60" r="18" fill="#fce7d2" stroke="#a87349" />
        <path
          d="M 70 78
             L 60 130
             Q 65 160 80 195
             L 100 195
             Q 105 160 100 130
             L 90 78 Z"
          fill="#fce7d2"
          stroke="#a87349"
        />
        {/* Gap at lower back */}
        <path
          d="M 56 130 Q 40 145 56 160"
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="3 2"
        />
        <text x="120" y="148" fontSize="10" fill="#ef4444" fontWeight="700">
          ช่องว่าง
        </text>
        <text x="120" y="160" fontSize="9" fill="#ef4444">
          มากเกินไป
        </text>
        <line x1="60" y1="220" x2="100" y2="220" stroke="#1f2937" strokeWidth="3" />
      </svg>
    );
  }

  if (kind === "thomas") {
    return (
      <svg viewBox="0 0 280 200" className={common}>
        {/* Table */}
        <rect x="20" y="100" width="180" height="14" fill="#94a3b8" />
        <line x1="40" y1="114" x2="40" y2="180" stroke="#94a3b8" strokeWidth="4" />
        <line x1="180" y1="114" x2="180" y2="180" stroke="#94a3b8" strokeWidth="4" />
        {/* Person lying */}
        <circle cx="40" cy="92" r="12" fill="#fce7d2" stroke="#a87349" />
        <rect x="50" y="82" width="80" height="20" fill="#fce7d2" stroke="#a87349" />
        {/* Knee to chest */}
        <path d="M 130 92 Q 150 70 145 100" fill="#fce7d2" stroke="#a87349" />
        {/* Dangling leg - LIFTED (problem) */}
        <path
          d="M 130 100 L 220 110 L 225 100 L 135 90 Z"
          fill="#fce7d2"
          stroke="#a87349"
        />
        {/* Arrow showing leg should go down */}
        <path d="M 230 110 L 235 150" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arr2)" />
        <defs>
          <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
          </marker>
        </defs>
        <text x="240" y="145" fontSize="10" fill="#ef4444" fontWeight="700">ขาควรตก</text>
        <text x="240" y="158" fontSize="10" fill="#ef4444" fontWeight="700">ลงต่ำกว่านี้</text>
      </svg>
    );
  }

  if (kind === "mirror") {
    return (
      <svg viewBox="0 0 280 320" className={common}>
        {/* Plumb line */}
        <line x1="140" y1="20" x2="140" y2="310" stroke="#22c55e" strokeDasharray="4 4" strokeWidth="1.5" />
        {/* Head */}
        <circle cx="148" cy="40" r="16" fill="#fce7d2" stroke="#a87349" />
        {/* Body APT */}
        <path
          d="M 134 56
             Q 120 100 110 150
             Q 95 180 122 195
             Q 158 200 168 175
             Q 175 100 162 56 Z"
          fill="#fce7d2"
          stroke="#a87349"
        />
        {/* Lumbar curve */}
        <path d="M 168 130 Q 195 170 165 200" fill="none" stroke="#ef4444" strokeWidth="2" />
        {/* Glute */}
        <path d="M 168 195 Q 190 220 165 245" fill="#fce7d2" stroke="#a87349" />
        {/* Legs */}
        <path d="M 122 200 L 118 280 L 138 280 L 142 200 Z" fill="#fce7d2" stroke="#a87349" />
        <path d="M 142 200 L 146 280 L 165 280 L 162 200 Z" fill="#fce7d2" stroke="#a87349" />
        {/* Markers */}
        {[
          { y: 40, label: "หู" },
          { y: 75, label: "ไหล่" },
          { y: 175, label: "สะโพก" },
          { y: 250, label: "เข่า" },
          { y: 295, label: "ข้อเท้า" },
        ].map((m, i) => (
          <g key={i}>
            <circle cx="140" cy={m.y} r="4" fill="#22c55e" />
            <text x="195" y={m.y + 3} fontSize="9" fill="#15803d" fontWeight="700">
              {m.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }

  // lift-leg
  return (
    <svg viewBox="0 0 280 200" className={common}>
      <line x1="20" y1="170" x2="260" y2="170" stroke="#cbd5e1" strokeWidth="2" />
      {/* Lying person */}
      <circle cx="50" cy="130" r="12" fill="#fce7d2" stroke="#a87349" />
      <path
        d="M 62 120 L 130 110 L 130 140 L 62 140 Z"
        fill="#fce7d2"
        stroke="#a87349"
      />
      {/* Hips up */}
      <path
        d="M 130 110 Q 150 90 155 110 L 175 130 L 130 140 Z"
        fill="#fce7d2"
        stroke="#a87349"
      />
      {/* Bent leg planted */}
      <path d="M 175 130 L 175 170 L 195 170 L 195 130 Z" fill="#fce7d2" stroke="#a87349" />
      {/* Lifted leg */}
      <path d="M 150 100 L 240 120 L 240 130 L 145 115 Z" fill="#fce7d2" stroke="#a87349" />
      {/* Arrow showing glute should fire */}
      <circle cx="155" cy="105" r="20" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 2" />
      <text x="155" y="80" fontSize="10" fill="#2563eb" fontWeight="700" textAnchor="middle">
        ควรรู้สึกที่ก้น
      </text>
    </svg>
  );
}
