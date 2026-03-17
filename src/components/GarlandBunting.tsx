'use client'

const COLORS = ['#009245', '#F18C22', '#89CFE8', '#9DE551', '#F15A24', '#00C3D4']
const SEQ_A = [0, 3, 5, 1, 4, 2, 0, 5, 3, 1, 2, 4, 0, 3, 1, 5, 4, 2]
const SEQ_B = [4, 1, 3, 0, 5, 2, 4, 2, 0, 5, 1, 3, 4, 0, 2, 5, 3, 1]

type P = readonly [number, number]

function cbPoint(t: number, p0: P, c1: P, c2: P, p1: P) {
  const mt = 1 - t
  return {
    x: mt ** 3 * p0[0] + 3 * mt ** 2 * t * c1[0] + 3 * mt * t ** 2 * c2[0] + t ** 3 * p1[0],
    y: mt ** 3 * p0[1] + 3 * mt ** 2 * t * c1[1] + 3 * mt * t ** 2 * c2[1] + t ** 3 * p1[1],
  }
}

function cbAngle(t: number, p0: P, c1: P, c2: P, p1: P) {
  const mt = 1 - t
  const dx = 3 * mt ** 2 * (c1[0] - p0[0]) + 6 * mt * t * (c2[0] - c1[0]) + 3 * t ** 2 * (p1[0] - c2[0])
  const dy = 3 * mt ** 2 * (c1[1] - p0[1]) + 6 * mt * t * (c2[1] - c1[1]) + 3 * t ** 2 * (p1[1] - c2[1])
  return (Math.atan2(dy, dx) * 180) / Math.PI
}

// Arc-length parameterisation: returns t values spaced FLAG_W units apart along the curve
const FLAG_W = 40 // flag base width in SVG units (controls spacing between flags)
const SAMPLES = 800

function arcLengthTValues(p0: P, c1: P, c2: P, p1: P): number[] {
  // Build cumulative arc-length table
  const pts = Array.from({ length: SAMPLES + 1 }, (_, i) => cbPoint(i / SAMPLES, p0, c1, c2, p1))
  const cumLen: number[] = [0]
  for (let i = 1; i <= SAMPLES; i++) {
    const dx = pts[i].x - pts[i - 1].x
    const dy = pts[i].y - pts[i - 1].y
    cumLen.push(cumLen[i - 1] + Math.sqrt(dx * dx + dy * dy))
  }
  const total = cumLen[SAMPLES]
  const n = Math.max(2, Math.round(total / FLAG_W))

  // Map evenly-spaced arc lengths → t values via binary search
  return Array.from({ length: n }, (_, j) => {
    const target = (j / (n - 1)) * total
    let lo = 0, hi = SAMPLES
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1
      if (cumLen[mid] < target) lo = mid; else hi = mid
    }
    const frac = (target - cumLen[lo]) / (cumLen[hi] - cumLen[lo] || 1)
    return (lo + frac) / SAMPLES
  })
}

interface GarlandProps {
  p0: P; c1: P; c2: P; p1: P
  seq: number[]
  delayOffset: number
  animDuration: number
  stringOpacity?: number
  flagClass?: string
}

function Garland({ p0, c1, c2, p1, seq, delayOffset, animDuration, stringOpacity = 0.4, flagClass = 'g-flag' }: GarlandProps) {
  // Skip first & last t values — those sit right at the edge anchors where
  // the string is nearly vertical or off-screen, causing mis-oriented flags
  const tVals = arcLengthTValues(p0, c1, c2, p1).slice(1, -1)

  const flags = tVals.map((t, i) => {
    let angle = cbAngle(t, p0, c1, c2, p1)
    // Normalise so apex always hangs downward (cos(angle) > 0)
    if (angle > 90 || angle < -90) angle += 180
    return {
      ...cbPoint(t, p0, c1, c2, p1),
      angle,
      color: COLORS[seq[i % seq.length]],
      delay: ((i * 0.2) + delayOffset) % animDuration,
    }
  })

  const d = `M ${p0[0]},${p0[1]} C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p1[0]},${p1[1]}`

  return (
    <g>
      <path d={d} fill="none" stroke="#9A7D55" strokeWidth="1.6" strokeOpacity={stringOpacity} />
      {flags.map((f, i) => (
        <g key={i} transform={`translate(${f.x.toFixed(4)},${f.y.toFixed(4)}) rotate(${f.angle.toFixed(4)})`}>
          <polygon
            className={flagClass}
            points="-11,0 11,0 0,28"
            fill={f.color}
            opacity="0.9"
            style={{ animationDelay: `${f.delay.toFixed(2)}s`, animationDuration: `${animDuration}s` }}
          />
        </g>
      ))}
    </g>
  )
}

