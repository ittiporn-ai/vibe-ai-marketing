"use client";

type Exercise = {
  category: "stretch" | "strengthen" | "habit";
  title: string;
  target: string;
  how: string[];
  freq: string;
};

const EXERCISES: Exercise[] = [
  {
    category: "stretch",
    title: "Kneeling Hip Flexor Stretch",
    target: "Iliopsoas / Rectus Femoris (ขาหน้า + สะโพกหน้า)",
    how: [
      "คุกเข่าข้างหนึ่งบนพื้น อีกข้างตั้งฉาก 90°",
      "เกร็งก้นข้างที่คุกเข่า แล้วดันสะโพกไปด้านหน้าช้าๆ",
      "ค้าง 30 วินาที × 3 ครั้ง ต่อข้าง",
    ],
    freq: "ทุกวัน หรืออย่างน้อย 5 ครั้ง/สัปดาห์",
  },
  {
    category: "stretch",
    title: "Couch Stretch",
    target: "Rectus Femoris (ขาหน้า) — ลึกกว่าท่าคุกเข่าธรรมดา",
    how: [
      "คุกเข่าหน้าโซฟา/กำแพง วางหลังเท้าพิงโซฟา",
      "ก้าวขาอีกข้างไปด้านหน้าเป็น 90°",
      "เกร็งก้น ดันสะโพกหน้า ค้าง 30 วินาที × 2",
    ],
    freq: "หลังนั่งทำงานทุก 2-3 ชั่วโมง",
  },
  {
    category: "strengthen",
    title: "Glute Bridge → Single Leg Bridge",
    target: "Gluteus Maximus + Hamstrings",
    how: [
      "นอนหงาย ชันเข่าสองข้าง",
      "เกร็งก้น ยกสะโพกขึ้นเป็นเส้นตรงจากเข่า-สะโพก-ไหล่",
      "ค้าง 2 วินาทีบนสุด แล้วลงช้าๆ",
      "ทำ 3 เซ็ต × 12-15 ครั้ง (ขั้นสูง: ยกขาเดียว)",
    ],
    freq: "วันเว้นวัน",
  },
  {
    category: "strengthen",
    title: "Dead Bug",
    target: "Transverse Abdominis (TVA) + Rectus Abdominis",
    how: [
      "นอนหงาย ยกขา/แขนตั้งฉาก 90°",
      "กดเอวแนบพื้นตลอดเวลา (สำคัญที่สุด!)",
      "ค่อยๆ ยืดแขนข้างหนึ่ง + ขาตรงข้ามลง ใกล้พื้น",
      "กลับมาแล้วสลับข้าง — 3 เซ็ต × 8-10 ครั้ง",
    ],
    freq: "3-4 ครั้ง/สัปดาห์",
  },
  {
    category: "strengthen",
    title: "Posterior Pelvic Tilt",
    target: "ฝึก 'รู้สึก' การหมุนเชิงกรานกลับมาเป็นกลาง",
    how: [
      "นอนหงาย ชันเข่า",
      "กดสันหลังส่วนล่างให้แนบพื้น (เหมือนแขม่วท้องดันลง)",
      "ค้าง 5 วินาที × 15 ครั้ง",
      "จุดประสงค์: ฝึกสมอง-กล้ามเนื้อให้รู้จักท่านี้",
    ],
    freq: "ทุกวัน วันละ 2 รอบ",
  },
  {
    category: "strengthen",
    title: "Clamshell + Side Plank",
    target: "Gluteus Medius (ก้นข้าง) + Obliques",
    how: [
      "Clamshell: นอนตะแคง งอเข่า เปิดเข่าบนค้างไว้ × 15 ครั้ง",
      "ตามด้วย Side Plank ค้าง 30 วินาที × 3 ข้างละ",
    ],
    freq: "3 ครั้ง/สัปดาห์",
  },
  {
    category: "habit",
    title: "ลุกทุก 30-45 นาที",
    target: "ป้องกัน Hip flexors หดสั้นกลับมา",
    how: [
      "ตั้งนาฬิกาเตือนทุก 30-45 นาที",
      "ลุกขึ้นเดิน 1-2 นาที + ยืด hip flexors 20 วินาที",
    ],
    freq: "ทุกวันทำงาน",
  },
  {
    category: "habit",
    title: "ปรับเก้าอี้ + จอ",
    target: "ลดท่านั่งที่ทำให้สะโพกงอ > 90°",
    how: [
      "นั่งให้สะโพกสูงกว่าเข่าเล็กน้อย",
      "เท้าราบกับพื้น เข่าทำมุม ~95°",
      "จอตาที่ระดับสายตา ไม่ก้มคอ",
    ],
    freq: "ตั้งครั้งเดียว ใช้ทั้งชีวิต",
  },
  {
    category: "habit",
    title: "นอนท่าที่ลด Lordosis",
    target: "พักหลังเอวระหว่างนอน",
    how: [
      "นอนหงาย: เอาหมอนรองใต้เข่า",
      "นอนตะแคง: เอาหมอนคีบระหว่างเข่า",
      "หลีกเลี่ยงนอนคว่ำ (ทำให้หลังแอ่นมากขึ้น)",
    ],
    freq: "ทุกคืน",
  },
];

const CATEGORY_INFO = {
  stretch: {
    label: "ยืด",
    desc: "คลายกล้ามเนื้อที่ตึง",
    color: "red",
    icon: "↹",
  },
  strengthen: {
    label: "เสริมแรง",
    desc: "ปลุกกล้ามเนื้อที่อ่อนแอ",
    color: "blue",
    icon: "▲",
  },
  habit: {
    label: "ปรับพฤติกรรม",
    desc: "เปลี่ยนสิ่งที่ทำทุกวัน",
    color: "green",
    icon: "◆",
  },
};

export function FixPlan() {
  const groups: Array<keyof typeof CATEGORY_INFO> = [
    "stretch",
    "strengthen",
    "habit",
  ];

  return (
    <div className="space-y-6">
      {groups.map((cat) => {
        const info = CATEGORY_INFO[cat];
        const items = EXERCISES.filter((e) => e.category === cat);
        const colorMap = {
          red: "bg-red-50 border-red-200 text-red-700",
          blue: "bg-blue-50 border-blue-200 text-blue-700",
          green: "bg-green-50 border-green-200 text-green-700",
        };
        const badgeColor = {
          red: "bg-red-500",
          blue: "bg-blue-500",
          green: "bg-green-500",
        };
        return (
          <div key={cat}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold ${
                  badgeColor[info.color as keyof typeof badgeColor]
                }`}
              >
                {info.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{info.label}</h3>
                <div className="text-sm text-slate-500">{info.desc}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((ex, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-4 ${
                    colorMap[info.color as keyof typeof colorMap]
                  }`}
                >
                  <div className="font-bold mb-1">{ex.title}</div>
                  <div className="text-xs opacity-80 mb-3">
                    เป้าหมาย: {ex.target}
                  </div>
                  <ol className="space-y-1 text-sm text-slate-700 mb-3">
                    {ex.how.map((step, j) => (
                      <li key={j} className="flex gap-1.5">
                        <span className="font-bold opacity-70">{j + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="text-xs font-semibold mt-2 pt-2 border-t border-current/20">
                    ⏱ {ex.freq}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
