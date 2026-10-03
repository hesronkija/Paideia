/**
 * Home.jsx — the lesson list. Ready lessons open the LessonView;
 * upcoming ones render as "coming soon" cards so the roadmap is visible.
 * Progress badges (completed / best score) come from localStorage.
 */
import { useLang } from '../lang.jsx'
import { lessons } from '../data/lessons.js'
import { getAllProgress } from '../progress.js'
import { ui } from '../ui.js'

export default function Home({ onOpenLesson }) {
  const { t } = useLang()
  const progress = getAllProgress()

  return (
    <div className="home">
      <section className="hero card">
        <h1 className="hero-title">Paideia <span className="pi">π</span></h1>
        <p>{t(ui.tagline)}</p>
        <p>
          <span className="badge badge-offline">✓ {t(ui.offlineBadge)}</span>
        </p>
      </section>

      <h2 className="section-title">{t(ui.lessons)}</h2>

      <div className="lesson-list">
        {lessons.map((entry) => {
          const p = progress[entry.id]
          const ready = entry.status === 'ready'
          return (
            <button
              key={entry.id}
              className={'lesson-card card' + (ready ? '' : ' lesson-card-soon')}
              disabled={!ready}
              onClick={() => ready && onOpenLesson(entry.lesson)}
            >
              <span className="lesson-num">{entry.order}</span>
              <span className="lesson-meta">
                <span className="lesson-card-title">{t(entry.title)}</span>
                <span className="muted small">
                  {entry.syllabusRef !== 'review' ? `Syllabus ${entry.syllabusRef}` : 'Syllabus review'}
                </span>
              </span>
              {ready ? (
                p?.completed ? (
                  <span className="badge badge-done">✓ {t(ui.completed)}{p.bestScore != null ? ` · ${p.bestScore}/${p.quizTotal}` : ''}</span>
                ) : (
                  <span className="badge badge-start">{t(ui.startLesson)} →</span>
                )
              ) : (
                <span className="badge badge-soon">{t(ui.comingSoon)}</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
