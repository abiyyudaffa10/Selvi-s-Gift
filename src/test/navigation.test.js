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
