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

  it('advances to the next photo when clicked', async () => {
    render(<PhotoSlideshow onNext={() => {}} />)
    await userEvent.click(screen.getByRole('img'))
    expect(screen.getByText('Second photo')).toBeInTheDocument()
  })

  it('shows the closing message after clicking through all photos', async () => {
    render(<PhotoSlideshow onNext={() => {}} />)
    await userEvent.click(screen.getByRole('img'))
    await userEvent.click(screen.getByRole('img'))
    expect(screen.getByText(/everything still to come/i)).toBeInTheDocument()
  })
})
