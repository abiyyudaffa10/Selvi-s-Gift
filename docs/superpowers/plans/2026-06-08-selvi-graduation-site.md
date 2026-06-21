# Selvi Rebecca — Graduation Adventure Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive graduation gift website — a quiz-driven adventure game covering Selvi Rebecca's uni journey and love story, ending with a score reveal, photo slideshow, and love letter.

**Architecture:** React + Vite SPA. All state (current screen, chapter index, question index, score) lives in `App.jsx`. Navigation is purely forward via an `advance()` pure function in `src/navigation.js`. Content (scene text, quiz questions, photos) lives in `src/data/` so it can be edited without touching component code.

**Tech Stack:** React 18, Vite 5, Framer Motion (transitions), canvas-confetti (ending confetti), Vitest + @testing-library/react (tests), gh-pages (deployment)

---

## File Map

| File | Responsibility |
|---|---|
| `src/navigation.js` | Pure `advance(state)` function — all screen transition logic |
| `src/utils/scoreTitle.js` | Pure `getScoreTitle(score)` — maps score 0–8 to a title string |
| `src/data/chapters.js` | Scene text + quiz questions for all 4 chapters |
| `src/data/photos.js` | Ordered photo list for the slideshow |
| `src/components/IntroScreen.jsx` | Opening screen with her name and Begin button |
| `src/components/ChapterScene.jsx` | Narrative scene text for a chapter |
| `src/components/QuizQuestion.jsx` | Single quiz question with 4 choices + feedback |
| `src/components/ScoreReveal.jsx` | Score out of 8 + personalized title + confetti |
| `src/components/PhotoSlideshow.jsx` | Auto-advancing photo gallery with captions |
| `src/components/LoveLetter.jsx` | Final love letter — hardcode your text here |
| `src/App.jsx` | State machine — holds all state, renders correct component |
| `src/index.css` | Global CSS variables, reset, fonts |
| `vite.config.js` | Vite + Vitest config + GitHub Pages base path |
| `public/photos/` | Drop your photo files here |

---

## Task 1: Scaffold the project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`

- [ ] **Step 1: Create the Vite + React project in the current directory**

```bash
npm create vite@latest . -- --template react
```

When prompted "Current directory is not empty", choose **"Ignore files and continue"**. When prompted for framework, choose **React**. When prompted for variant, choose **JavaScript**.

- [ ] **Step 2: Install core dependencies**

```bash
npm install
npm install framer-motion canvas-confetti
```

- [ ] **Step 3: Install dev dependencies for testing**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 4: Replace `vite.config.js` with this (adds Vitest config + GitHub Pages base path)**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/selvi-web/',
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
```

- [ ] **Step 5: Create the Vitest setup file**

Create `src/test/setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Add test script to `package.json`**

In `package.json`, add to the `"scripts"` section:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 7: Add `gh-pages` for deployment**

```bash
npm install -D gh-pages
```

Add to `package.json` scripts:

```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

- [ ] **Step 8: Verify project runs**

```bash
npm run dev
```

Expected: Vite dev server starts, browser shows default React page at `http://localhost:5173`

- [ ] **Step 9: Commit**

```bash
git init
git add package.json package-lock.json vite.config.js index.html src/ public/
git commit -m "chore: scaffold React + Vite project with Vitest and gh-pages"
```

---

## Task 2: Global styles

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`

- [ ] **Step 1: Add Google Fonts to `index.html`**

Replace the `<head>` section of `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>For Selvi Rebecca 🌸</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Replace `src/index.css` with global styles**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --color-bg: #fff8f9;
  --color-primary: #e91e63;
  --color-primary-dark: #c2185b;
  --color-pink-light: #f8bbd0;
  --color-pink-pale: #fce4ec;
  --color-text: #3d1f2b;
  --color-text-muted: #9e6b7a;
  --color-correct: #2e7d32;
  --color-wrong: #c62828;
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Lato', system-ui, sans-serif;
  --radius: 12px;
  --shadow: 0 4px 24px rgba(233, 30, 99, 0.1);
}

html, body, #root {
  height: 100%;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

#root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px 16px;
}

button {
  cursor: pointer;
  font-family: var(--font-sans);
}
```

- [ ] **Step 3: Clear `src/App.css`**

```css
/* App-level layout */
.app {
  width: 100%;
  max-width: 680px;
}
```

- [ ] **Step 4: Update `src/App.jsx` to a bare minimum while we build**

```jsx
import './App.css'

