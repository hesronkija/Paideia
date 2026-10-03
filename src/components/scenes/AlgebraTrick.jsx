/**
 * AlgebraTrick.jsx — Scene (c): the ×10-and-subtract trick that converts
 * 0.333… back into the fraction 1/3, revealed one equation at a time.
 *
 * Props: { step } — the current animation step (0..4).
 */
import { G } from './G'

const BRAND = '#0e7c5b'
const ACCENT = '#b97e0b'
const INK = '#1d2b25'
const RED = '#c0392b'

export default function AlgebraTrick({ step }) {
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Algebra trick converting 0.333 repeating to one third">
      {/* Step 0: name the decimal x */}
      <G show={step >= 0} fresh={step === 0}>
        <text x="180" y="50" textAnchor="middle" fontSize="28" fontWeight="700" fill={INK}>
          x = 0.333…
        </text>
      </G>

      {/* Step 1: multiply both sides by 10 */}
      <G show={step >= 1} fresh={step === 1}>
        <text x="180" y="100" textAnchor="middle" fontSize="28" fontWeight="700" fill={INK}>
          10x = 3.333…
        </text>
        <text x="180" y="126" textAnchor="middle" fontSize="15" fill="#5f7168">×10 moves the point one place</text>
      </G>

      {/* Step 2: subtract — the endless 3s cancel (shown in red) */}
      <G show={step >= 2} fresh={step === 2}>
        <text x="180" y="50" textAnchor="middle" fontSize="28" fontWeight="700" fill={INK}>
          x = 0.<tspan fill={RED}>333…</tspan>
        </text>
        <text x="180" y="100" textAnchor="middle" fontSize="28" fontWeight="700" fill={INK}>
          10x = 3.<tspan fill={RED}>333…</tspan>
        </text>
        <text x="180" y="160" textAnchor="middle" fontSize="22" fontWeight="700" fill={RED}>
          10x − x
        </text>
      </G>

      {/* Step 3: 9x = 3 */}
      <G show={step >= 3} fresh={step === 3}>
        <text x="180" y="200" textAnchor="middle" fontSize="28" fontWeight="700" fill={BRAND}>
          9x = 3
        </text>
        <text x="180" y="226" textAnchor="middle" fontSize="15" fill="#5f7168">the repeating 3s cancelled out!</text>
      </G>

      {/* Step 4: x = 1/3 */}
      <G show={step >= 4} fresh={step === 4}>
        <rect x="70" y="160" width="220" height="66" rx="12" fill="#e7f4ee" />
        <text x="180" y="202" textAnchor="middle" fontSize="28" fontWeight="700" fill={BRAND}>
          x = 3/9 = 1/3 ✓
        </text>
      </G>
    </svg>
  )
}
