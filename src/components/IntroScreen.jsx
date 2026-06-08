import { motion } from 'framer-motion'

export default function IntroScreen({ onBegin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ textAlign: 'center', padding: '48px 24px' }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌸</div>
      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(2rem, 6vw, 3.5rem)',
        color: 'var(--color-primary-dark)',
        marginBottom: '12px',
        lineHeight: 1.2,
      }}>
        Selvi Rebecca
      </h1>
      <p style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: 'var(--color-text-muted)',
        fontSize: '1.1rem',
        marginBottom: '48px',
      }}>
        A story made just for you
      </p>
      <button
        onClick={onBegin}
        style={{
          background: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 40px',
          fontSize: '1rem',
          letterSpacing: '0.05em',
          fontFamily: 'var(--font-sans)',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => e.target.style.background = 'var(--color-primary-dark)'}
        onMouseOut={e => e.target.style.background = 'var(--color-primary)'}
      >
        Begin ✨
      </button>
    </motion.div>
  )
}