function App() {
  return <div className="app"><p>Loading...</p></div>
}

export default App
```

- [ ] **Step 5: Commit**

```bash
git add index.html src/index.css src/App.css src/App.jsx
git commit -m "style: add global CSS variables, Google Fonts, base layout"
```

---

## Task 3: Data files

**Files:**
- Create: `src/data/chapters.js`
- Create: `src/data/photos.js`

These contain placeholder content — **you will replace the scene text and questions with your real memories before sharing with Selvi.**

- [ ] **Step 1: Create `src/data/chapters.js`**

```js
export const chapters = [
  {
    id: 1,
    title: 'The Beginning',
    emoji: '🎒',
    scene: `It was your first year of university. Everything was new — the campus, the faces, the possibilities. You didn't know it yet, but this year would change your life in more ways than one.\n\nAnd somewhere in the middle of all that newness... we found each other.`,
    questions: [
      {
        text: 'What was the first thing I said to you when we met?',
        choices: [
          'Replace this with a real option',
          'Replace this with a real option',
          'Replace this with the correct answer',
          'Replace this with a real option',
        ],
        correct: 2,
      },
      {
        text: 'Where did we meet for the very first time?',
        choices: [
          'The correct place goes here',
          'Replace this with a real option',
          'Replace this with a real option',
          'Replace this with a real option',
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 2,
    title: 'The Journey',
    emoji: '📚',
    scene: `Year two and three. Late nights, group projects, that one lecturer everyone disliked. Your circle of friends got tighter. Your confidence grew.\n\nAnd us? We were figuring things out — making memories I still think about when I least expect it.`,
    questions: [
      {
        text: "What's our favourite thing to do together?",
        choices: [
          'Replace this with a real option',
          'The correct answer goes here',
          'Replace this with a real option',
          'Replace this with a real option',
        ],
        correct: 1,
      },
      {
        text: "What's our inside joke about?",
        choices: [
          'Replace this with a real option',
          'Replace this with a real option',
          'Replace this with a real option',
          'The correct answer goes here',
        ],
        correct: 3,
      },
    ],
  },
  {
    id: 3,
    title: 'The Hard Part',
    emoji: '🌙',
    scene: `Final year. The thesis. The pressure. The 2am panic. There were days you questioned everything — whether you were smart enough, whether it was worth it.\n\nYou were. It was. And I hope you know I saw you fight for every single word of that thesis.`,
    questions: [
      {
        text: 'What did I do when you were stressed about your thesis?',
        choices: [
          'Replace this with a real option',
          'Replace this with a real option',
          'The correct answer goes here',
          'Replace this with a real option',
        ],
        correct: 2,
      },
      {
        text: 'What did you say when you finally submitted?',
        choices: [
          'The correct answer goes here',
          'Replace this with a real option',
          'Replace this with a real option',
          'Replace this with a real option',
        ],
        correct: 0,
      },
    ],
  },
  {
    id: 4,
    title: 'Graduation Day',
    emoji: '🎓',
    scene: `And then it was over. Four years of hard work, late nights, friendships, growth, love — all leading to this moment.\n\nYou walked across that stage and I was so proud I didn't know what to do with myself.\n\nNow there's one last question before we get to the best part...`,
    questions: [
      {
        text: 'What did I tell you the morning of your graduation?',
        choices: [
          'Replace this with a real option',
          'The correct answer goes here',
          'Replace this with a real option',
          'Replace this with a real option',
        ],
        correct: 1,
      },
      {
        text: "What do I call you when I'm being cheesy?",
        choices: [
          'Replace this with a real option',
          'Replace this with a real option',
          'The correct answer goes here',
          'Replace this with a real option',
        ],
        correct: 2,
      },
    ],
  },
]
```

- [ ] **Step 2: Create `src/data/photos.js`**

```js
// Add your actual photo filenames to public/photos/
// Caption is optional — leave as '' to show no caption
export const photos = [
  { src: '/selvi-web/photos/photo1.jpg', caption: 'Replace with a real caption' },
  { src: '/selvi-web/photos/photo2.jpg', caption: '' },
  { src: '/selvi-web/photos/photo3.jpg', caption: 'Replace with a real caption' },
]
```

- [ ] **Step 3: Create the photos folder**

```bash
mkdir public/photos
```

Drop your actual `.jpg` / `.png` files in `public/photos/` and update `photos.js` filenames to match.

- [ ] **Step 4: Commit**

```bash
git add src/data/ public/photos/
git commit -m "feat: add placeholder chapter and photo data"
```

---

## Task 4: Navigation logic

**Files:**
- Create: `src/navigation.js`
- Create: `src/test/navigation.test.js`

- [ ] **Step 1: Write the failing tests first**

Create `src/test/navigation.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { advance } from '../navigation'

const base = { screen: 'intro', chapterIndex: 0, questionIndex: 0, score: 0 }

describe('advance()', () => {
  it('moves from intro to first chapter scene', () => {
    const next = advance(base)
    expect(next.screen).toBe('chapter')
    expect(next.chapterIndex).toBe(0)
  })

  it('moves from chapter scene to first quiz question', () => {
    const next = advance({ ...base, screen: 'chapter' })
    expect(next.screen).toBe('quiz')
    expect(next.questionIndex).toBe(0)
  })

  it('moves from first question to second question in same chapter', () => {
    const next = advance({ ...base, screen: 'quiz', questionIndex: 0 })
    expect(next.screen).toBe('quiz')
    expect(next.questionIndex).toBe(1)
    expect(next.chapterIndex).toBe(0)
  })

  it('moves from last question of a chapter to next chapter scene', () => {
    const next = advance({ ...base, screen: 'quiz', chapterIndex: 0, questionIndex: 1 })
    expect(next.screen).toBe('chapter')
    expect(next.chapterIndex).toBe(1)
    expect(next.questionIndex).toBe(0)
  })

  it('moves from last question of last chapter to score screen', () => {
    const next = advance({ ...base, screen: 'quiz', chapterIndex: 3, questionIndex: 1 })
    expect(next.screen).toBe('score')
  })

  it('moves from score to slideshow', () => {
    const next = advance({ ...base, screen: 'score' })
    expect(next.screen).toBe('slideshow')
  })

  it('moves from slideshow to letter', () => {
    const next = advance({ ...base, screen: 'slideshow' })
    expect(next.screen).toBe('letter')
  })

  it('does not change state from letter screen', () => {
    const state = { ...base, screen: 'letter' }
    expect(advance(state)).toEqual(state)
  })
})
```

- [ ] **Step 2: Run tests — confirm they all fail**

```bash
npm test
```

Expected: 8 tests fail with "Cannot find module '../navigation'"

- [ ] **Step 3: Create `src/navigation.js`**

```js
const TOTAL_CHAPTERS = 4
const QUESTIONS_PER_CHAPTER = 2

export function advance(state) {
  const { screen, chapterIndex, questionIndex } = state

  if (screen === 'intro') {
    return { ...state, screen: 'chapter' }
  }

  if (screen === 'chapter') {
    return { ...state, screen: 'quiz', questionIndex: 0 }
  }

  if (screen === 'quiz') {
    const isLastQuestion = questionIndex === QUESTIONS_PER_CHAPTER - 1
    const isLastChapter = chapterIndex === TOTAL_CHAPTERS - 1

    if (!isLastQuestion) {
      return { ...state, questionIndex: questionIndex + 1 }
    }
    if (!isLastChapter) {
      return { ...state, screen: 'chapter', chapterIndex: chapterIndex + 1, questionIndex: 0 }
    }
    return { ...state, screen: 'score' }
  }

  if (screen === 'score') return { ...state, screen: 'slideshow' }
  if (screen === 'slideshow') return { ...state, screen: 'letter' }

  return state
}
```

- [ ] **Step 4: Run tests — confirm they all pass**

```bash
npm test
```

Expected: 8 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/navigation.js src/test/navigation.test.js src/test/setup.js
git commit -m "feat: add advance() navigation logic with full test coverage"
```

---

## Task 5: Score title utility

**Files:**
- Create: `src/utils/scoreTitle.js`
- Create: `src/test/scoreTitle.test.js`

- [ ] **Step 1: Write failing tests**

Create `src/test/scoreTitle.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { getScoreTitle } from '../utils/scoreTitle'

describe('getScoreTitle()', () => {
  it('returns perfect title for 8/8', () => {
    expect(getScoreTitle(8)).toBe("Perfect Score — You Know Me Completely 💕")
  })

  it('returns champion title for 7', () => {
    expect(getScoreTitle(7)).toBe("Quiz Champion — Almost Perfect 🌸")
  })

  it('returns champion title for 6', () => {
    expect(getScoreTitle(6)).toBe("Quiz Champion — Almost Perfect 🌸")
  })

  it('returns student title for 5', () => {
    expect(getScoreTitle(5)).toBe("A Good Student — Keep Paying Attention 😄")
  })

  it('returns student title for 4', () => {
    expect(getScoreTitle(4)).toBe("A Good Student — Keep Paying Attention 😄")
  })

  it('returns talk title for 3', () => {
    expect(getScoreTitle(3)).toBe("Hmm... We Need To Talk 😂")
  })

  it('returns talk title for 0', () => {
    expect(getScoreTitle(0)).toBe("Hmm... We Need To Talk 😂")
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test
```

Expected: 7 tests fail with "Cannot find module '../utils/scoreTitle'"

- [ ] **Step 3: Create `src/utils/scoreTitle.js`**

```js
export function getScoreTitle(score) {
  if (score === 8) return "Perfect Score — You Know Me Completely 💕"
  if (score >= 6) return "Quiz Champion — Almost Perfect 🌸"
  if (score >= 4) return "A Good Student — Keep Paying Attention 😄"
  return "Hmm... We Need To Talk 😂"
}
```

- [ ] **Step 4: Run tests — confirm they all pass**

```bash
npm test
```

Expected: 15 total tests pass (8 navigation + 7 scoreTitle)

- [ ] **Step 5: Commit**

```bash
git add src/utils/scoreTitle.js src/test/scoreTitle.test.js
git commit -m "feat: add getScoreTitle() utility with tests"
```

---

## Task 6: IntroScreen component

**Files:**
- Create: `src/components/IntroScreen.jsx`
- Create: `src/test/IntroScreen.test.jsx`

- [ ] **Step 1: Write failing test**

Create `src/test/IntroScreen.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import IntroScreen from '../components/IntroScreen'

describe('IntroScreen', () => {
  it('displays her name', () => {
    render(<IntroScreen onBegin={() => {}} />)
    expect(screen.getByText(/Selvi Rebecca/i)).toBeInTheDocument()
  })

  it('calls onBegin when button is clicked', async () => {
    const onBegin = vi.fn()
    render(<IntroScreen onBegin={onBegin} />)
    await userEvent.click(screen.getByRole('button', { name: /begin/i }))
    expect(onBegin).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test
```

Expected: 2 tests fail with "Cannot find module '../components/IntroScreen'"

- [ ] **Step 3: Create `src/components/IntroScreen.jsx`**

```jsx
import { motion } from 'framer-motion'

export default function IntroScreen({ onBegin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center', padding: '48px 24px' }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌸</div>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2rem, 6vw, 3.5rem)',
        color: 'var(--color-primary-dark)',
        marginBottom: '12px',
        lineHeight: 1.2,
      }}>
        Selvi Rebecca
      </h1>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: 'var(--color-text-muted)',
        fontSize: '1.1rem',
        marginBottom: '48px',
      }}>
        A story made just for you
      </p>
      <button
        onClick={onBegin}
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 40px',
          fontSize: '1rem',
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-sans)',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => e.target.style.background = 'var(--color-primary-dark)'}
        onMouseOut={e => e.target.style.background = 'var(--color-primary)'}
      >
        Begin ✨
      </button>
    </motion.div>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

Expected: 17 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/components/IntroScreen.jsx src/test/IntroScreen.test.jsx
git commit -m "feat: add IntroScreen component"
```

---

## Task 7: ChapterScene component

**Files:**
- Create: `src/components/ChapterScene.jsx`
- Create: `src/test/ChapterScene.test.jsx`

- [ ] **Step 1: Write failing test**

Create `src/test/ChapterScene.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ChapterScene from '../components/ChapterScene'

const chapter = {
  id: 1,
  title: 'The Beginning',
  emoji: '🎒',
  scene: 'It was your first year.',
  questions: [],
}

describe('ChapterScene', () => {
  it('displays the chapter title', () => {
    render(<ChapterScene chapter={chapter} chapterIndex={0} onNext={() => {}} />)
    expect(screen.getByText(/The Beginning/i)).toBeInTheDocument()
  })

  it('displays the scene text', () => {
    render(<ChapterScene chapter={chapter} chapterIndex={0} onNext={() => {}} />)
    expect(screen.getByText(/first year/i)).toBeInTheDocument()
  })

  it('calls onNext when Continue is clicked', async () => {
    const onNext = vi.fn()
    render(<ChapterScene chapter={chapter} chapterIndex={0} onNext={onNext} />)
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(onNext).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test
```

Expected: 3 tests fail

- [ ] **Step 3: Create `src/components/ChapterScene.jsx`**

```jsx
import { motion } from 'framer-motion'

export default function ChapterScene({ chapter, chapterIndex, onNext }) {
  return (
    <motion.div
      key={`chapter-${chapterIndex}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%' }}
    >
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '40px 36px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '12px', textAlign: 'center' }}>
          {chapter.emoji}
        </div>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          Chapter {chapterIndex + 1}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.8rem',
          color: 'var(--color-primary-dark)',
          textAlign: 'center',
          marginBottom: '28px',
        }}>
          {chapter.title}
        </h2>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.05rem',
          lineHeight: 1.85,
          color: 'var(--color-text)',
          whiteSpace: 'pre-line',
          marginBottom: '36px',
        }}>
          {chapter.scene}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onNext}
            style={{
              background: 'transparent',
              color: 'var(--color-primary)',
              border: '2px solid var(--color-primary)',
              borderRadius: '50px',
              padding: '12px 32px',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'var(--color-primary)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-primary)'
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

Expected: 20 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/components/ChapterScene.jsx src/test/ChapterScene.test.jsx
git commit -m "feat: add ChapterScene component"
```

---

## Task 8: QuizQuestion component

**Files:**
- Create: `src/components/QuizQuestion.jsx`
- Create: `src/test/QuizQuestion.test.jsx`

- [ ] **Step 1: Write failing tests**

Create `src/test/QuizQuestion.test.jsx`:

```jsx
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import QuizQuestion from '../components/QuizQuestion'

const question = {
  text: 'Where did we meet?',
  choices: ['Library', 'Cafe', 'Campus', 'Online'],
  correct: 2,
}

describe('QuizQuestion', () => {
  it('displays the question text', () => {
    render(<QuizQuestion question={question} questionIndex={0} chapterIndex={0} onAnswer={() => {}} />)
    expect(screen.getByText(/Where did we meet/i)).toBeInTheDocument()
  })

  it('displays all 4 choices', () => {
    render(<QuizQuestion question={question} questionIndex={0} chapterIndex={0} onAnswer={() => {}} />)
    expect(screen.getByText('Library')).toBeInTheDocument()
    expect(screen.getByText('Cafe')).toBeInTheDocument()
    expect(screen.getByText('Campus')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
  })

  it('calls onAnswer(true) when correct choice is selected', async () => {
    vi.useFakeTimers()
    const onAnswer = vi.fn()
    render(<QuizQuestion question={question} questionIndex={0} chapterIndex={0} onAnswer={onAnswer} />)
    await userEvent.click(screen.getByText('Campus'))
    act(() => vi.advanceTimersByTime(1500))
    expect(onAnswer).toHaveBeenCalledWith(true)
    vi.useRealTimers()
  })

  it('calls onAnswer(false) when wrong choice is selected', async () => {
    vi.useFakeTimers()
    const onAnswer = vi.fn()
    render(<QuizQuestion question={question} questionIndex={0} chapterIndex={0} onAnswer={onAnswer} />)
    await userEvent.click(screen.getByText('Library'))
    act(() => vi.advanceTimersByTime(1500))
    expect(onAnswer).toHaveBeenCalledWith(false)
    vi.useRealTimers()
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test
```

Expected: 4 tests fail

- [ ] **Step 3: Create `src/components/QuizQuestion.jsx`**

```jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function QuizQuestion({ question, questionIndex, chapterIndex, onAnswer }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setSelected(null)
  }, [questionIndex, chapterIndex])

  function handleSelect(index) {
    if (selected !== null) return
    setSelected(index)
    setTimeout(() => onAnswer(index === question.correct), 1500)
  }

  function getChoiceStyle(index) {
    const base = {
      width: '100%',
      textAlign: 'left',
      padding: '14px 20px',
      borderRadius: '10px',
      border: '2px solid var(--color-pink-light)',
      background: 'white',
      fontSize: '1rem',
      fontFamily: 'var(--font-sans)',
      color: 'var(--color-text)',
      transition: 'all 0.2s',
      cursor: selected === null ? 'pointer' : 'default',
    }
    if (selected === null) return base
    if (index === question.correct) {
      return { ...base, background: '#e8f5e9', borderColor: 'var(--color-correct)', color: 'var(--color-correct)' }
    }
    if (index === selected) {
      return { ...base, background: '#ffebee', borderColor: 'var(--color-wrong)', color: 'var(--color-wrong)' }
    }
    return { ...base, opacity: 0.4 }
  }

  return (
    <motion.div
      key={`q-${chapterIndex}-${questionIndex}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '36px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: '16px',
        }}>
          Question {questionIndex + 1}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.4rem',
          color: 'var(--color-primary-dark)',
          marginBottom: '28px',
          lineHeight: 1.4,
        }}>
          {question.text}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={getChoiceStyle(i)}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

Expected: 24 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/components/QuizQuestion.jsx src/test/QuizQuestion.test.jsx
git commit -m "feat: add QuizQuestion component with correct/wrong feedback"
```

---

## Task 9: Wire up App.jsx

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `src/App.jsx` with the full state machine**

```jsx
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { advance } from './navigation'
import { chapters } from './data/chapters'
import IntroScreen from './components/IntroScreen'
import ChapterScene from './components/ChapterScene'
import QuizQuestion from './components/QuizQuestion'
import ScoreReveal from './components/ScoreReveal'
import PhotoSlideshow from './components/PhotoSlideshow'
import LoveLetter from './components/LoveLetter'
import './App.css'

export default function App() {
  const [state, setState] = useState({
    screen: 'intro',
    chapterIndex: 0,
    questionIndex: 0,
    score: 0,
  })

  function next() {
    setState(s => advance(s))
  }

  function handleAnswer(isCorrect) {
    setState(s => advance({ ...s, score: isCorrect ? s.score + 1 : s.score }))
  }

  const { screen, chapterIndex, questionIndex, score } = state
  const chapter = chapters[chapterIndex]

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {screen === 'intro' && (
          <IntroScreen key="intro" onBegin={next} />
        )}
        {screen === 'chapter' && (
          <ChapterScene
            key={`chapter-${chapterIndex}`}
            chapter={chapter}
            chapterIndex={chapterIndex}
            onNext={next}
          />
        )}
        {screen === 'quiz' && (
          <QuizQuestion
            key={`quiz-${chapterIndex}-${questionIndex}`}
            question={chapter.questions[questionIndex]}
            questionIndex={questionIndex}
            chapterIndex={chapterIndex}
            onAnswer={handleAnswer}
          />
        )}
        {screen === 'score' && (
          <ScoreReveal key="score" score={score} onNext={next} />
        )}
        {screen === 'slideshow' && (
          <PhotoSlideshow key="slideshow" onNext={next} />
        )}
        {screen === 'letter' && (
          <LoveLetter key="letter" />
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2: Verify in the browser — click through intro → chapter → quiz**

```bash
npm run dev
```

Open `http://localhost:5173/selvi-web/`. It will error when reaching the score screen — that's expected since ScoreReveal, PhotoSlideshow, and LoveLetter don't exist yet.

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire up App state machine — game playable through quiz sections"
```

---

## Task 10: ScoreReveal component

**Files:**
- Create: `src/components/ScoreReveal.jsx`
- Create: `src/test/ScoreReveal.test.jsx`

- [ ] **Step 1: Write failing test**

Create `src/test/ScoreReveal.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import ScoreReveal from '../components/ScoreReveal'

vi.mock('canvas-confetti', () => ({ default: vi.fn() }))

describe('ScoreReveal', () => {
  it('displays the score', () => {
    render(<ScoreReveal score={7} onNext={() => {}} />)
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('/ 8')).toBeInTheDocument()
  })

  it('displays the correct title for score 7', () => {
    render(<ScoreReveal score={7} onNext={() => {}} />)
    expect(screen.getByText(/Quiz Champion/i)).toBeInTheDocument()
  })

  it('calls onNext when button is clicked', async () => {
    const onNext = vi.fn()
    render(<ScoreReveal score={8} onNext={onNext} />)
    await userEvent.click(screen.getByRole('button', { name: /photos/i }))
    expect(onNext).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test
```

Expected: 3 tests fail

- [ ] **Step 3: Create `src/components/ScoreReveal.jsx`**

```jsx
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { getScoreTitle } from '../utils/scoreTitle'

export default function ScoreReveal({ score, onNext }) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e91e63', '#f48fb1', '#fce4ec', '#ffffff', '#ff80ab'],
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '48px 36px',
        textAlign: 'center',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
        width: '100%',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏆</div>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginBottom: '12px',
      }}>
        Your Score
      </p>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '4rem',
        fontWeight: 700,
        color: 'var(--color-primary)',
        lineHeight: 1,
        marginBottom: '8px',
      }}>
        {score} <span style={{ fontSize: '2rem', color: 'var(--color-text-muted)' }}>/ 8</span>
      </div>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.2rem',
        color: 'var(--color-primary-dark)',
        marginTop: '20px',
        marginBottom: '40px',
        lineHeight: 1.5,
      }}>
        {getScoreTitle(score)}
      </p>
      <button
        onClick={onNext}
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 36px',
          fontSize: '1rem',
          fontFamily: 'var(--font-sans)',
        }}
      >
        See our photos →
      </button>
    </motion.div>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

Expected: 27 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/components/ScoreReveal.jsx src/test/ScoreReveal.test.jsx
git commit -m "feat: add ScoreReveal component with confetti"
```

---

## Task 11: PhotoSlideshow component

**Files:**
- Create: `src/components/PhotoSlideshow.jsx`
- Create: `src/test/PhotoSlideshow.test.jsx`

- [ ] **Step 1: Write failing test**

Create `src/test/PhotoSlideshow.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import PhotoSlideshow from '../components/PhotoSlideshow'

vi.mock('../data/photos', () => ({
  photos: [
    { src: '/photos/a.jpg', caption: 'First photo' },
    { src: '/photos/b.jpg', caption: 'Second photo' },
  ],
}))

describe('PhotoSlideshow', () => {
  it('shows the first photo caption initially', () => {
    render(<PhotoSlideshow onNext={() => {}} />)
    expect(screen.getByText('First photo')).toBeInTheDocument()
  })

  it('shows the Continue button after clicking through all photos', async () => {
    render(<PhotoSlideshow onNext={() => {}} />)
    await userEvent.click(screen.getByRole('img'))
    expect(screen.getByText('Second photo')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('img'))
    expect(screen.getByRole('button', { name: /letter/i })).toBeInTheDocument()
  })

  it('calls onNext when Continue button is clicked', async () => {
    const onNext = vi.fn()
    render(<PhotoSlideshow onNext={onNext} />)
    await userEvent.click(screen.getByRole('img'))
    await userEvent.click(screen.getByRole('img'))
    await userEvent.click(screen.getByRole('button', { name: /letter/i }))
    expect(onNext).toHaveBeenCalledOnce()
  })
})
```

- [ ] **Step 2: Run tests — confirm they fail**

```bash
npm test
```

Expected: 3 tests fail

- [ ] **Step 3: Create `src/components/PhotoSlideshow.jsx`**

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { photos } from '../data/photos'

export default function PhotoSlideshow({ onNext }) {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    const timer = setTimeout(() => advance(), 3000)
    return () => clearTimeout(timer)
  }, [index, done])

  function advance() {
    if (index < photos.length - 1) {
      setIndex(i => i + 1)
    } else {
      setDone(true)
    }
  }

  const photo = photos[index]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ width: '100%', textAlign: 'center' }}
    >
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginBottom: '20px',
      }}>
        {index + 1} / {photos.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={photo.src}
            alt={photo.caption || `Memory ${index + 1}`}
            onClick={advance}
            style={{
              width: '100%',
              maxHeight: '480px',
              objectFit: 'cover',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow)',
              cursor: done ? 'default' : 'pointer',
              display: 'block',
            }}
          />
          {photo.caption && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              color: 'var(--color-text-muted)',
              marginTop: '16px',
              fontSize: '1rem',
            }}>
              {photo.caption}
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '36px' }}
        >
          <button
            onClick={onNext}
            style={{
              background: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '14px 36px',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Read your letter →
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
```

- [ ] **Step 4: Run tests — confirm they pass**

```bash
npm test
```

Expected: 30 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/components/PhotoSlideshow.jsx src/test/PhotoSlideshow.test.jsx
git commit -m "feat: add PhotoSlideshow component with auto-advance"
```

---

## Task 12: LoveLetter component

**Files:**
- Create: `src/components/LoveLetter.jsx`

- [ ] **Step 1: Create `src/components/LoveLetter.jsx`**

```jsx
import { motion } from 'framer-motion'

export default function LoveLetter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '52px 44px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '2rem' }}>💌</div>
      </div>

      {/* ============================================================
          WRITE YOUR LETTER BELOW.
          Replace the placeholder paragraphs with your real words.
          ============================================================ */}

      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.05rem',
        lineHeight: 1.9,
        color: 'var(--color-text)',
      }}>
        <p style={{ marginBottom: '20px' }}>Dear Selvi Rebecca,</p>
        <p style={{ marginBottom: '20px' }}>
          I made this for you because words on a card didn't feel like enough.
          You worked so hard for this — harder than you'll ever give yourself credit for —
          and I want you to know that I saw every single moment of it.
        </p>
        <p style={{ marginBottom: '20px' }}>
          [Write your real letter here. Tell her what you're proud of.
          Tell her your favourite memory. Tell her what you're looking forward to.]
        </p>
        <p style={{ marginBottom: '20px' }}>
          Congratulations, sayang. You did it.
        </p>
        <p>
          With all my love,<br />
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: 'var(--color-primary)',
          }}>
            [Your name] 🌸
          </span>
        </p>
      </div>

      {/* ============================================================ */}

      <div style={{ textAlign: 'center', marginTop: '48px', fontSize: '1.5rem', letterSpacing: '8px', opacity: 0.4 }}>
        🌸 ✦ 🌸
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 2: Replace the placeholder letter with your real words**

