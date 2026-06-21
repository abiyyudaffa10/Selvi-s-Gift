import { chapters } from './data/chapters'

const TOTAL_CHAPTERS = 5

export function advance(state) {
  const { screen, chapterIndex, questionIndex } = state

  if (screen === 'intro') {
    return { ...state, screen: 'chapter' }
  }

  if (screen === 'chapter') {
    return { ...state, screen: 'quiz', questionIndex: 0 }
  }

  if (screen === 'quiz') {
    const totalQuestions = chapters[chapterIndex].questions.length
    const isLastQuestion = questionIndex === totalQuestions - 1
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
  // slideshow is the final screen — the love letter is now Chapter 5
  return state
}
