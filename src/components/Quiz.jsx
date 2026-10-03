/**
 * Quiz.jsx — end-of-lesson quiz with instant feedback.
 *
 * All questions are shown at once (good for self-study on a phone).
 * Tapping a choice immediately marks it right/wrong and reveals the
 * explanation. "Finish quiz" records the best score in localStorage
 * and marks the lesson complete.
 */
import { useState } from 'react'
import { useLang } from '../lang.jsx'
import { recordQuizResult } from '../progress.js'
import { ui } from '../ui.js'

function ChoiceButton({ label, state, onPick, disabled }) {
  return (
    <button
      className={'choice' + (state === 'right' ? ' choice-right' : '') + (state === 'wrong' ? ' choice-wrong' : '')}
      onClick={onPick}
      disabled={disabled}
    >
      <span className="choice-label">{label}</span>
      {state === 'right' && <span className="choice-mark">✓</span>}
      {state === 'wrong' && <span className="choice-mark">✗</span>}
    </button>
  )
}

export default function Quiz({ lessonId, quiz }) {
  const { t } = useLang()
  // answers: { [questionId]: choiceIndex | boolean }
  const [answers, setAnswers] = useState({})
  const [finished, setFinished] = useState(false)
  const [result, setResult] = useState(null)

  const isCorrect = (q, a) => a === q.answer

  const score = quiz.filter((q) => q.id in answers && isCorrect(q, answers[q.id])).length

  const pick = (q, value) => {
    if (finished) return
    setAnswers((prev) => ({ ...prev, [q.id]: value }))
  }

  const finish = () => {
    const r = recordQuizResult(lessonId, score, quiz.length)
    setResult(r)
    setFinished(true)
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  const retake = () => {
    setAnswers({})
    setFinished(false)
    setResult(null)
  }

  return (
    <section className="quiz" aria-label={t(ui.quizTitle)}>
      <h2 className="section-title">{t(ui.quizTitle)}</h2>

      {quiz.map((q, qi) => {
        const answered = q.id in answers
        const correct = answered && isCorrect(q, answers[q.id])
        return (
          <div key={q.id} className="quiz-q card">
            <p className="quiz-question">
              <strong>{qi + 1}.</strong> {t(q.question)}
            </p>

            {q.type === 'mcq' && (
              <div className="choices">
                {q.choices.map((c, ci) => {
                  let state = null
                  if (answered) {
                    if (ci === q.answer) state = 'right'
                    else if (ci === answers[q.id]) state = 'wrong'
                  }
                  return (
                    <ChoiceButton
                      key={ci}
                      label={t(c)}
                      state={state}
                      disabled={answered || finished}
                      onPick={() => pick(q, ci)}
                    />
                  )
                })}
              </div>
            )}

            {q.type === 'truefalse' && (
              <div className="choices choices-2">
                {[true, false].map((v) => {
                  let state = null
                  if (answered) {
                    if (v === q.answer) state = 'right'
                    else if (v === answers[q.id]) state = 'wrong'
                  }
                  return (
                    <ChoiceButton
                      key={String(v)}
                      label={v ? t(ui.trueLabel) : t(ui.falseLabel)}
                      state={state}
                      disabled={answered || finished}
                      onPick={() => pick(q, v)}
                    />
                  )
                })}
              </div>
            )}

            {answered && (
              <p className={'feedback' + (correct ? ' feedback-right' : ' feedback-wrong')}>
                <strong>{correct ? t(ui.correct) : t(ui.incorrect)}</strong> {t(q.explanation)}
              </p>
            )}
          </div>
        )
      })}

      {!finished ? (
        <button className="btn btn-primary btn-block" onClick={finish}>
          {t(ui.checkAnswers)}
        </button>
      ) : (
        <div className="card quiz-result">
          <p className="quiz-score">
            {t(ui.yourScore)}: <strong>{score}/{quiz.length}</strong>
            {result && (
              <span className="quiz-best">
                {' '}· {t(ui.bestScore)}: {result.bestScore}/{result.quizTotal}
              </span>
            )}
          </p>
          <p className="muted">{t(ui.quizSaved)}</p>
          <button className="btn btn-ghost" onClick={retake}>
            {t(ui.retake)}
          </button>
        </div>
      )}
    </section>
  )
}
