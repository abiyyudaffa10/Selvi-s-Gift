import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { photos } from '../data/photos'

export default function PhotoSlideshow({ onNext }) {
  const [index, setIndex] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done) return
    const timer = setTimeout(() => advance(), 3000)
    return () => clearTimeout(timer)
  }, [index, done])

  function advance() {
    if (done) return
    setIndex(i => {
      const next = i + 1
      if (next >= photos.length) {
        setDone(true)
        return i
      }
      return next
    })
  }

  const photo = photos[Math.min(index, photos.length - 1)]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{ width: '100%', textAlign: 'center' }}
    >
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginBottom: '20px',
      }}>
        {index + 1} / {photos.length}
      </p>

      <div key={index}>
        <img
          src={photo.src}
          alt={photo.caption || `Memory ${index + 1}`}
          onClick={advance}
          style={{
            width: '100%',
            maxHeight: '480px',
            objectFit: 'cover',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow)',
            cursor: done ? 'default' : 'pointer',
            display: 'block',
          }}
        />
        {photo.caption && (
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            color: 'var(--color-text-muted)',
            marginTop: '16px',
            fontSize: '1rem',
          }}>
            {photo.caption}
          </p>
        )}
      </div>

      {done && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: '36px', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.15rem',
            color: 'var(--color-primary-dark)',
            marginBottom: '8px',
          }}>
            Here's to us, and everything still to come.
          </p>
          <div style={{ fontSize: '1.4rem', letterSpacing: '6px', opacity: 0.5 }}>
            🌸 ✦ 🌸
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