// ----- MOBILE COORDINATES (Original asymmetrical layout) -----
// G1: left side (low, flat exit) → top-right corner
const G1_M: [P, P, P, P] = [[0, 525], [300, 525], [1000, 240], [1000, 168]]
// G2: right side (low, flat exit) → top-left corner
const G2_M: [P, P, P, P] = [[1000, 470], [700, 470], [0, 255], [0, 178]]

// ----- DESKTOP COORDINATES (Flatter, symmetrical layout) -----
// Raised starting point (smaller y) to be closer to ending point
// Control points (c1, c2) pulled closer to their anchor points vertically to flatten the curve trajectory
const G1_D: [P,P,P,P] = [[0,280], [300,200], [800,145], [1000,128]]
const G2_D: [P,P,P,P] = [[1000,280], [700,200], [200,145], [0,128]]

export default function GarlandBunting() {
  return (
    <div className="absolute inset-x-0 top-0 pointer-events-none z-10" style={{ overflow: 'visible' }}>
      <svg
        viewBox="0 0 1000 430"
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        aria-hidden="true"
      >
        <style>{`
          @keyframes g-sway-a {
            0%, 100% { transform: rotate(0deg); }
            30%       { transform: rotate(3deg); }
            65%       { transform: rotate(-3deg); }
          }
          .g-flag {
            transform-box: fill-box;
            transform-origin: top center;
            animation: g-sway-a 3.2s ease-in-out infinite;
          }
          @keyframes g-sway-b {
            0%, 100% { transform: rotate(0deg); }
            35%       { transform: rotate(-2.8deg); }
            70%       { transform: rotate(2.8deg); }
          }
          .g-flag-b {
            transform-box: fill-box;
            transform-origin: top center;
            animation: g-sway-b 3.6s ease-in-out infinite;
          }
          @keyframes g1-pendulum {
            0%, 100% { transform: rotate(0deg); }
            50%       { transform: rotate(0.8deg); }
          }
          .g1-group {
            transform-box: view-box;
            transform-origin: 1000px 18px;
            animation: g1-pendulum 4.5s ease-in-out infinite;
          }
          @keyframes g2-pendulum {
            0%, 100% { transform: rotate(0deg); }
            50%       { transform: rotate(-0.7deg); }
          }
          .g2-group {
            transform-box: view-box;
            transform-origin: 0px 28px;
            animation: g2-pendulum 5s ease-in-out infinite;
            animation-delay: 1.2s;
          }
          /* Responsive toggles */
          .g-desktop { display: none; }
          .g-mobile { display: inline; }
          @media (min-width: 768px) {
            .g-desktop { display: inline; }
            .g-mobile { display: none; }
          }
        `}</style>

        {/* ================= MOBILE LAYOUT ================= */}
        <g className="g-mobile">
          {/* Back garland — right side to top-left corner */}
          <g className="g2-group">
            <Garland p0={G2_M[0]} c1={G2_M[1]} c2={G2_M[2]} p1={G2_M[3]}
              seq={SEQ_B} delayOffset={0.4} animDuration={3.6}
              stringOpacity={0.35} flagClass="g-flag-b" />
          </g>

          {/* Front garland — left side to top-right corner */}
          <g className="g1-group">
            <Garland p0={G1_M[0]} c1={G1_M[1]} c2={G1_M[2]} p1={G1_M[3]}
              seq={SEQ_A} delayOffset={0} animDuration={3.2}
              stringOpacity={0.42} />
          </g>
        </g>

        {/* ================= DESKTOP LAYOUT ================= */}
        <g className="g-desktop">
          {/* Back garland — right side to top-left corner */}
          <g className="g2-group">
            <Garland p0={G2_D[0]} c1={G2_D[1]} c2={G2_D[2]} p1={G2_D[3]}
              seq={SEQ_B} delayOffset={0.4} animDuration={3.6}
              stringOpacity={0.35} flagClass="g-flag-b" />
          </g>

          {/* Front garland — left side to top-right corner */}
          <g className="g1-group">
            <Garland p0={G1_D[0]} c1={G1_D[1]} c2={G1_D[2]} p1={G1_D[3]}
              seq={SEQ_A} delayOffset={0} animDuration={3.2}
              stringOpacity={0.42} />
          </g>
        </g>
      </svg>
    </div>
  )
}
