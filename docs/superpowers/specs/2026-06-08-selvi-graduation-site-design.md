# Selvi Rebecca — Graduation Adventure Site

**Date:** 2026-06-08
**Stack:** React + Vite, static, deployed to GitHub Pages
**Recipient:** Selvi Rebecca (girlfriend)

---

## Overview

An interactive graduation gift website that plays like an adventure game with embedded quiz questions. Selvi navigates through 4 chapters covering both her university journey and the couple's love story. Each chapter has a narrative scene followed by 2 quiz questions. After completing all chapters, she reaches a triple-payoff ending: score reveal → photo slideshow → love letter.

The entire site is client-side only — no backend, no database, no login. All state (current chapter, score, step) lives in React component state in the browser.

---

## Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Format | Quiz + Adventure game | Interactive, memorable, not just a static page |
| Narrative | Her uni journey + love story woven together | Most complete picture of both timelines |
| Visual style | Soft & romantic (pastel pinks, serif fonts, warm tones) | Matches the emotional tone of the gift |
| Ending | Score reveal → Photo slideshow → Love letter | Layered emotional payoff |
| Stack | React + Vite | Clean state management for chapter/quiz flow; deploys as static |
| Hosting | GitHub Pages | Free, shareable link, just `git push` |

---

## Site Flow

```
Intro Screen
  └─→ Chapter 1: "The Beginning"   (scene + 2 quiz questions)
        └─→ Chapter 2: "The Journey"    (scene + 2 quiz questions)
              └─→ Chapter 3: "The Hard Part"  (scene + 2 quiz questions)
                    └─→ Chapter 4: "Graduation Day" (scene + 2 quiz questions)
                          └─→ Ending Part 1: Score Reveal
                                └─→ Ending Part 2: Photo Slideshow
                                      └─→ Ending Part 3: Love Letter
```

**Total:** 4 chapters · 8 quiz questions · 3-part ending

---

## Component Architecture

```
src/
├── data/
│   ├── chapters.js       ← all scene text, quiz questions, answers, correct index
│   └── photos.js         ← ordered photo list for the slideshow
├── components/
│   ├── IntroScreen.jsx   ← her name + tagline + begin button
│   ├── ChapterScene.jsx  ← chapter title + narrative text + "next" button
│   ├── QuizQuestion.jsx  ← question + 4 answer choices + score feedback
│   ├── ScoreReveal.jsx   ← score out of 8 + personalized title + confetti
│   ├── PhotoSlideshow.jsx← auto-advancing photos with soft fade transitions
│   └── LoveLetter.jsx    ← full letter from you, elegant serif layout
└── App.jsx               ← top-level state: screen, chapterIndex, questionIndex, score
```

### App State

```js
const [screen, setScreen] = useState('intro')
// screens: 'intro' | 'chapter' | 'quiz' | 'score' | 'slideshow' | 'letter'

const [chapterIndex, setChapterIndex] = useState(0)  // 0–3
const [questionIndex, setQuestionIndex] = useState(0) // 0–1 within chapter
const [score, setScore] = useState(0)                 // 0–8
```

Navigation is purely forward — no back button. Each screen calls `advance()` to move to the next logical step:

```
intro → chapter[0].scene → chapter[0].q[0] → chapter[0].q[1]
      → chapter[1].scene → chapter[1].q[0] → chapter[1].q[1]
      → ... (repeat for chapters 2 & 3)
      → score → slideshow → letter
```

---

## Data Shape

### chapters.js

```js
export const chapters = [
  {
    id: 1,
    title: "The Beginning",
    emoji: "🎒",
    scene: "It was [year]. You walked into your first day of uni...",
    questions: [
      {
        text: "What was the first thing you thought when you saw me?",
        choices: ["Option A", "Option B", "Option C", "Option D"],
        correct: 2  // index of correct answer
      },
      {
        text: "Where did we first meet?",
        choices: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0
      }
    ]
  },
  // chapters 2–4 follow same shape
]
```

### photos.js

```js
export const photos = [
  { src: '/photos/photo1.jpg', caption: 'That day we...' },
  { src: '/photos/photo2.jpg', caption: '' },
]
```

---

## Chapter Outline

You fill in the actual scene text and quiz questions with real memories. The chapter structure gives you the buckets:

| Chapter | Theme | Scene covers | Quiz question types |
|---|---|---|---|
| 1 — The Beginning | First year + how you met | Her orientation/first days + the moment you two met | About how you met, early relationship |
| 2 — The Journey | Mid-uni + relationship milestones | Favourite memories from her studies + your relationship growing | Inside jokes, favourite moments together |
| 3 — The Hard Part | Thesis/finals + tough times | Stress of final year + how you supported each other | About specific hard moments, how you handled them |
| 4 — Graduation Day | The finish line | Leading up to graduation day + your feelings | About the day itself, plans for the future |

---

## Ending Sequence

### Part 1 — Score Reveal
- Display score as `X / 8`
- Personalized title based on score:
  - 8/8 → "Perfect Score — You Know Me Completely 💕"
  - 6–7 → "Quiz Champion — Almost Perfect 🌸"
  - 4–5 → "A Good Student — Keep Paying Attention 😄"
  - 0–3 → "Hmm... We Need To Talk 😂"
- Confetti animation via `canvas-confetti` package

### Part 2 — Photo Slideshow
- Photos auto-advance every 3 seconds with soft fade transition
- Optional background music (`.mp3` in `public/`)
- User can click to advance manually
- "Continue to your letter →" button appears after all photos shown

### Part 3 — Love Letter
- Full-screen elegant layout with serif font
- Letter text hardcoded in `LoveLetter.jsx` (written by you)
- Soft blush background, centered, max-width ~680px for readability
- Ends with your name + small floral decoration

---

## Visual Style

- **Fonts:** `Playfair Display` (headings/scenes) + `Lato` (body/choices) via Google Fonts
- **Colors:**
  - Background: `#fff8f9` (blush white)
  - Primary: `#e91e63` / `#c2185b` (rose pink)
  - Border/tags: `#f8bbd0` (light pink)
  - Text: `#3d1f2b` (dark rose-brown)
- **Transitions:** Framer Motion — fade + slight upward slide between screens
- **Quiz feedback:** Correct glows green, wrong glows red, auto-advances after 1.5s

---

## Deployment

1. `npm create vite@latest selvi-web -- --template react`
2. Build content in `src/`, add photos to `public/photos/`
3. `npm run build` → generates `dist/`
4. Push repo to GitHub, enable GitHub Pages (source: `dist/` via `gh-pages` package)
5. Share URL with Selvi

---

## Out of Scope

- No backend, API, or database
- No score persistence across sessions
- No admin panel — content is hardcoded in `data/chapters.js`
