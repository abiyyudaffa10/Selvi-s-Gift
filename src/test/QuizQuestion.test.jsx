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
