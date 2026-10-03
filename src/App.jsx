/**
 * App.jsx — top-level shell. No router dependency: navigation is a tiny
 * view state ({ name: 'home' } or { name: 'lesson', lesson }).
 * Also listens for `beforeinstallprompt` to offer installation.
 */
import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Home from './components/Home.jsx'
import LessonView from './components/LessonView.jsx'

export default function App() {
  const [view, setView] = useState({ name: 'home' })
  const [installEvent, setInstallEvent] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault() // hold it so we can show our own install button
      setInstallEvent(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const openLesson = (lesson) => {
    setView({ name: 'lesson', lesson })
    window.scrollTo(0, 0)
  }
  const goHome = () => {
    setView({ name: 'home' })
    window.scrollTo(0, 0)
  }

  return (
    <div className="app">
      <Header installEvent={installEvent} onHome={goHome} />
      <main className="container">
        {view.name === 'home' ? (
          <Home onOpenLesson={openLesson} />
        ) : (
          <LessonView lesson={view.lesson} onBack={goHome} />
        )}
      </main>
      <footer className="app-footer">
        <p>Paideia · {new Date().getFullYear()} · MIT</p>
      </footer>
    </div>
  )
}
