"use client";

import { useState } from "react";

type MuscleId =
  | "hip-flexors"
  | "lumbar-erectors"
  | "rectus-femoris"
  | "ql"
  | "tfl"
  | "glute-max"
  | "glute-med"
  | "hamstrings"
  | "rectus-abdominis"
  | "transverse-abdominis"
  | "obliques";

type MuscleInfo = {
  id: MuscleId;
  name: string;
  thaiName: string;
  state: "tight" | "weak";
  region: "front" | "back" | "core";
  why: string;
  effect: string;
};

const MUSCLES: MuscleInfo[] = [
  {
    id: "hip-flexors",
    name: "Iliopsoas (Hip Flexors)",
    thaiName: "กล้ามเนื้อสะโพกด้านหน้าลึก",
    state: "tight",
    region: "front",
    why: "ติดต่อจากกระดูกสันหลังเอวลงไปที่ต้นขา เมื่อนั่งนานๆ จะหดสั้น ดึงเชิงกรานคว่ำลงด้านหน้าตลอดเวลา",
    effect: "แกนหลักที่ทำให้เกิด Anterior Pelvic Tilt",
  },
  {
    id: "rectus-femoris",
    name: "Rectus Femoris",
    thaiName: "ขาหน้า (มัดกลาง)",
    state: "tight",
    region: "front",
    why: "เป็น 1 ใน 4 มัดของ quadriceps ที่ข้ามทั้งข้อสะโพกและข้อเข่า เมื่อสั้นจะดึงเชิงกรานก้มลงเหมือน hip flexors",
    effect: "เสริมแรงดึงเชิงกรานคว่ำหน้า ทำให้ขาหน้าตึงล้า",
  },
  {
    id: "lumbar-erectors",
    name: "Lumbar Erector Spinae",
    thaiName: "กล้ามเนื้อหลังส่วนเอว",
    state: "tight",
    region: "back",
    why: "ต้องเกร็งทำงานหนักตลอดวันเพื่อพยุงตัวที่เอนไปข้างหน้า กลายเป็นมัดที่ overactive และตึงเรื้อรัง",
    effect: "ที่มาของอาการ 'ปวดเอว' ที่คุณรู้สึก — กล้ามเนื้อล้าเรื้อรัง",
  },
  {
    id: "ql",
    name: "Quadratus Lumborum",
    thaiName: "QL (กล้ามเนื้อข้างเอว)",
    state: "tight",
    region: "back",
    why: "พยุงเอวจากด้านข้าง เมื่อหลังแอ่นจะทำงานเสริม lumbar erectors ตลอดเวลา",
    effect: "ปวดเอวร้าวลงสะโพก / ปวดข้างเอวเวลานั่งนาน",
  },
  {
    id: "tfl",
    name: "TFL (Tensor Fasciae Latae)",
    thaiName: "กล้ามเนื้อสะโพกด้านนอก",
    state: "tight",
    region: "front",
    why: "ทำงานชดเชยเมื่อ glute med อ่อนแอ ดึงเชิงกรานหมุนหน้า + ดึง IT band ตึง",
    effect: "ปวดสะโพกข้าง / ปวดเข่าด้านนอก / ขาด้านนอกตึง",
  },
  {
    id: "glute-max",
    name: "Gluteus Maximus",
    thaiName: "ก้นใหญ่",
    state: "weak",
    region: "back",
    why: "นั่งทั้งวันทำให้ก้นถูก 'ปิดสวิตช์' (gluteal amnesia) ไม่ได้ใช้งาน",
    effect: "เชิงกรานล็อกในตำแหน่งคว่ำหน้า ไม่สามารถยืดสะโพกได้เต็มที่",
  },
  {
    id: "glute-med",
    name: "Gluteus Medius",
    thaiName: "ก้นข้าง",
    state: "weak",
    region: "back",
    why: "ไม่ได้ทำงานเวลานั่ง พอเดินจึงปล่อยให้ TFL ทำงานแทน",
    effect: "เชิงกรานไม่นิ่งเวลาเดิน → ปวดสะโพก/เข่า/หลัง",
  },
  {
    id: "hamstrings",
    name: "Hamstrings",
    thaiName: "ขาหลัง",
    state: "weak",
    region: "back",
    why: "ถูกยืดเรื้อรังในท่า APT (จุดเกาะที่ก้นถูกดึงขึ้นตลอด) → ดูเหมือนตึงแต่จริงๆ คือ 'ตึงเพราะอ่อนแอ'",
    effect: "ดึงไม่เพียงพอที่จะหมุนเชิงกรานกลับมาเป็นกลาง",
  },
  {
    id: "rectus-abdominis",
    name: "Rectus Abdominis",
    thaiName: "ท้องหน้า (six-pack)",
    state: "weak",
    region: "core",
    why: "ถูกยืดออกตลอดเวลาเพราะหน้าท้องยื่นออกมา → ใช้งานไม่ได้",
    effect: "ไม่ช่วยพยุงเอว ทำให้ท้องดู 'แอ่น/พุง' แม้ไม่มีไขมัน",
  },
  {
    id: "transverse-abdominis",
    name: "Transverse Abdominis",
    thaiName: "กล้ามเนื้อท้องชั้นลึก (TVA)",
    state: "weak",
    region: "core",
    why: "เป็น 'เข็มขัดธรรมชาติ' ของร่างกาย แต่ไม่ได้ทำงานเพราะท่านั่งไม่กระตุ้นมัน",
    effect: "ไม่สร้างแรงดันในช่องท้อง → หลังต้องรับน้ำหนักทั้งหมด",
  },
  {
    id: "obliques",
    name: "Obliques",
    thaiName: "ท้องข้าง",
    state: "weak",
    region: "core",
    why: "ทำงานคู่กับ TVA แต่ถูกปิดเช่นกัน",
    effect: "เอวไม่แข็งแรง / บิดตัวลำบาก",
  },
];