Open `src/components/LoveLetter.jsx` and replace the `[placeholder]` paragraphs with your actual letter to Selvi.

- [ ] **Step 3: Do a full run-through in the browser**

```bash
npm run dev
```

Play the entire game from start to finish: intro → all 4 chapters → 8 questions → score → slideshow → letter. Make sure it all feels right.

- [ ] **Step 4: Commit**

```bash
git add src/components/LoveLetter.jsx
git commit -m "feat: add LoveLetter component — full game complete"
```

---

## Task 13: Deploy to GitHub Pages

- [ ] **Step 1: Create a GitHub repository**

Go to github.com → New repository → name it `selvi-web` → Public → Create (do not initialize with README).

- [ ] **Step 2: Connect your local repo and push**

```bash
git remote add origin https://github.com/YOUR_USERNAME/selvi-web.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

- [ ] **Step 3: Run the deploy command**

```bash
npm run deploy
```

This builds the project and pushes `dist/` to the `gh-pages` branch. Expected output ends with: `Published`

- [ ] **Step 4: Enable GitHub Pages in repo settings**

1. Go to your repo on GitHub → Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **/ (root)**
4. Save

- [ ] **Step 5: Open and test your live site**

Wait ~2 minutes, then open: `https://YOUR_USERNAME.github.io/selvi-web/`

Play through the full game to confirm everything works correctly on the live URL.

- [ ] **Step 6: Share the link with Selvi 🎉**

---

## Self-Review

**Spec coverage:**
- ✅ Quiz + Adventure game format
- ✅ 4 chapters — her uni journey + love story woven together
- ✅ 2 quiz questions per chapter (8 total)
- ✅ Soft & romantic visual style (Playfair Display, pastel pinks, blush white)
- ✅ Triple ending: score reveal → photo slideshow → love letter
- ✅ Score titles for all ranges (8, 6–7, 4–5, 0–3)
- ✅ Confetti on score screen
- ✅ Photos auto-advance every 3s, manual click also works
- ✅ Love letter with serif font, centered, elegant
- ✅ React + Vite, static, GitHub Pages deployment
- ✅ Framer Motion transitions between screens
- ✅ `advance()` tested as pure function
- ✅ `getScoreTitle()` tested for all ranges

**Type consistency:** `advance()` takes and returns `{ screen, chapterIndex, questionIndex, score }` — used consistently in `App.jsx`, `navigation.js`, and tests. `onAnswer(isCorrect: boolean)` matches between `QuizQuestion` and `App.jsx`.
