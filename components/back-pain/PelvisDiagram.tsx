"use client";

type Props = {
  state: "normal" | "anterior";
  className?: string;
};

export function PelvisDiagram({ state, className = "" }: Props) {
  const isAnterior = state === "anterior";
  const tilt = isAnterior ? -16 : 0;

  return (
    <div className={className}>
      <svg viewBox="0 0 360 280" className="w-full h-auto">
        <defs>
          <linearGradient id={`bone-${state}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fffaf0" />
            <stop offset="100%" stopColor="#e6dccb" />
          </linearGradient>
          <marker
            id={`tilt-arrow-${state}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path
              d="M 0 0 L 10 5 L 0 10 z"
              fill={isAnterior ? "#ef4444" : "#22c55e"}
            />
          </marker>
        </defs>

        {/* Ground reference */}
        <line
          x1="20"
          y1="260"
          x2="340"
          y2="260"
          stroke="#cbd5e1"
          strokeDasharray="4 4"
        />
        <line
          x1="180"
          y1="20"
          x2="180"
          y2="260"
          stroke="#cbd5e1"
          strokeDasharray="3 5"
          opacity="0.6"
        />

        {/* Lumbar spine (L1-L5) */}
        <g transform={`rotate(${tilt} 180 180)`}>
          {Array.from({ length: 5 }).map((_, i) => {
            const y = 50 + i * 22;
            const curveX = isAnterior ? 180 + (i - 2) * 4 : 180 + (i - 2) * 1.5;
            return (
              <g key={i}>
                <rect
                  x={curveX - 16}
                  y={y}
                  width="32"
                  height="14"
                  rx="4"
                  fill={`url(#bone-${state})`}
                  stroke="#92400e"
                  strokeWidth="1.2"
                />
                <circle
                  cx={curveX}
                  cy={y + 7}
                  r="3"
                  fill="#fde68a"
                  stroke="#92400e"
                  strokeWidth="0.5"
                />
              </g>
            );
          })}

          {/* Sacrum */}
          <path
            d="M 160 160 L 200 160 L 196 200 L 164 200 Z"
            fill={`url(#bone-${state})`}
            stroke="#92400e"
            strokeWidth="1.2"
          />

          {/* Pelvic bowl - simplified ilium */}
          <path
            d="M 120 175
               Q 95 200 110 235
               Q 130 245 160 230
               L 160 175 Z"
            fill={`url(#bone-${state})`}
            stroke="#92400e"
            strokeWidth="1.2"
          />
          <path
            d="M 240 175
               Q 265 200 250 235
               Q 230 245 200 230
               L 200 175 Z"
            fill={`url(#bone-${state})`}
            stroke="#92400e"
            strokeWidth="1.2"
          />

          {/* ASIS markers (anterior superior iliac spine) */}
          <circle cx="115" cy="200" r="4" fill="#dc2626" />
          <circle cx="245" cy="200" r="4" fill="#dc2626" />
          <text x="80" y="200" fontSize="9" fill="#dc2626" fontWeight="600">
            ASIS
          </text>

          {/* PSIS markers (posterior superior iliac spine) */}
          <circle cx="150" cy="172" r="3.5" fill="#2563eb" />
          <circle cx="210" cy="172" r="3.5" fill="#2563eb" />

          {/* Pelvic tilt indicator line (ASIS to PSIS) */}
          <line
            x1="115"
            y1="200"
            x2="150"
            y2="172"
            stroke={isAnterior ? "#ef4444" : "#22c55e"}
            strokeWidth="2.5"
            strokeDasharray="4 3"
          />

          {/* Femur heads (hip joints) */}
          <circle
            cx="135"
            cy="225"
            r="9"
            fill="#fef3c7"
            stroke="#92400e"
            strokeWidth="1"
          />
          <circle
            cx="225"
            cy="225"
            r="9"
            fill="#fef3c7"
            stroke="#92400e"
            strokeWidth="1"
          />

          {/* Femurs going down */}
          <path
            d="M 128 230 L 122 280 L 142 280 L 142 230 Z"
            fill={`url(#bone-${state})`}
            stroke="#92400e"
            strokeWidth="1"
          />
          <path
            d="M 218 230 L 218 280 L 238 280 L 232 230 Z"
            fill={`url(#bone-${state})`}
            stroke="#92400e"
            strokeWidth="1"
          />
        </g>

        {/* Tilt direction arrow */}
        <g>
          <text
            x="20"
            y="40"
            fontSize="11"
            fontWeight="700"
            fill={isAnterior ? "#ef4444" : "#22c55e"}
          >
            {isAnterior ? "เชิงกรานคว่ำหน้า" : "เชิงกรานเป็นกลาง"}
          </text>
          <text
            x="20"
            y="54"
            fontSize="9"
            fill={isAnterior ? "#b91c1c" : "#15803d"}
          >
            {isAnterior ? "(Anterior Pelvic Tilt)" : "(Neutral pelvis)"}
          </text>
        </g>

        {/* Curved arrow showing tilt */}
        <path
          d={
            isAnterior
              ? "M 280 50 Q 320 100 300 150"
              : "M 280 80 L 300 80 M 290 70 L 300 80 L 290 90"
          }
          fill="none"
          stroke={isAnterior ? "#ef4444" : "#22c55e"}
          strokeWidth="2"
          markerEnd={`url(#tilt-arrow-${state})`}
        />
      </svg>
    </div>
  );
}
