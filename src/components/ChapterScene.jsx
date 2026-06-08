import { motion } from 'framer-motion'

export default function ChapterScene({ chapter, chapterIndex, onNext }) {
  return (
    <motion.div
      key={`chapter-${chapterIndex}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%' }}
    >
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '40px 36px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '12px', textAlign: 'center' }}>
          {chapter.emoji}
        </div>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          Chapter {chapterIndex + 1}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.8rem',
          color: 'var(--color-primary-dark)',
          textAlign: 'center',
          marginBottom: '28px',
        }}>
          {chapter.title}
        </h2>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.05rem',
          lineHeight: 1.85,
          color: 'var(--color-text)',
          whiteSpace: 'pre-line',
          marginBottom: '36px',
        }}>
          {chapter.scene}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onNext}
            style={{
              background: 'transparent',
              color: 'var(--color-primary)',
              border: '2px solid var(--color-primary)',
              borderRadius: '50px',
              padding: '12px 32px',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-sans)',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'var(--color-primary)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--color-primary)'
            }}
          >
            Continue →
          </button>
        </div>
      </div>
    </motion.div>
  )
}
