import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { advance } from './navigation'
import { chapters } from './data/chapters'
import IntroScreen from './components/IntroScreen'
import ChapterScene from './components/ChapterScene'
import QuizQuestion from './components/QuizQuestion'
import ScoreReveal from './components/ScoreReveal'
import PhotoSlideshow from './components/PhotoSlideshow'
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
      </AnimatePresence>
    </div>
  )
}
