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
