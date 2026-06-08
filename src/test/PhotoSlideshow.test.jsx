import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import PhotoSlideshow from '../components/PhotoSlideshow'

vi.mock('../data/photos', () => ({
  photos: [
    { src: '/photos/a.jpg', caption: 'First photo' },
    { src: '/photos/b.jpg', caption: 'Second photo' },
  ],
}))

describe('PhotoSlideshow', () => {
  it('shows the first photo caption initially', () => {
    render(<PhotoSlideshow onNext={() => {}} />)
    expect(screen.getByText('First photo')).toBeInTheDocument()
  })

  it('shows the Continue button after clicking through all photos', async () => {
    render(<PhotoSlideshow onNext={() => {}} />)
    await userEvent.click(screen.getByRole('img'))
    expect(screen.getByText('Second photo')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('img'))
    expect(screen.getByRole('button', { name: /letter/i })).toBeInTheDocument()
  })

  it('calls onNext when Continue button is clicked', async () => {
    const onNext = vi.fn()
    render(<PhotoSlideshow onNext={onNext} />)
    await userEvent.click(screen.getByRole('img'))
    await userEvent.click(screen.getByRole('img'))
    await userEvent.click(screen.getByRole('button', { name: /letter/i }))
    expect(onNext).toHaveBeenCalledOnce()
  })
})
