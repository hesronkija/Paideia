/**
 * ui.js — shared bilingual UI strings (chrome around the lesson content).
 * Lesson content itself lives in src/data/*.js; this file is only for
 * buttons, labels and headings.
 */
export const ui = {
  tagline: {
    en: 'Visual math, in Swahili and English. Works offline.',
    sw: 'Hisabati kwa picha, kwa Kiswahili na Kiingereza. Hufanya kazi bila intaneti.',
  },
  lessons: { en: 'Lessons', sw: 'Masomo' },
  startLesson: { en: 'Start lesson', sw: 'Anza somo' },
  continueLesson: { en: 'Continue', sw: 'Endelea' },
  back: { en: '← All lessons', sw: '← Masomo yote' },
  objectives: { en: 'By the end of this lesson you can…', sw: 'Mwisho wa somo hili utaweza…' },
  watchAndLearn: { en: 'Watch and learn', sw: 'Tazama ujifunze' },
  workedExamples: { en: 'Worked examples', sw: 'Mifano iliyofanyiwa kazi' },
  showNextStep: { en: 'Show next step', sw: 'Onyesha hatua inayofuata' },
  hideSteps: { en: 'Hide steps', sw: 'Ficha hatua' },
  stepOf: { en: 'Step', sw: 'Hatua' },
  quizTitle: { en: 'Test yourself', sw: 'Jipime' },
  checkAnswers: { en: 'Finish quiz', sw: 'Maliza jaribio' },
  retake: { en: 'Retake quiz', sw: 'Rudia jaribio' },
  yourScore: { en: 'Your score', sw: 'Alama zako' },
  bestScore: { en: 'Best', sw: 'Bora' },
  correct: { en: 'Correct!', sw: 'Sahihi!' },
  incorrect: { en: 'Not quite.', sw: 'Sio sahihi.' },
  trueLabel: { en: 'True', sw: 'Kweli' },
  falseLabel: { en: 'False', sw: 'Si kweli' },
  completed: { en: 'Completed', sw: 'Imekamilika' },
  comingSoon: { en: 'Coming soon', sw: 'Inakuja hivi karibuni' },
  installApp: { en: 'Install app', sw: 'Sakinisha programu' },
  offlineBadge: { en: 'Works offline', sw: 'Hufanya kazi bila intaneti' },
  play: { en: 'Play', sw: 'Cheza' },
  pause: { en: 'Pause', sw: 'Sitisha' },
  previous: { en: 'Previous step', sw: 'Hatua iliyotangulia' },
  next: { en: 'Next step', sw: 'Hatua inayofuata' },
  replay: { en: 'Replay', sw: 'Rudia' },
  quizSaved: { en: 'Progress saved on this phone.', sw: 'Maendeleo yamehifadhiwa kwenye simu hii.' },
}
