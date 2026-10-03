/**
 * pilotLesson.js — the pilot lesson: repeating decimals ↔ fractions.
 *
 * This file is the reference example for the lesson object schema
 * (also documented in README.md). Every user-facing string is a
 * { en, sw } object — see lang.jsx.
 *
 * Schema:
 * {
 *   id: string,            // unique slug, also the localStorage progress key
 *   order: number,         // position in the MVP sequence
 *   syllabusRef: string,   // TIE 2023 Form 1 maths syllabus item, e.g. '1.1c'
 *   title: { en, sw },
 *   subtitle: { en, sw },
 *   objectives: [{ en, sw }],          // "by the end you can…"
 *   intro: [{ en, sw }],               // 1–3 short paragraphs
 *   scenes: [                          // animated SVG scenes, in order
 *     {
 *       id: string,
 *       title: { en, sw },
 *       component: string,              // key in scenes/index.jsx registry
 *       steps: [{ caption: { en, sw } }]// one caption per animation step
 *     }
 *   ],
 *   workedExamples: [
 *     {
 *       id: string,
 *       title: { en, sw },
 *       context: { en, sw },            // the story / everyday situation
 *       steps: [{ en, sw }]             // revealed one by one
 *     }
 *   ],
 *   quiz: [
 *     {
 *       id: string,
 *       type: 'mcq' | 'truefalse',
 *       question: { en, sw },
 *       choices: [{ en, sw }],          // mcq only
 *       answer: number | boolean,       // mcq: index into choices; truefalse: the correct boolean
 *       explanation: { en, sw }
 *     }
 *   ]
 * }
 */
