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