export function MuscleMap() {
  const [selected, setSelected] = useState<MuscleId | null>(null);
  const [filter, setFilter] = useState<"all" | "tight" | "weak">("all");

  const visible = MUSCLES.filter((m) => filter === "all" || m.state === filter);
  const current = MUSCLES.find((m) => m.id === selected) ?? null;

  return (
    <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-8">
      {/* Body diagram with hotspots */}
      <div className="bg-slate-50 rounded-2xl p-4 border">
        <div className="flex gap-2 mb-3 text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-full transition ${
              filter === "all"
                ? "bg-slate-900 text-white"
                : "bg-white border text-slate-700"
            }`}
          >
            แสดงทั้งหมด
          </button>
          <button
            onClick={() => setFilter("tight")}
            className={`px-3 py-1.5 rounded-full transition ${
              filter === "tight"
                ? "bg-red-600 text-white"
                : "bg-white border text-red-700"
            }`}
          >
            ตึง / Overactive
          </button>
          <button
            onClick={() => setFilter("weak")}
            className={`px-3 py-1.5 rounded-full transition ${
              filter === "weak"
                ? "bg-blue-600 text-white"
                : "bg-white border text-blue-700"
            }`}
          >
            อ่อนแอ / Underactive
          </button>
        </div>

        <svg viewBox="0 0 360 520" className="w-full h-auto">
          <defs>
            <linearGradient id="skin-map" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fce7d2" />
              <stop offset="100%" stopColor="#e8c19a" />
            </linearGradient>
            <radialGradient id="tight-glow">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.25" />
            </radialGradient>
            <radialGradient id="weak-glow">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.25" />
            </radialGradient>
          </defs>

          {/* Body silhouette (anterior view, simplified) */}
          {/* Head */}
          <circle cx="180" cy="50" r="28" fill="url(#skin-map)" stroke="#a87349" />
          {/* Neck */}
          <rect x="168" y="76" width="24" height="18" fill="url(#skin-map)" stroke="#a87349" />
          {/* Torso */}
          <path
            d="M 130 95 L 100 200 Q 105 270 130 320 L 230 320 Q 255 270 260 200 L 230 95 Z"
            fill="url(#skin-map)"
            stroke="#a87349"
          />
          {/* Arms */}
          <path d="M 100 110 L 70 240 L 90 250 L 115 130 Z" fill="url(#skin-map)" stroke="#a87349" />
          <path d="M 260 110 L 290 240 L 270 250 L 245 130 Z" fill="url(#skin-map)" stroke="#a87349" />
          {/* Legs */}
          <path d="M 130 320 L 120 470 L 165 470 L 175 320 Z" fill="url(#skin-map)" stroke="#a87349" />
          <path d="M 230 320 L 240 470 L 195 470 L 185 320 Z" fill="url(#skin-map)" stroke="#a87349" />
          {/* Feet */}
          <ellipse cx="142" cy="478" rx="22" ry="8" fill="#1f2937" />
          <ellipse cx="218" cy="478" rx="22" ry="8" fill="#1f2937" />

          {/* Hotspots — render dynamically */}
          {/* Hip flexors */}
          {(filter === "all" || filter === "tight") && (
            <Hotspot
              x={160}
              y={290}
              state="tight"
              active={selected === "hip-flexors"}
              onClick={() => setSelected("hip-flexors")}
              label="Hip Flexors"
            />
          )}
          {(filter === "all" || filter === "tight") && (
            <Hotspot
              x={200}
              y={290}
              state="tight"
              active={selected === "hip-flexors"}
              onClick={() => setSelected("hip-flexors")}
            />
          )}

          {/* Rectus femoris (front thigh) */}
          {(filter === "all" || filter === "tight") && (
            <Hotspot
              x={155}
              y={370}
              state="tight"
              active={selected === "rectus-femoris"}
              onClick={() => setSelected("rectus-femoris")}
              label="ขาหน้า"
            />
          )}
          {(filter === "all" || filter === "tight") && (
            <Hotspot
              x={205}
              y={370}
              state="tight"
              active={selected === "rectus-femoris"}
              onClick={() => setSelected("rectus-femoris")}
            />
          )}

          {/* TFL (outer hip front) */}
          {(filter === "all" || filter === "tight") && (
            <Hotspot
              x={130}
              y={310}
              state="tight"
              active={selected === "tfl"}
              onClick={() => setSelected("tfl")}
              label="TFL"
            />
          )}
          {(filter === "all" || filter === "tight") && (
            <Hotspot
              x={230}
              y={310}
              state="tight"
              active={selected === "tfl"}
              onClick={() => setSelected("tfl")}
            />
          )}

          {/* Rectus abdominis */}
          {(filter === "all" || filter === "weak") && (
            <Hotspot
              x={180}
              y={230}
              state="weak"
              active={selected === "rectus-abdominis"}
              onClick={() => setSelected("rectus-abdominis")}
              label="ท้องหน้า"
            />
          )}

          {/* TVA */}
          {(filter === "all" || filter === "weak") && (
            <Hotspot
              x={180}
              y={270}
              state="weak"
              active={selected === "transverse-abdominis"}
              onClick={() => setSelected("transverse-abdominis")}
              label="TVA (ลึก)"
            />
          )}

          {/* Obliques */}
          {(filter === "all" || filter === "weak") && (
            <Hotspot
              x={138}
              y={250}
              state="weak"
              active={selected === "obliques"}
              onClick={() => setSelected("obliques")}
            />
          )}
          {(filter === "all" || filter === "weak") && (
            <Hotspot
              x={222}
              y={250}
              state="weak"
              active={selected === "obliques"}
              onClick={() => setSelected("obliques")}
              label="ท้องข้าง"
            />
          )}
        </svg>

        {/* Posterior view */}
        <div className="mt-4 pt-4 border-t">
          <div className="text-xs text-slate-500 mb-2 font-medium">มุมหลัง</div>
          <svg viewBox="0 0 360 520" className="w-full h-auto">
            <defs>
              <linearGradient id="skin-back" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fce7d2" />
                <stop offset="100%" stopColor="#e8c19a" />
              </linearGradient>
            </defs>
            {/* Head back */}
            <circle cx="180" cy="50" r="28" fill="url(#skin-back)" stroke="#a87349" />
            {/* Neck */}
            <rect x="168" y="76" width="24" height="18" fill="url(#skin-back)" stroke="#a87349" />
            {/* Back */}
            <path d="M 130 95 L 100 200 Q 105 270 130 320 L 230 320 Q 255 270 260 200 L 230 95 Z" fill="url(#skin-back)" stroke="#a87349" />
            {/* Arms */}
            <path d="M 100 110 L 70 240 L 90 250 L 115 130 Z" fill="url(#skin-back)" stroke="#a87349" />
            <path d="M 260 110 L 290 240 L 270 250 L 245 130 Z" fill="url(#skin-back)" stroke="#a87349" />
            {/* Buttocks (clearly visible from back) */}
            <ellipse cx="155" cy="335" rx="32" ry="22" fill="#a87349" opacity="0.4" />
            <ellipse cx="205" cy="335" rx="32" ry="22" fill="#a87349" opacity="0.4" />
            {/* Legs back */}
            <path d="M 130 320 L 120 470 L 165 470 L 175 320 Z" fill="url(#skin-back)" stroke="#a87349" />
            <path d="M 230 320 L 240 470 L 195 470 L 185 320 Z" fill="url(#skin-back)" stroke="#a87349" />

            {/* Spine line */}
            <line x1="180" y1="95" x2="180" y2="320" stroke="#92400e" strokeWidth="1" strokeDasharray="2 3" />

            {/* Lumbar erectors */}
            {(filter === "all" || filter === "tight") && (
              <Hotspot x={165} y={250} state="tight" active={selected === "lumbar-erectors"} onClick={() => setSelected("lumbar-erectors")} label="Erector Spinae" />
            )}
            {(filter === "all" || filter === "tight") && (
              <Hotspot x={195} y={250} state="tight" active={selected === "lumbar-erectors"} onClick={() => setSelected("lumbar-erectors")} />
            )}

            {/* QL */}
            {(filter === "all" || filter === "tight") && (
              <Hotspot x={135} y={235} state="tight" active={selected === "ql"} onClick={() => setSelected("ql")} label="QL" />
            )}
            {(filter === "all" || filter === "tight") && (
              <Hotspot x={225} y={235} state="tight" active={selected === "ql"} onClick={() => setSelected("ql")} />
            )}

            {/* Glute max */}
            {(filter === "all" || filter === "weak") && (
              <Hotspot x={155} y={335} state="weak" active={selected === "glute-max"} onClick={() => setSelected("glute-max")} label="ก้นใหญ่" />
            )}
            {(filter === "all" || filter === "weak") && (
              <Hotspot x={205} y={335} state="weak" active={selected === "glute-max"} onClick={() => setSelected("glute-max")} />
            )}

            {/* Glute med */}
            {(filter === "all" || filter === "weak") && (
              <Hotspot x={125} y={310} state="weak" active={selected === "glute-med"} onClick={() => setSelected("glute-med")} label="ก้นข้าง" />
            )}
            {(filter === "all" || filter === "weak") && (
              <Hotspot x={235} y={310} state="weak" active={selected === "glute-med"} onClick={() => setSelected("glute-med")} />
            )}

            {/* Hamstrings */}
            {(filter === "all" || filter === "weak") && (
              <Hotspot x={150} y={400} state="weak" active={selected === "hamstrings"} onClick={() => setSelected("hamstrings")} label="ขาหลัง" />
            )}
            {(filter === "all" || filter === "weak") && (
              <Hotspot x={210} y={400} state="weak" active={selected === "hamstrings"} onClick={() => setSelected("hamstrings")} />
            )}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
            <span>ตึง (Tight/Overactive)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
            <span>อ่อนแอ (Weak/Underactive)</span>
          </div>
        </div>
      </div>

      {/* Right side: muscle list + detail */}
      <div>
        <div className="bg-white rounded-2xl border p-5 mb-4">
          {current ? (
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    {current.region === "front"
                      ? "ด้านหน้า"
                      : current.region === "back"
                      ? "ด้านหลัง"
                      : "แกนกลาง (Core)"}
                  </div>
                  <h3 className="text-xl font-bold">{current.thaiName}</h3>
                  <div className="text-sm text-slate-500">{current.name}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    current.state === "tight"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {current.state === "tight" ? "ตึง" : "อ่อนแอ"}
                </span>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="text-xs font-semibold text-slate-600 mb-1">
                    ทำไมถึงเป็นแบบนี้
                  </div>
                  <div className="text-sm leading-relaxed">{current.why}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-600 mb-1">
                    ผลกระทบกับคุณ
                  </div>
                  <div className="text-sm leading-relaxed">{current.effect}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-slate-500">
              <div className="text-3xl mb-2">👆</div>
              <div className="text-sm">
                แตะจุดบนรูปร่างคน หรือเลือกกล้ามเนื้อด้านล่าง
                <br />
                เพื่อดูว่าทำไม "ตึง" หรือทำไม "อ่อนแอ"
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {visible.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition border ${
                selected === m.id
                  ? m.state === "tight"
                    ? "bg-red-50 border-red-300"
                    : "bg-blue-50 border-blue-300"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="text-sm font-medium">{m.thaiName}</div>
                <div className="text-xs text-slate-500">{m.name}</div>
              </div>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  m.state === "tight"
                    ? "bg-red-100 text-red-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {m.state === "tight" ? "TIGHT" : "WEAK"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hotspot({
  x,
  y,
  state,
  active,
  onClick,
  label,
}: {
  x: number;
  y: number;
  state: "tight" | "weak";
  active: boolean;
  onClick: () => void;
  label?: string;
}) {
  const fill = state === "tight" ? "url(#tight-glow)" : "url(#weak-glow)";
  const stroke = state === "tight" ? "#dc2626" : "#2563eb";
  return (
    <g
      onClick={onClick}
      style={{ cursor: "pointer" }}
      className="transition-transform"
    >
      <circle
        cx={x}
        cy={y}
        r={active ? 18 : 12}
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 2.5 : 1.5}
      >
        <animate
          attributeName="r"
          values={active ? "16;20;16" : "10;13;10"}
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      {label && (
        <text
          x={x}
          y={y - 18}
          fontSize="10"
          fontWeight="700"
          fill={stroke}
          textAnchor="middle"
        >
          {label}
        </text>
      )}
    </g>
  );
}
