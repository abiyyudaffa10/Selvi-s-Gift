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
