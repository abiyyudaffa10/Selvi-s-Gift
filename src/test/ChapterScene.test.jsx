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
