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
