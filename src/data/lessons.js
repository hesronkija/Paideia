/**
 * lessons.js — the lesson registry.
 *
 * The app renders every entry here on the home screen. Entries with
 * status 'ready' carry a full lesson object (imported from its own file);
 * entries with status 'soon' only need a title — they render as
 * "coming soon" cards so the roadmap is visible from day one.
 *
 * To add a lesson: write its data file (copy pilotLesson.js), import it,
 * and add a { id, order, status: 'ready', lesson } entry in order.
 */
import { pilotLesson } from './pilotLesson'

export const lessons = [
  {
    id: 'what-is-mathematics',
    order: 1,
    status: 'soon',
    syllabusRef: '1.1a',
    title: { en: 'What is mathematics?', sw: 'Hisabati ni nini?' },
  },
  {
    id: 'rational-irrational-real-numbers',
    order: 2,
    status: 'soon',
    syllabusRef: '1.1b',
    title: { en: 'Rational, irrational and real numbers', sw: 'Nambari wastani, zisizo na uwiano na halisi' },
  },
  {
    id: 'repeating-decimals-fractions',
    order: 3,
    status: 'ready',
    syllabusRef: pilotLesson.syllabusRef,
    title: pilotLesson.title,
    lesson: pilotLesson,
  },
  {
    id: 'numbers-on-the-number-line',
    order: 4,
    status: 'soon',
    syllabusRef: '1.1d',
    title: { en: 'Rational numbers on the number line', sw: 'Nambari wastani kwenye mstari wa nambari' },
  },
  {
    id: 'inequalities-absolute-value',
    order: 5,
    status: 'soon',
    syllabusRef: '1.1e',
    title: { en: 'Inequalities and absolute value', sw: 'Ukosefu wa usawa na thamani kamili' },
  },
  {
    id: 'rounding-off',
    order: 6,
    status: 'soon',
    syllabusRef: '2.1a–b',
    title: { en: 'Rounding off: place value and decimal places', sw: 'Kuzungusha: thamani ya nafasi na nafasi za desimali' },
  },
  {
    id: 'significant-figures',
    order: 7,
    status: 'soon',
    syllabusRef: '2.1a–c',
    title: { en: 'Significant figures', sw: 'Tarakimu muhimu' },
  },
  {
    id: 'estimation',
    order: 8,
    status: 'soon',
    syllabusRef: '2.1b–d',
    title: { en: 'Estimation: judging answers before calculating', sw: 'Ukadiriaji: kuhukumu majibu kabla ya kuhesabu' },
  },
  {
    id: 'approximations-in-measurement',
    order: 9,
    status: 'soon',
    syllabusRef: '2.1d',
    title: { en: 'Approximations in measurement', sw: 'Makadirio katika vipimo' },
  },
  {
    id: 'ratios',
    order: 10,
    status: 'soon',
    syllabusRef: '1.2a',
    title: { en: 'Ratios: sharing fairly', sw: 'Uwiano: kugawana kwa haki' },
  },
  {
    id: 'proportions',
    order: 11,
    status: 'soon',
    syllabusRef: '1.2b',
    title: { en: 'Proportions in daily life', sw: 'Uwiano linganifu katika maisha ya kila siku' },
  },
  {
    id: 'term-review',
    order: 12,
    status: 'soon',
    syllabusRef: 'review',
    title: { en: 'Term review: mixed problems', sw: 'Mapitio ya muhula: maswali mchanganyiko' },
  },
]

export function getReadyLessons() {
  return lessons.filter((l) => l.status === 'ready')
}
