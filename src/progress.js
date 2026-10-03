/**
 * progress.js — tiny localStorage persistence layer.
 *
 * Stored shape (key 'paideia-progress-v1'):
 * {
 *   lessons: {
 *     '<lesson-id>': { completed: true, bestScore: 4, quizTotal: 5, updatedAt: 123 }
 *   }
 * }
 * No accounts, no network — progress lives on the student's own phone.
 */
const KEY = 'paideia-progress-v1'

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { lessons: {} }
  } catch {
    return { lessons: {} }
  }
}

function write(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* storage full / private mode — non-fatal */
  }
}

export function getLessonProgress(lessonId) {
  return read().lessons[lessonId] || null
}

export function getAllProgress() {
  return read().lessons
}

/** Record a finished quiz; keeps the best score. Marks lesson complete. */
export function recordQuizResult(lessonId, score, total) {
  const data = read()
  const prev = data.lessons[lessonId] || {}
  data.lessons[lessonId] = {
    completed: true,
    bestScore: Math.max(prev.bestScore || 0, score),
    quizTotal: total,
    updatedAt: Date.now(),
  }
  write(data)
  return data.lessons[lessonId]
}
