/**
 * BarThirds.jsx — Scene (a): a bar split into 3 equal parts, showing 1/3.
 *
 * Props: { step } — the current animation step (0..4).
 * Each step reveals one more piece of the picture; see the captions in
 * pilotLesson.js (scene 'bar-thirds') which narrate alongside.
 */
import { G } from './G'

const BRAND = '#0e7c5b'
const BRAND_LIGHT = '#dcefe7'
const INK = '#1d2b25'

export default function BarThirds({ step }) {
  return (
    <svg viewBox="0 0 360 170" role="img" aria-label="A bar divided into three equal parts">
      {/* Step 0: the whole bar = 1 */}
      <G show={step >= 0} fresh={step === 0}>
        <rect x="30" y="30" width="300" height="64" rx="12" fill="#ffffff" stroke={BRAND} strokeWidth="3" />
        <text x="180" y="72" textAnchor="middle" fontSize="28" fontWeight="700" fill={INK}>1</text>
      </G>

      {/* Step 1: cut into 3 equal parts */}
      <G show={step >= 1} fresh={step === 1}>
        <line x1="130" y1="30" x2="130" y2="94" stroke={BRAND} strokeWidth="3" strokeDasharray="1 0" />
        <line x1="230" y1="30" x2="230" y2="94" stroke={BRAND} strokeWidth="3" />
      </G>

      {/* Step 2: label each part 1/3 */}
      <G show={step >= 2} fresh={step === 2}>
        <text x="80" y="72" textAnchor="middle" fontSize="22" fontWeight="700" fill={BRAND}>1/3</text>
        <text x="180" y="72" textAnchor="middle" fontSize="22" fontWeight="700" fill={BRAND}>1/3</text>
        <text x="280" y="72" textAnchor="middle" fontSize="22" fontWeight="700" fill={BRAND}>1/3</text>
      </G>

      {/* Step 3: highlight one piece — numerator counts what you have */}
      <G show={step >= 3} fresh={step === 3}>
        <rect x="30" y="30" width="100" height="64" rx="12" fill={BRAND_LIGHT} opacity="0.85" />
        <rect x="30" y="30" width="300" height="64" rx="12" fill="none" stroke={BRAND} strokeWidth="3" />
        <line x1="130" y1="30" x2="130" y2="94" stroke={BRAND} strokeWidth="3" />
        <line x1="230" y1="30" x2="230" y2="94" stroke={BRAND} strokeWidth="3" />
        <text x="80" y="72" textAnchor="middle" fontSize="22" fontWeight="700" fill={BRAND}>1/3</text>
        <text x="180" y="72" textAnchor="middle" fontSize="22" fontWeight="700" fill={BRAND}>1/3</text>
        <text x="280" y="72" textAnchor="middle" fontSize="22" fontWeight="700" fill={BRAND}>1/3</text>
      </G>

      {/* Step 4: three thirds rebuild the whole */}
      <G show={step >= 4} fresh={step === 4}>
        <text x="180" y="135" textAnchor="middle" fontSize="20" fontWeight="600" fill={INK}>
          1/3 + 1/3 + 1/3 = 1
        </text>
      </G>
    </svg>
  )
}
