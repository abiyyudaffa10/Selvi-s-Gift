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

  it('moves from second question to third question in chapter 1 (which has 3 questions)', () => {
    const next = advance({ ...base, screen: 'quiz', chapterIndex: 0, questionIndex: 1 })
    expect(next.screen).toBe('quiz')
    expect(next.questionIndex).toBe(2)
    expect(next.chapterIndex).toBe(0)
  })

  it('moves from last question of chapter 1 (index 2) to chapter 2 scene', () => {
    const next = advance({ ...base, screen: 'quiz', chapterIndex: 0, questionIndex: 2 })
    expect(next.screen).toBe('chapter')
    expect(next.chapterIndex).toBe(1)
    expect(next.questionIndex).toBe(0)
  })

  it('moves from last question of a middle chapter to next chapter', () => {
    const next = advance({ ...base, screen: 'quiz', chapterIndex: 1, questionIndex: 1 })
    expect(next.screen).toBe('chapter')
    expect(next.chapterIndex).toBe(2)
    expect(next.questionIndex).toBe(0)
  })

  it('moves from the single letter step of the last chapter (index 4) to score screen', () => {
    const next = advance({ ...base, screen: 'quiz', chapterIndex: 4, questionIndex: 0 })
    expect(next.screen).toBe('score')
  })

  it('moves from score to slideshow', () => {
    const next = advance({ ...base, screen: 'score' })
    expect(next.screen).toBe('slideshow')
  })

  it('does not change state from slideshow screen (final screen)', () => {
    const state = { ...base, screen: 'slideshow' }
    expect(advance(state)).toEqual(state)
  })
})
