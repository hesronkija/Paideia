/**
 * WorkedExample.jsx — a worked example card.
 *
 * Shows the everyday context first, then reveals the solution one step
 * at a time so the student tries each step mentally before seeing it.
 */
import { useState } from 'react'
import { useLang } from '../lang.jsx'
import { ui } from '../ui.js'

export default function WorkedExample({ example }) {
  const { t } = useLang()
  const [revealed, setRevealed] = useState(0)

  return (
    <article className="example card">
      <h3 className="example-title">{t(example.title)}</h3>
      <p className="example-context">{t(example.context)}</p>

      <ol className="example-steps">
        {example.steps.slice(0, revealed).map((s, i) => (
          <li key={i} className="example-step">
            {t(s)}
          </li>
        ))}
      </ol>

      {revealed < example.steps.length ? (
        <button className="btn btn-ghost" onClick={() => setRevealed((r) => r + 1)}>
          {t(ui.showNextStep)} ({revealed}/{example.steps.length})
        </button>
      ) : (
        <button className="btn btn-ghost" onClick={() => setRevealed(0)}>
          {t(ui.hideSteps)}
        </button>
      )}
    </article>
  )
}
