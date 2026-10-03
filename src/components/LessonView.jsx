/**
 * LessonView.jsx — renders one full lesson from its data object:
 * title → objectives → intro → animated scenes → worked examples → quiz.
 * Pure function of the lesson data; all interactivity lives in the
 * child components (ScenePlayer, WorkedExample, Quiz).
 */
import { useLang } from '../lang.jsx'
import ScenePlayer from './ScenePlayer.jsx'
import WorkedExample from './WorkedExample.jsx'
import Quiz from './Quiz.jsx'
import { ui } from '../ui.js'

export default function LessonView({ lesson, onBack }) {
  const { t } = useLang()

  return (
    <div className="lesson">
      <button className="btn btn-ghost back-btn" onClick={onBack}>
        {t(ui.back)}
      </button>

      <header className="lesson-head">
        {lesson.syllabusRef && <span className="syllabus-chip">Syllabus {lesson.syllabusRef}</span>}
        <h1>{t(lesson.title)}</h1>
        <p className="muted">{t(lesson.subtitle)}</p>
      </header>

      <section className="card">
        <h2 className="section-title">{t(ui.objectives)}</h2>
        <ul className="objectives">
          {lesson.objectives.map((o, i) => (
            <li key={i}>{t(o)}</li>
          ))}
        </ul>
      </section>

      <section className="intro">
        {lesson.intro.map((p, i) => (
          <p key={i}>{t(p)}</p>
        ))}
      </section>

      <h2 className="section-title">{t(ui.watchAndLearn)}</h2>
      {lesson.scenes.map((scene) => (
        <ScenePlayer key={scene.id} scene={scene} />
      ))}

      <h2 className="section-title">{t(ui.workedExamples)}</h2>
      {lesson.workedExamples.map((ex) => (
        <WorkedExample key={ex.id} example={ex} />
      ))}

      <Quiz lessonId={lesson.id} quiz={lesson.quiz} />
    </div>
  )
}