export const pilotLesson = {
  id: 'repeating-decimals-fractions',
  order: 3,
  syllabusRef: '1.1c',
  title: {
    en: 'Repeating Decimals and Fractions',
    sw: 'Desimali Zinazojirudia na Sehemu',
  },
  subtitle: {
    en: 'Form 1 Mathematics · Syllabus item 1.1c — converting recurring decimals to fractions',
    sw: 'Hisabati Kidato cha Kwanza · Kipengele cha silabasi 1.1c — kubadilisha desimali zinazojirudia kuwa sehemu',
  },
  objectives: [
    {
      en: 'Explain what a repeating decimal is, in your own words.',
      sw: 'Eleza desimali inayojirudia ni nini, kwa maneno yako mwenyewe.',
    },
    {
      en: 'Convert a simple repeating decimal to a fraction (for example 0.333… = 1/3).',
      sw: 'Badilisha desimali rahisi inayojirudia kuwa sehemu (kwa mfano 0.333… = 1/3).',
    },
    {
      en: 'Use the ×10-and-subtract trick on decimals like 0.777… and 0.666….',
      sw: 'Tumia mbinu ya kuzidisha kwa 10 na kutoa kwenye desimali kama 0.777… na 0.666….',
    },
    {
      en: 'Solve everyday problems with repeating decimals, such as splitting money fairly.',
      sw: 'Tatua matatizo ya kila siku yanayohusu desimali zinazojirudia, kama vile kugawana pesa kwa haki.',
    },
  ],
  intro: [
    {
      en: 'Some fractions refuse to become neat decimals. When you divide 1 by 3, the answer never ends — the digit 3 repeats forever. Decimals like 0.333… are called repeating decimals, and every one of them is secretly a fraction in disguise.',
      sw: 'Sehemu nyingine hazikubali kubadilika kuwa desimali safi. Unapogawanya 1 kwa 3, jibu haliishi — tarakimu 3 inajirudia milele. Desimali kama 0.333… huitwa desimali zinazojirudia, na kila moja ni sehemu iliyojificha.',
    },
    {
      en: 'In this lesson you will see with your own eyes why 1/3 = 0.333…, learn a clever algebra trick for going backwards (from decimal to fraction), and practise with everyday Tanzanian examples.',
      sw: 'Katika somo hili utaona kwa macho yako kwa nini 1/3 = 0.333…, utajifunza mbinu nzuri ya kialjebra ya kurudi nyuma (kutoka desimali kwenda sehemu), na utafanya mazoezi kwa mifano ya kila siku ya Kitanzania.',
    },
  ],

  scenes: [
    {
      id: 'bar-thirds',
      title: { en: 'Seeing 1/3', sw: 'Kuiona 1/3' },
      component: 'BarThirds',
      steps: [
        {
          en: 'Here is one whole chapati. In mathematics we call the whole thing 1.',
          sw: 'Hiki ni chapati kizima kimoja. Katika hisabati tunakiita kizima hiki 1.',
        },
        {
          en: 'Cut it into 3 equal parts.',
          sw: 'Kikate katika sehemu 3 sawa.',
        },
        {
          en: 'Each part is one out of three — we write it 1/3.',
          sw: 'Kila kipande ni moja kati ya tatu — tunakiandika 1/3.',
        },
        {
          en: 'One piece = 1/3. The top number (numerator) counts the pieces you have; the bottom number (denominator) counts the pieces in the whole.',
          sw: 'Kipande kimoja = 1/3. Nambari ya juu (numerator) inahesabu vipande ulivyo navyo; nambari ya chini (denominator) inahesabu vipande vya kizima.',
        },
        {
          en: 'Three pieces of 1/3 rebuild the whole chapati: 1/3 + 1/3 + 1/3 = 1.',
          sw: 'Vipande vitatu vya 1/3 vinajenga chapati kizima tena: 1/3 + 1/3 + 1/3 = 1.',
        },
      ],
    },
    {
      id: 'long-division',
      title: {
        en: 'Dividing 1 by 3, digit by digit',
        sw: 'Kugawanya 1 kwa 3, tarakimu kwa tarakimu',
      },
      component: 'LongDivision',
      steps: [
        {
          en: 'To turn 1/3 into a decimal, we divide: 1 ÷ 3.',
          sw: 'Kubadilisha 1/3 kuwa desimali, tunagawanya: 1 ÷ 3.',
        },
        {
          en: '3 cannot go into 1, so we write 0 and add a decimal point. Now we work with 1.000.',
          sw: '3 haiwezi kuingia katika 1, kwa hivyo tunaandika 0 na kuweka nukta ya desimali. Sasa tunafanya kazi na 1.000.',
        },
        {
          en: 'Bring down a 0 to make 10. 3 goes into 10 three times, because 3 × 3 = 9. Write 3 in the answer.',
          sw: 'Shusha 0 kupata 10. 3 inaingia katika 10 mara tatu, kwa sababu 3 × 3 = 9. Andika 3 kwenye jibu.',
        },
        {
          en: '10 − 9 = 1. Bring down another 0… and we are back at 10 again!',
          sw: '10 − 9 = 1. Shusha 0 nyingine… na tumerudi kwenye 10 tena!',
        },
        {
          en: 'The same steps repeat forever, so the digit 3 repeats forever. We write 0.333… — the dots mean “it keeps going”.',
          sw: 'Hatua zile zile zinajirudia milele, kwa hivyo tarakimu 3 inajirudia milele. Tunaandika 0.333… — vitone hivyo vina maana “inaendelea”.',
        },
        {
          en: 'So 1/3 = 0.333… exactly. A fraction became a repeating decimal!',
          sw: 'Kwa hivyo 1/3 = 0.333… kabisa. Sehemu imegeuka kuwa desimali inayojirudia!',
        },
      ],
    },
    {
      id: 'algebra-trick',
      title: {
        en: 'The ×10-and-subtract trick',
        sw: 'Mbinu ya kuzidisha kwa 10 na kutoa',
      },
      component: 'AlgebraTrick',
      steps: [
        {
          en: 'Now the reverse: turn 0.333… back into a fraction. Start by giving it a name — call it x.',
          sw: 'Sasa kurudi nyuma: badilisha 0.333… kuwa sehemu. Anza kwa kuipa jina — kuiita x.',
        },
        {
          en: 'Multiply both sides by 10. The decimal point jumps one place to the right: 10x = 3.333…',
          sw: 'Zidisha pande zote mbili kwa 10. Nukta ya desimali inaruka nafasi moja kwenda kulia: 10x = 3.333…',
        },
        {
          en: 'Subtract the first line from the second. The endless 3s cancel each other out!',
          sw: 'Toa mstari wa kwanza kutoka mstari wa pili. Tarakimu 3 zisizo na mwisho zinafutana!',
        },
        {
          en: '10x − x = 9x, and 3.333… − 0.333… = 3. So 9x = 3.',
          sw: '10x − x = 9x, na 3.333… − 0.333… = 3. Kwa hivyo 9x = 3.',
        },
        {
          en: 'Divide both sides by 9: x = 3/9 = 1/3. We found the hidden fraction!',
          sw: 'Gawanya pande zote mbili kwa 9: x = 3/9 = 1/3. Tumeipata sehemu iliyojificha!',
        },
      ],
    },
  ],

  workedExamples: [
    {
      id: 'ex-two-thirds',
      title: { en: 'Example 1: 2/3 as a decimal', sw: 'Mfano 1: 2/3 kama desimali' },
      context: {
        en: 'Mama Ndege buys 2 chapatis and shares them equally among 3 children. How much does each child get?',
        sw: 'Mama Ndege anunua chapati 2 na anawagawia watoto 3 kwa usawa. Kila mtoto atapata kiasi gani?',
      },
      steps: [
        {
          en: 'Each child gets 2 ÷ 3.',
          sw: 'Kila mtoto atapata 2 ÷ 3.',
        },
        {
          en: 'Long division: 3 goes into 20 six times (3 × 6 = 18), remainder 2 — and the remainder 2 keeps coming back.',
          sw: 'Mgawanyo mrefu: 3 inaingia katika 20 mara 6 (3 × 6 = 18), baki ni 2 — na baki 2 inaendelea kurudi.',
        },
        {
          en: 'So 2/3 = 0.666… The digit 6 repeats.',
          sw: 'Kwa hivyo 2/3 = 0.666… Tarakimu 6 inajirudia.',
        },
        {
          en: 'Check with the trick: let x = 0.666…, then 10x = 6.666…, so 9x = 6 and x = 6/9 = 2/3. ✓',
          sw: 'Hakiki kwa mbinu: tuseme x = 0.666…, basi 10x = 6.666…, kwa hivyo 9x = 6 na x = 6/9 = 2/3. ✓',
        },
      ],
    },
    {
      id: 'ex-one-sixth',
      title: { en: 'Example 2: 1/6 — the late repeater', sw: 'Mfano 2: 1/6 — inayochelewa kujirudia' },
      context: {
        en: 'One maandazi is shared equally among 6 pupils. How much does each pupil get?',
        sw: 'Maandazi moja linagawanywa kwa usawa kwa wanafunzi 6. Kila mwanafunzi atapata kiasi gani?',
      },
      steps: [
        {
          en: 'Each pupil gets 1 ÷ 6.',
          sw: 'Kila mwanafunzi atapata 1 ÷ 6.',
        },
        {
          en: '6 goes into 10 once (6 × 1 = 6), remainder 4. Write 1 after the decimal point.',
          sw: '6 inaingia katika 10 mara moja (6 × 1 = 6), baki ni 4. Andika 1 baada ya nukta ya desimali.',
        },
        {
          en: 'Bring down 0: 6 goes into 40 six times (6 × 6 = 36), remainder 4 — and now the remainder 4 keeps coming back.',
          sw: 'Shusha 0: 6 inaingia katika 40 mara 6 (6 × 6 = 36), baki ni 4 — na sasa baki 4 inaendelea kurudi.',
        },
        {
          en: 'So 1/6 = 0.1666… The 1 appears once, then 6 repeats forever. Repetition can start late!',
          sw: 'Kwa hivyo 1/6 = 0.1666… Tarakimu 1 inatokea mara moja, kisha 6 inajirudia milele. Kujirudia kunaweza kuanza baadaye!',
        },
      ],
    },
    {
      id: 'ex-money',
      title: { en: 'Example 3: Splitting TSh 10,000', sw: 'Mfano 3: Kugawana TSh 10,000' },
      context: {
        en: 'Three friends earn TSh 10,000 selling groundnuts and split it equally. How much does each get?',
        sw: 'Marafiki watatu wanapata TSh 10,000 kwa kuuza karanga na wanaigawana kwa usawa. Kila mmoja atapata kiasi gani?',
      },
      steps: [
        {
          en: 'Each friend gets 10,000 ÷ 3.',
          sw: 'Kila rafiki atapata 10,000 ÷ 3.',
        },
        {
          en: '3 goes into 10 three times with remainder 1, and the pattern never stops: 3,333.333…',
          sw: '3 inaingia katika 10 mara 3 na baki 1, na mpangilio hauishi: 3,333.333…',
        },
        {
          en: 'In real life we round to whole shillings: TSh 3,333 each, with TSh 1 left over. Repeating decimals are why shopkeepers round!',
          sw: 'Katika maisha halisi tunazungusha hadi shilingi kamili: TSh 3,333 kila mmoja, na TSh 1 inabaki. Desimali zinazojirudia ndizo sababu wafanyabiashara wanazungusha!',
        },
      ],
    },
  ],

  quiz: [
    {
      id: 'q1',
      type: 'mcq',
      question: { en: 'Which decimal is exactly equal to 1/3?', sw: 'Desimali gani ni sawa kabisa na 1/3?' },
      choices: [{ en: '0.3', sw: '0.3' }, { en: '0.33', sw: '0.33' }, { en: '0.333…', sw: '0.333…' }, { en: '0.34', sw: '0.34' }],
      answer: 2,
      explanation: {
        en: 'Only 0.333… goes on forever. 0.3 and 0.33 stop, so they are a little smaller than 1/3.',
        sw: 'Ni 0.333… tu inaendelea milele. 0.3 na 0.33 zinasimama, kwa hivyo ni ndogo kidogo kuliko 1/3.',
      },
    },
    {
      id: 'q2',
      type: 'mcq',
      question: { en: 'Use the ×10 trick: 0.777… as a fraction is…', sw: 'Tumia mbinu ya ×10: 0.777… kama sehemu ni…' },
      choices: [{ en: '7/10', sw: '7/10' }, { en: '7/9', sw: '7/9' }, { en: '77/99', sw: '77/99' }, { en: '0.7', sw: '0.7' }],
      answer: 1,
      explanation: {
        en: 'Let x = 0.777…, then 10x = 7.777…, so 9x = 7 and x = 7/9.',
        sw: 'Tuseme x = 0.777…, basi 10x = 7.777…, kwa hivyo 9x = 7 na x = 7/9.',
      },
    },
    {
      id: 'q3',
      type: 'truefalse',
      question: { en: '1/3 = 0.3 exactly.', sw: '1/3 = 0.3 kabisa.' },
      answer: false,
      explanation: {
        en: '0.3 means 3/10, not 1/3. The 3 must repeat forever: 0.333…',
        sw: '0.3 ina maana 3/10, si 1/3. Tarakimu 3 lazima ijirudie milele: 0.333…',
      },
    },
    {
      id: 'q4',
      type: 'mcq',
      question: { en: '1/6 as a decimal is…', sw: '1/6 kama desimali ni…' },
      choices: [{ en: '0.16', sw: '0.16' }, { en: '0.1666…', sw: '0.1666…' }, { en: '0.1616…', sw: '0.1616…' }, { en: '0.6', sw: '0.6' }],
      answer: 1,
      explanation: {
        en: 'The 1 appears once, then 6 repeats forever: 0.1666…',
        sw: 'Tarakimu 1 inatokea mara moja, kisha 6 inajirudia milele: 0.1666…',
      },
    },
    {
      id: 'q5',
      type: 'mcq',
      question: { en: '2/9 as a decimal is…', sw: '2/9 kama desimali ni…' },
      choices: [{ en: '0.2', sw: '0.2' }, { en: '0.222…', sw: '0.222…' }, { en: '0.2929…', sw: '0.2929…' }, { en: '0.29', sw: '0.29' }],
      answer: 1,
      explanation: {
        en: 'Let x = 0.222…, then 10x = 2.222…, so 9x = 2 and x = 2/9.',
        sw: 'Tuseme x = 0.222…, basi 10x = 2.222…, kwa hivyo 9x = 2 na x = 2/9.',
      },
    },
  ],
}
