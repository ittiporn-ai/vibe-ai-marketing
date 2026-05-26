"use client";

type Props = {
  tilt?: "normal" | "anterior" | "extreme";
  label?: string;
  highlight?: boolean;
  className?: string;
};

export function PostureFigure({
  tilt = "normal",
  label,
  highlight = false,
  className = "",
}: Props) {
  const tiltAngle = tilt === "normal" ? 0 : tilt === "anterior" ? 12 : 22;
  const bellyOffset = tilt === "normal" ? 0 : tilt === "anterior" ? 8 : 14;
  const lumbarCurve = tilt === "normal" ? 18 : tilt === "anterior" ? 32 : 44;
  const buttOffset = tilt === "normal" ? 0 : tilt === "anterior" ? 6 : 11;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        viewBox="0 0 240 480"
        className="w-full max-w-[260px] h-auto"
        aria-label={`Body posture ${tilt}`}
      >
        <defs>
          <linearGradient id={`skin-${tilt}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fde0c2" />
            <stop offset="100%" stopColor="#e9b48a" />
          </linearGradient>
          <linearGradient id={`short-${tilt}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f1f1f" />
            <stop offset="100%" stopColor="#3a3a3a" />
          </linearGradient>
        </defs>

        {/* Floor reference line */}
        <line
          x1="20"
          y1="465"
          x2="220"
          y2="465"
          stroke="#cbd5e1"
          strokeDasharray="4 4"
        />

        {/* Plumb line (ideal vertical) */}
        <line
          x1="120"
          y1="30"
          x2="120"
          y2="465"
          stroke={highlight ? "#22c55e" : "#94a3b8"}
          strokeDasharray="3 5"
          strokeWidth="1.2"
          opacity="0.7"
        />

        {/* Head */}
        <circle
          cx={120 + (tilt === "extreme" ? 6 : tilt === "anterior" ? 3 : 0)}
          cy="50"
          r="26"
          fill={`url(#skin-${tilt})`}
          stroke="#6b7280"
          strokeWidth="1"
        />
        {/* Ear */}
        <circle
          cx={140 + (tilt === "extreme" ? 6 : tilt === "anterior" ? 3 : 0)}
          cy="52"
          r="3"
          fill="#a87349"
        />

        {/* Neck */}
        <path
          d={`M ${108 + (tilt === "extreme" ? 4 : tilt === "anterior" ? 2 : 0)} 72
              Q ${118 + (tilt === "extreme" ? 5 : tilt === "anterior" ? 2 : 0)} 85
                ${112 + (tilt === "extreme" ? 4 : tilt === "anterior" ? 2 : 0)} 95
              L 128 95
              Q ${132 + (tilt === "extreme" ? 5 : tilt === "anterior" ? 2 : 0)} 85
                ${130 + (tilt === "extreme" ? 4 : tilt === "anterior" ? 2 : 0)} 72 Z`}
          fill={`url(#skin-${tilt})`}
          stroke="#6b7280"
          strokeWidth="1"
        />

        {/* Torso - upper chest */}
        <path
          d={`M 92 95
              Q 80 130 88 175
              Q 110 195 152 175
              Q 160 130 148 95 Z`}
          fill={`url(#skin-${tilt})`}
          stroke="#6b7280"
          strokeWidth="1"
        />

        {/* Belly (changes with tilt) */}
        <path
          d={`M 88 175
              Q ${78 - bellyOffset} 220 ${92 - bellyOffset / 2} 270
              Q 120 290 ${148 + bellyOffset / 2} 270
              Q ${162 + bellyOffset} 220 152 175 Z`}
          fill={`url(#skin-${tilt})`}
          stroke="#6b7280"
          strokeWidth="1"
        />

        {/* Lower back curve indicator (from behind) */}
        <path
          d={`M 152 175
              Q ${152 + lumbarCurve / 2} 220 152 270`}
          fill="none"
          stroke={highlight && tilt !== "normal" ? "#ef4444" : "#9ca3af"}
          strokeWidth={highlight && tilt !== "normal" ? 2.5 : 1.5}
          strokeDasharray={tilt === "normal" ? "0" : "0"}
        />

        {/* Pelvis box - tilted */}
        <g transform={`rotate(${tiltAngle} 120 295)`}>
          <rect
            x="86"
            y="270"
            width="68"
            height="40"
            rx="14"
            fill="#1e293b"
            opacity="0.18"
          />
          {/* Pelvic tilt line indicator */}
          <line
            x1="80"
            y1="295"
            x2="160"
            y2="295"
            stroke={
              tilt === "normal"
                ? "#22c55e"
                : tilt === "anterior"
                ? "#f59e0b"
                : "#ef4444"
            }
            strokeWidth="3"
            strokeDasharray="6 4"
          />
        </g>

        {/* Buttocks bump */}
        <path
          d={`M 152 280
              Q ${172 + buttOffset} 305 152 340 Z`}
          fill={`url(#skin-${tilt})`}
          stroke="#6b7280"
          strokeWidth="1"
        />

        {/* Front thigh */}
        <path
          d={`M 92 305
              Q ${82 - bellyOffset / 2} 380 96 420
              L 120 420
              L 120 310 Z`}
          fill={`url(#skin-${tilt})`}
          stroke="#6b7280"
          strokeWidth="1"
        />

        {/* Back thigh */}
        <path
          d={`M 120 310
              L 120 420
              L 148 420
              Q ${158 + buttOffset / 2} 380 148 305 Z`}
          fill={`url(#skin-${tilt})`}
          stroke="#6b7280"
          strokeWidth="1"
        />

        {/* Knee */}
        <ellipse cx="108" cy="420" rx="14" ry="6" fill="#a87349" />
        <ellipse cx="134" cy="420" rx="14" ry="6" fill="#a87349" />

        {/* Calf */}
        <path
          d="M 96 420 L 100 460 L 120 460 L 120 420 Z"
          fill={`url(#skin-${tilt})`}
          stroke="#6b7280"
          strokeWidth="1"
        />
        <path
          d="M 120 420 L 120 460 L 142 460 L 144 420 Z"
          fill={`url(#skin-${tilt})`}
          stroke="#6b7280"
          strokeWidth="1"
        />

        {/* Shorts */}
        <path
          d="M 88 295 Q 88 340 100 360 L 142 360 Q 152 340 152 295 Z"
          fill="#1f2937"
        />

        {/* Annotation arrows when highlighted */}
        {highlight && tilt !== "normal" && (
          <>
            {/* Belly arrow */}
            <line
              x1="40"
              y1="230"
              x2="78"
              y2="230"
              stroke="#ef4444"
              strokeWidth="2"
              markerEnd="url(#arrow-red)"
            />
            <text x="6" y="225" fontSize="10" fill="#ef4444" fontWeight="700">
              ท้องแอ่น
            </text>
            <text x="6" y="240" fontSize="9" fill="#ef4444">
              (ดูเหมือนพุง)
            </text>

            {/* Lumbar lordosis arrow */}
            <line
              x1="200"
              y1="220"
              x2="172"
              y2="220"
              stroke="#ef4444"
              strokeWidth="2"
              markerEnd="url(#arrow-red)"
            />
            <text x="172" y="208" fontSize="10" fill="#ef4444" fontWeight="700">
              หลังแอ่น
            </text>
            <text x="172" y="244" fontSize="9" fill="#ef4444">
              (lordosis)
            </text>

            {/* Butt arrow */}
            <line
              x1="200"
              y1="320"
              x2="178"
              y2="320"
              stroke="#ef4444"
              strokeWidth="2"
              markerEnd="url(#arrow-red)"
            />
            <text x="172" y="335" fontSize="10" fill="#ef4444" fontWeight="700">
              ก้นยื่น
            </text>
          </>
        )}

        <defs>
          <marker
            id="arrow-red"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
          </marker>
        </defs>
      </svg>

      {label && (
        <div className="mt-2 text-center">
          <div className="text-sm font-semibold">{label}</div>
        </div>
      )}
    </div>
  );
}
