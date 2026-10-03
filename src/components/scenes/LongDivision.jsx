/**
 * LongDivision.jsx — Scene (b): long division of 1 ÷ 3, digit by digit,
 * highlighting the repeating cycle of 3s.
 *
 * Props: { step } — the current animation step (0..5).
 * The tableau is drawn schematically (big readable lines rather than a
 * pixel-perfect ledger) so it stays legible on small phones.
 */
import { G } from './G'

const BRAND = '#0e7c5b'
const ACCENT = '#b97e0b'
const INK = '#1d2b25'
const MUTED = '#5f7168'

export default function LongDivision({ step }) {
  return (
    <svg viewBox="0 0 360 230" role="img" aria-label="Long division of 1 divided by 3">
      {/* Step 0: the question */}
      <G show={step >= 0} fresh={step === 0}>
        <text x="180" y="40" textAnchor="middle" fontSize="30" fontWeight="700" fill={INK}>
          1 ÷ 3 = ?
        </text>
      </G>

      {/* Step 1: set up the division bracket; 3 can't go into 1 */}
      <G show={step >= 1} fresh={step === 1}>
        <text x="60" y="120" textAnchor="middle" fontSize="30" fontWeight="700" fill={INK}>3</text>
        <path d="M 95 95 H 300 M 95 95 V 150" stroke={INK} strokeWidth="3" fill="none" />
        <text x="115" y="130" fontSize="30" fontWeight="700" fill={INK}>1.000</text>
        <text x="115" y="80" fontSize="30" fontWeight="700" fill={BRAND}>0.</text>
        <text x="60" y="180" fontSize="17" fill={MUTED}>3 can't go into 1 → write 0.</text>
      </G>

      {/* Step 2: bring down a 0 → 10; 3 × 3 = 9 */}
      <G show={step >= 2} fresh={step === 2}>
        <text x="150" y="80" fontSize="30" fontWeight="700" fill={BRAND}>3</text>
        <text x="60" y="180" fontSize="17" fill={MUTED}>10 ÷ 3: 3 fits 3 times (3 × 3 = 9).</text>
        <text x="60" y="205" fontSize="17" fill={MUTED}>10 − 9 = 1.</text>
      </G>

      {/* Step 3: remainder 1, bring down another 0 — back at 10 */}
      <G show={step >= 3} fresh={step === 3}>
        <text x="178" y="80" fontSize="30" fontWeight="700" fill={BRAND}>3</text>
        <text x="60" y="180" fontSize="17" fill={MUTED}>Remainder 1 again… bring down 0…</text>
        <text x="60" y="205" fontSize="17" fontWeight="700" fill={ACCENT}>…it's 10 again!</text>
      </G>

      {/* Step 4: the cycle repeats forever */}
      <G show={step >= 4} fresh={step === 4}>
        <rect x="140" y="48" width="120" height="44" rx="10" fill="none" stroke={ACCENT} strokeWidth="3" strokeDasharray="8 6" />
        <text x="206" y="80" fontSize="30" fontWeight="700" fill={ACCENT}>3…</text>
        <text x="60" y="180" fontSize="17" fill={MUTED}>Same steps, forever.</text>
        <text x="60" y="205" fontSize="17" fontWeight="700" fill={ACCENT}>The 3 repeats → 0.333…</text>
      </G>

      {/* Step 5: conclusion */}
      <G show={step >= 5} fresh={step === 5}>
        <text x="180" y="40" textAnchor="middle" fontSize="30" fontWeight="700" fill={BRAND}>
          1/3 = 0.333…
        </text>
      </G>
    </svg>
  )
}
