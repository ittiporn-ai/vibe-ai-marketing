"use client";

import { useState } from "react";
import { PostureFigure } from "./PostureFigure";

type Stage = {
  id: number;
  title: string;
  age: string;
  tilt: "normal" | "anterior" | "extreme";
  whatHappens: string;
  whatYouFeel: string;
  whatChangesInBody: string[];
  redFlag?: boolean;
};

const STAGES: Stage[] = [
  {
    id: 1,
    title: "ท่าทางปกติ",
    age: "ก่อนนั่งทำงานหนัก",
    tilt: "normal",
    whatHappens:
      "เชิงกราน ลำตัว และศีรษะอยู่ในแนวเดียวกัน กล้ามเนื้อหน้าและหลังทำงานสมดุล",
    whatYouFeel: "ไม่ปวดเลย ยืนได้นานโดยไม่เมื่อย",
    whatChangesInBody: [
      "เชิงกรานเป็นกลาง (neutral)",
      "หลังแอ่นเล็กน้อยแบบธรรมชาติ (~30°)",
      "Hip flexors / ขาหน้า / ก้น / ท้อง ทำงานเป็นทีม",
    ],
  },
  {
    id: 2,
    title: "นั่งวันละ 6-10 ชั่วโมง",
    age: "หลายเดือน - 1 ปี",
    tilt: "normal",
    whatHappens:
      "ท่านั่งทำให้สะโพกงออยู่ตลอดเวลา → hip flexors เริ่มหดสั้น, ก้นไม่ได้ทำงาน",
    whatYouFeel: "เริ่มเมื่อยหลังตอนเย็น แต่ยังไม่ปวดชัดเจน",
    whatChangesInBody: [
      "Iliopsoas (hip flexors) เริ่ม 'จำตำแหน่งสั้น' ไว้",
      "ก้น (gluteus maximus) เริ่มอ่อนแรง — 'gluteal amnesia'",
      "Hamstrings เริ่มอ่อนกำลัง",
      "ท้องลึก (TVA) ไม่ได้ทำงาน",
    ],
  },
  {
    id: 3,
    title: "เริ่มมี Anterior Pelvic Tilt",
    age: "1-2 ปี",
    tilt: "anterior",
    whatHappens:
      "Hip flexors ที่ตึงเริ่มดึงเชิงกรานคว่ำลงด้านหน้า ทำให้หลังแอ่นมากเกินไป",
    whatYouFeel:
      "ปวดเอวเวลานั่งนาน, รู้สึกท้องยื่นแม้น้ำหนักเท่าเดิม, ก้นยื่นเวลามองข้าง",
    whatChangesInBody: [
      "เชิงกรานคว่ำหน้า ~10-15°",
      "หลังเอวแอ่นมาก (hyperlordosis)",
      "Erector spinae เริ่มเกร็งตลอดเวลา",
      "ท้องหน้า + obliques ถูกยืดออก → ดูเหมือนพุง",
    ],
    redFlag: true,
  },
  {
    id: 4,
    title: "ปวดหลังเรื้อรัง",
    age: "ตอนนี้",
    tilt: "anterior",
    whatHappens:
      "กล้ามเนื้อหลังเอวต้องทำงานหนักทั้งวันเพื่อพยุงท่าที่ผิด ทำให้เกิดการล้าและอักเสบ",
    whatYouFeel: [
      "ปวดเอวตอนเช้าและเย็น",
      "ยืนนานๆ จะปวดร้าวลงสะโพก",
      "เวลานั่งลงหรือลุกขึ้น รู้สึกฝืด",
      "ท้องแอ่น แม้พยายามแขม่ว",
    ].join(" · "),
    whatChangesInBody: [
      "Lumbar discs รับแรงกดผิดมุมตลอดเวลา",
      "Facet joints หลังถูกเบียด → ปวดร้าว",
      "QL (กล้ามเนื้อข้างเอว) เกร็งทั้งสองข้าง",
      "TFL ทำงานแทน glute med → ปวดสะโพกข้าง",
    ],
    redFlag: true,
  },
  {
    id: 5,
    title: "ถ้าไม่แก้ไข",
    age: "อนาคต 5-10 ปี",
    tilt: "extreme",
    whatHappens:
      "หมอนรองกระดูกเริ่มเสื่อม, ข้อ facet เริ่มอักเสบเรื้อรัง, อาจมีอาการปวดร้าวลงขา",
    whatYouFeel:
      "ปวดร้าวลงขา (sciatica), นั่งเก้าอี้ก็ปวด เดินก็ปวด, นอนต้องหาท่าที่ถูก",
    whatChangesInBody: [
      "Disc bulging / herniation (หมอนรองยื่น)",
      "Facet joint arthropathy (ข้อต่อหลังเสื่อม)",
      "Hip impingement (ข้อสะโพกชน)",
      "Knee tracking issues จาก IT band ตึง",
    ],
    redFlag: true,
  },
];

export function JourneyTimeline() {
  const [current, setCurrent] = useState(2); // start at APT stage

  const stage = STAGES[current];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white border rounded-2xl p-5 sm:p-7">
      {/* Stage selector */}
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all"
          style={{ width: `${((current + 1) / STAGES.length) * 100}%` }}
        />
        <div className="relative grid grid-cols-5 gap-1">
          {STAGES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className="flex flex-col items-center group"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${
                  i === current
                    ? s.redFlag
                      ? "bg-red-500 text-white border-red-600 scale-110 shadow-lg"
                      : "bg-green-500 text-white border-green-600 scale-110 shadow-lg"
                    : i < current
                    ? s.redFlag
                      ? "bg-red-100 text-red-700 border-red-300"
                      : "bg-green-100 text-green-700 border-green-300"
                    : "bg-white text-slate-400 border-slate-300"
                }`}
              >
                {s.id}
              </div>
              <div
                className={`mt-2 text-[10px] sm:text-xs font-medium text-center leading-tight ${
                  i === current ? "text-slate-900" : "text-slate-500"
                }`}
              >
                {s.age}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stage content */}
      <div className="mt-8 grid md:grid-cols-[260px_1fr] gap-6 lg:gap-10 items-start">
        <div className="flex justify-center">
          <PostureFigure
            tilt={stage.tilt}
            highlight={stage.redFlag}
            label={stage.title}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-full font-semibold">
              Stage {stage.id}
            </span>
            {stage.redFlag && (
              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full font-semibold">
                ⚠ ผิดปกติ
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-1">{stage.title}</h3>
          <div className="text-sm text-slate-500 mb-4">{stage.age}</div>

          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">
                เกิดอะไรขึ้น
              </div>
              <p className="leading-relaxed">{stage.whatHappens}</p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">
                สิ่งที่คุณรู้สึก
              </div>
              <p className="leading-relaxed">{stage.whatYouFeel}</p>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-2">
                สิ่งที่เปลี่ยนในร่างกาย
              </div>
              <ul className="space-y-1.5">
                {stage.whatChangesInBody.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        stage.redFlag ? "bg-red-500" : "bg-slate-400"
                      }`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex justify-between items-center pt-5 border-t">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-4 py-2 text-sm rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
        >
          ← ก่อนหน้า
        </button>
        <div className="text-xs text-slate-500">
          {current + 1} / {STAGES.length}
        </div>
        <button
          onClick={() => setCurrent(Math.min(STAGES.length - 1, current + 1))}
          disabled={current === STAGES.length - 1}
          className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800"
        >
          ถัดไป →
        </button>
      </div>
    </div>
  );
}
