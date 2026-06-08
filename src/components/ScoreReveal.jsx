import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { getScoreTitle } from '../utils/scoreTitle'

export default function ScoreReveal({ score, onNext }) {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e91e63', '#f48fb1', '#fce4ec', '#ffffff', '#ff80ab'],
    })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
      style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '48px 36px',
        textAlign: 'center',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
        width: '100%',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🏆</div>
      <p style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: 'var(--color-text-muted)',
        marginBottom: '12px',
      }}>
        Your Score
      </p>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '4rem',
        fontWeight: 700,
        color: 'var(--color-primary)',
        lineHeight: 1,
        marginBottom: '8px',
      }}>
        {score} <span style={{ fontSize: '2rem', color: 'var(--color-text-muted)' }}>/ 8</span>
      </div>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.2rem',
        color: 'var(--color-primary-dark)',
        marginTop: '20px',
        marginBottom: '40px',
        lineHeight: 1.5,
      }}>
        {getScoreTitle(score)}
      </p>
      <button
        onClick={onNext}
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 36px',
          fontSize: '1rem',
          fontFamily: 'var(--font-sans)',
        }}
      >
        See our photos →
      </button>
    </motion.div>
  )
}
