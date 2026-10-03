/**
 * ScenePlayer.jsx — plays one animated scene.
 *
 * A scene is a declarative SVG component that renders differently for each
 * `step`. This player owns the step state plus transport controls:
 * previous / play-pause / next / replay, step dots, and the caption.
 *
 * Play mode auto-advances one step every ~3 seconds; any manual control
 * pauses it. Newly appearing SVG elements carry the `scene-anim` class
 * (see scenes/G.jsx) and are animated in with GSAP on every step change.
 */
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLang } from '../lang.jsx'
import { sceneComponents } from './scenes/index.jsx'
import { ui } from '../ui.js'

const AUTOPLAY_MS = 3000

export default function ScenePlayer({ scene }) {
  const { t } = useLang()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const stageRef = useRef(null)
  const total = scene.steps.length
  const Scene = sceneComponents[scene.component]

  if (!Scene) {
    return <p>Unknown scene component: {scene.component}</p>
  }

  const go = (n) => {
    setPlaying(false)
    setStep(Math.max(0, Math.min(n, total - 1)))
  }

  const togglePlay = () => {
    if (step >= total - 1) {
      // At the end: restart from the beginning and keep playing.
      setStep(0)
      setPlaying(true)
    } else {
      setPlaying((p) => !p)
    }
  }

  // Auto-advance while playing; stop at the last step.
  useEffect(() => {
    if (!playing) return
    if (step >= total - 1) {
      setPlaying(false)
      return
    }
    const id = setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [playing, step, total])

  // Animate newly-appearing elements on every step change.
  useEffect(() => {
    const els = stageRef.current?.querySelectorAll('.scene-anim')
    if (!els || els.length === 0) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(els, { opacity: 1, y: 0 })
    } else {
      gsap.fromTo(
        els,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power2.out', overwrite: true, clearProps: 'transform' },
      )
    }
  }, [step])

  return (
    <section className="scene" aria-label={t(scene.title)}>
      <h3 className="scene-title">{t(scene.title)}</h3>

      <div className="scene-stage" ref={stageRef}>
        <Scene step={step} />
      </div>

      <p className="scene-caption">
        <span className="step-count">
          {t(ui.stepOf)} {step + 1}/{total}
        </span>{' '}
        {t(scene.steps[step].caption)}
      </p>

      <div className="scene-controls">
        <button className="ctl-btn" onClick={() => go(step - 1)} disabled={step === 0} aria-label={t(ui.previous)}>
          ←
        </button>
        <button
          className="ctl-btn ctl-play"
          onClick={togglePlay}
          aria-label={playing ? t(ui.pause) : t(ui.play)}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <button
          className="ctl-btn"
          onClick={() => go(step + 1)}
          disabled={step >= total - 1}
          aria-label={t(ui.next)}
        >
          →
        </button>
        <button className="ctl-btn" onClick={() => go(0)} aria-label={t(ui.replay)}>
          ↺
        </button>
      </div>

      <div className="scene-dots" aria-hidden="true">
        {scene.steps.map((_, i) => (
          <button
            key={i}
            tabIndex={-1}
            className={'dot' + (i === step ? ' dot-active' : '') + (i < step ? ' dot-seen' : '')}
            onClick={() => go(i)}
          />
        ))}
      </div>
    </section>
  )
}
