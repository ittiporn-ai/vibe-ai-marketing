import type { Metadata } from "next";
import Link from "next/link";
import { PostureFigure } from "@/components/back-pain/PostureFigure";
import { PelvisDiagram } from "@/components/back-pain/PelvisDiagram";
import { MuscleMap } from "@/components/back-pain/MuscleMap";
import { JourneyTimeline } from "@/components/back-pain/JourneyTimeline";
import { SelfTest } from "@/components/back-pain/SelfTest";
import { FixPlan } from "@/components/back-pain/FixPlan";

export const metadata: Metadata = {
  title: "ทำไมหลังคุณปวด — Anterior Pelvic Tilt อธิบายแบบครบ",
  description:
    "สื่อการสอน Anatomy อาการปวดหลังจากเชิงกรานคว่ำหน้า: รู้ว่ากล้ามเนื้อไหนตึง ไหนอ่อนแอ และจะแก้ยังไง",
};

export default function BackPainEducationPage() {
  return (
    <main id="top" className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-rose-50" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border rounded-full text-xs font-medium text-slate-600 mb-5">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            สื่อการสอน · Anatomy ของอาการปวดหลัง
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-4">
            ทำไมหลังคุณปวด <br />
            และทำไม "ท้องแอ่น" ทั้งๆ ที่ไม่อ้วน
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mb-8 leading-relaxed">
            สิ่งที่คุณเห็นในวิดีโอเรียกว่า{" "}
            <strong className="text-slate-900">Anterior Pelvic Tilt</strong>{" "}
            (เชิงกรานคว่ำหน้า) — มันคือต้นเหตุของอาการปวดเอว ก้นยื่น
            และท้องดูยื่นแม้น้ำหนักจะเท่าเดิม. หน้านี้จะอธิบายทุกกล้ามเนื้อที่เกี่ยวข้อง
            เห็น Journey ตั้งแต่ยังปกติจนถึงตอนนี้
            พร้อมแนวทางแก้แบบเข้าใจง่ายสำหรับคุณ เพื่อน และญาติ
          </p>

          {/* Big side-by-side comparison */}
          <div className="bg-white rounded-3xl border shadow-sm p-6 sm:p-10">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="text-xs font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full mb-3">
                  ท่าทางปกติ
                </div>
                <PostureFigure tilt="normal" label="Neutral Pelvis" />
                <ul className="mt-4 text-sm text-slate-600 space-y-1">
                  <li>✓ เชิงกรานเป็นกลาง</li>
                  <li>✓ ไหล่-สะโพก-ข้อเท้า ตรงแนว</li>
                  <li>✓ ท้องไม่ยื่นเกินไหล่</li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs font-semibold text-rose-700 bg-rose-100 px-3 py-1 rounded-full mb-3">
                  อาการของคุณ
                </div>
                <PostureFigure tilt="anterior" label="Anterior Pelvic Tilt" highlight />
                <ul className="mt-4 text-sm text-slate-600 space-y-1">
                  <li>✗ เชิงกรานคว่ำหน้า ~12°</li>
                  <li>✗ หลังเอวแอ่น (hyperlordosis)</li>
                  <li>✗ ท้องยื่น + ก้นยื่น</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: คืออะไร */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10 items-start">
          <div>
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
              บทที่ 1
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Anterior Pelvic Tilt คืออะไร?
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                ลองนึกภาพ <strong>"เชิงกราน" เป็นชามใส่น้ำ</strong>{" "}
                ปกติแล้วชามนี้จะอยู่ในแนวที่น้ำไม่หกออก
              </p>
              <p>
                แต่ถ้ามีคนค่อยๆ ดึง <strong>"ขอบหน้าของชาม"</strong> ลง
                น้ำในชามก็จะไหลออกทางด้านหน้า — นั่นแหละคือ Anterior Pelvic
                Tilt
              </p>
              <p>
                ในร่างกายคุณ "คนที่ดึงขอบชาม" คือ{" "}
                <strong className="text-red-700">Hip Flexors</strong>{" "}
                (กล้ามเนื้อพับสะโพก) ที่ตึงเรื้อรังจากการนั่งทั้งวัน
              </p>
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="text-sm font-semibold text-amber-900 mb-1">
                  💡 รู้หรือไม่
                </div>
                <div className="text-sm text-amber-800">
                  มุมเอียงเชิงกรานปกติของผู้ชายอยู่ที่ ~7° (ผู้หญิง ~12°)
                  ถ้ามากกว่า 15° ถือเป็น APT ระดับที่ทำให้เกิดอาการปวด
                </div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border rounded-2xl p-4">
              <div className="text-xs font-semibold text-green-700 mb-2">
                เชิงกรานเป็นกลาง
              </div>
              <PelvisDiagram state="normal" />
            </div>
            <div className="bg-white border rounded-2xl p-4">
              <div className="text-xs font-semibold text-rose-700 mb-2">
                เชิงกรานคว่ำหน้า
              </div>
              <PelvisDiagram state="anterior" />
            </div>
            <div className="sm:col-span-2 grid grid-cols-2 gap-3 text-xs text-slate-600 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                <span>ASIS — จุดสะโพกหน้า (ปกติจะอยู่ในแนวตั้งกับ PSIS)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span>PSIS — จุดสะโพกหลัง</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Journey */}
      <section className="bg-slate-50 border-y">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
          <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
            บทที่ 2
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Journey: จากท่าทางปกติ → ปวดหลังเรื้อรัง
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            ดูทีละ Stage ว่าร่างกายเปลี่ยนยังไง คุณรู้สึกอะไร
            และอะไรเปลี่ยนข้างในระดับกล้ามเนื้อ-กระดูก
          </p>
          <JourneyTimeline />
        </div>
      </section>

      {/* SECTION 3: แผนที่กล้ามเนื้อ */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
          บทที่ 3
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          แผนที่กล้ามเนื้อ — ใครตึง ใครอ่อนแอ
        </h2>
        <p className="text-slate-600 mb-6 max-w-3xl">
          นี่คือ "นักโทษ" ทั้ง 11 มัดที่ทำให้คุณปวดหลัง.
          แตะจุดแดง/น้ำเงินบนภาพเพื่อดูว่ามัดไหนทำหน้าที่อะไร
          และทำไมถึงผิดปกติ
        </p>

        <div className="grid md:grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl bg-red-50 border border-red-200 p-4">
            <div className="text-xs font-bold text-red-700 mb-1">🔴 ตึง (Overactive)</div>
            <div className="text-sm">
              ทำงานหนักเกินไปเพื่อพยุงท่าที่ผิด → ปวด เกร็ง สั้น
            </div>
          </div>
          <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
            <div className="text-xs font-bold text-blue-700 mb-1">🔵 อ่อนแอ (Underactive)</div>
            <div className="text-sm">
              ถูก "ปิดสวิตช์" จากการนั่งหรือถูกยืดเรื้อรัง → ไม่ทำงาน
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
            <div className="text-xs font-bold text-amber-700 mb-1">⚖️ ผลลัพธ์</div>
            <div className="text-sm">
              ความไม่สมดุล = APT → ปวดหลัง + ดูเหมือนพุง
            </div>
          </div>
        </div>

        <MuscleMap />
      </section>

      {/* SECTION 4: ทำไมดูเหมือนพุง */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 border-y">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
          <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
            บทที่ 4
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            ทำไม "ท้องแอ่น" แม้น้ำหนักเท่าเดิม
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            หลายคนคิดว่าท้องยื่นเพราะอ้วน — แต่จริงๆ
            ส่วนใหญ่เป็นเพราะโครงกระดูกเอียง ไม่ใช่ไขมัน
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                step: "1",
                title: "เชิงกรานคว่ำหน้า",
                detail:
                  "ขอบหน้าของเชิงกราน (ASIS) ถูกดึงลง → อวัยวะในช่องท้องถูกดันออกมาด้านหน้า",
              },
              {
                step: "2",
                title: "ท้องหน้า + TVA ถูกยืด",
                detail:
                  "กล้ามเนื้อท้องที่ควรจะรั้งให้แบนถูกยืดออกตลอด → ใช้งานไม่ได้",
              },
              {
                step: "3",
                title: "หลังเอวแอ่นเสริม",
                detail:
                  "หลังเอวแอ่นเข้า ทำให้ท้องยื่นออกในมุมตรงข้าม = 'ดูเหมือนพุง'",
              },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border p-5">
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  {s.step}
                </div>
                <div className="font-bold mb-2">{s.title}</div>
                <div className="text-sm text-slate-600 leading-relaxed">
                  {s.detail}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-white rounded-2xl border-l-4 border-orange-500">
            <div className="font-bold mb-1">ข่าวดี</div>
            <p className="text-sm text-slate-700">
              ถ้าคุณแก้ APT ได้ ท้องจะดู "แบนลง" ทันที โดยที่ยังไม่ลดน้ำหนักเลย
              เพราะที่ดูยื่นจริงๆ ส่วนใหญ่คือ "มุมของกระดูก" ไม่ใช่ไขมัน
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: Self Test */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
          บทที่ 5
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          ทดสอบตัวเอง 4 ท่า — เพื่อยืนยันว่าใช่ APT จริงหรือไม่
        </h2>
        <p className="text-slate-600 mb-8 max-w-3xl">
          ทำที่บ้านได้ ไม่ต้องใช้อุปกรณ์ ลองทำ 4 ท่านี้
          แล้วบันทึกผลก่อนเริ่มแก้ไข
        </p>
        <SelfTest />
      </section>

      {/* SECTION 6: Fix Plan */}
      <section className="bg-slate-50 border-y">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
          <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
            บทที่ 6
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            แผนแก้ไข 3 ขั้น: ยืด + เสริมแรง + ปรับพฤติกรรม
          </h2>
          <p className="text-slate-600 mb-8 max-w-3xl">
            สูตรพื้นฐานที่ใช้ในกายภาพบำบัด: <strong>ยืด</strong>
            สิ่งที่ตึง <strong>เสริมแรง</strong> สิ่งที่อ่อนแอ และที่สำคัญที่สุด —{" "}
            <strong>ปรับพฤติกรรม</strong> ไม่ให้กลับมาเป็นอีก
          </p>
          <FixPlan />

          <div className="mt-10 p-5 bg-white border rounded-2xl">
            <div className="font-bold mb-2">⏰ ตารางสัปดาห์ตัวอย่าง</div>
            <div className="grid grid-cols-7 gap-2 text-xs">
              {[
                { day: "จ", a: "ยืด", b: "Bridge" },
                { day: "อ", a: "ยืด", b: "Dead Bug" },
                { day: "พ", a: "ยืด", b: "Bridge" },
                { day: "พฤ", a: "ยืด", b: "Clamshell" },
                { day: "ศ", a: "ยืด", b: "Dead Bug" },
                { day: "ส", a: "เดิน", b: "PPT" },
                { day: "อา", a: "พัก", b: "ยืดเบาๆ" },
              ].map((d, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-2 text-center bg-slate-50"
                >
                  <div className="font-bold text-slate-700">{d.day}</div>
                  <div className="text-slate-600 mt-1">{d.a}</div>
                  <div className="text-slate-600">{d.b}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-500 mt-3">
              ใช้เวลาเพียง 15-20 นาที/วัน. ผลจะเริ่มรู้สึกใน 2-4 สัปดาห์
              และเปลี่ยนชัดเจนใน 8-12 สัปดาห์
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: เมื่อไหร่ควรไปหาหมอ */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-2">
          บทที่ 7
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          เมื่อไหร่ควรไปหาหมอ/นักกายภาพบำบัด?
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
            <div className="font-bold text-red-700 mb-3">
              🚨 ไปหาหมอเร็วที่สุด ถ้ามีอาการนี้
            </div>
            <ul className="space-y-2 text-sm">
              <li>• ปวดร้าวลงขาถึงน่อง/เท้า (sciatica)</li>
              <li>• ขาชา/อ่อนแรง/เดินไม่ถนัด</li>
              <li>• กลั้นปัสสาวะ/อุจจาระไม่ได้ (red flag!)</li>
              <li>• ปวดตอนกลางคืนจนนอนไม่ได้</li>
              <li>• ปวดต่อเนื่องเกิน 6 สัปดาห์โดยไม่ดีขึ้น</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <div className="font-bold text-blue-700 mb-3">
              💪 ลองทำเองได้ก่อน ถ้า
            </div>
            <ul className="space-y-2 text-sm">
              <li>• ปวดเอวเฉพาะตอนนั่งนาน/ยืนนาน</li>
              <li>• อาการดีขึ้นเมื่อขยับ/ออกกำลังกาย</li>
              <li>• ยังเดิน-วิ่ง-นั่ง-นอนได้ปกติ</li>
              <li>• ไม่มีอาการชา/อ่อนแรง</li>
              <li>• เพิ่งเริ่มมีอาการไม่กี่สัปดาห์</li>
            </ul>
            <div className="mt-3 text-xs text-blue-700 italic">
              ทำตามแผนใน "บทที่ 6" ก่อน 4-6 สัปดาห์
              ถ้าไม่ดีขึ้นค่อยไปพบผู้เชี่ยวชาญ
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-14 text-center">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            แชร์ให้คนที่คุณห่วงใย
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            ถ้าคุณรู้จักใครที่บ่นปวดหลังบ่อยๆ
            หรือมีท่าทางคล้ายในวิดีโอ ส่งหน้านี้ให้เขาดู —
            ความเข้าใจเป็นจุดเริ่มต้นของการแก้ไขที่ถูกต้อง
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-100 transition"
            >
              กลับหน้าแรก
            </Link>
            <a
              href="#top"
              className="px-5 py-2.5 border border-white/20 rounded-lg font-medium hover:bg-white/10 transition"
            >
              ↑ กลับขึ้นบน
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t bg-slate-50">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 text-xs text-slate-500 leading-relaxed">
          <strong>หมายเหตุ:</strong> เนื้อหานี้เป็นสื่อการสอนทางการศึกษา
          อ้างอิงจากหลักกายวิภาคและกายภาพบำบัดทั่วไป
          ไม่ใช่คำวินิจฉัยทางการแพทย์
          หากมีอาการรุนแรงหรือต่อเนื่อง โปรดพบแพทย์เฉพาะทางหรือนักกายภาพบำบัดที่มีใบประกอบวิชาชีพ
        </div>
      </footer>
    </main>
  );
}
