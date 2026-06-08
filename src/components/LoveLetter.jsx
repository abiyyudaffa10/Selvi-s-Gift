import { motion } from 'framer-motion'

export default function LoveLetter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '52px 44px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
        width: '100%',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div style={{ fontSize: '2rem' }}>💌</div>
      </div>

      {/* ============================================================
          WRITE YOUR LETTER BELOW.
          Replace the placeholder paragraphs with your real words.
          ============================================================ */}

      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.05rem',
        lineHeight: 1.9,
        color: 'var(--color-text)',
      }}>
        <p style={{ marginBottom: '20px' }}>Dear Selvi Rebecca,</p>
        <p style={{ marginBottom: '20px' }}>
          I made this for you because words on a card didn't feel like enough.
          You worked so hard for this — harder than you'll ever give yourself credit for —
          and I want you to know that I saw every single moment of it.
        </p>
        <p style={{ marginBottom: '20px' }}>
          [Write your real letter here. Tell her what you're proud of.
          Tell her your favourite memory. Tell her what you're looking forward to.]
        </p>
        <p style={{ marginBottom: '20px' }}>
          Congratulations, sayang. You did it.
        </p>
        <p>
          With all my love,<br />
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: 'var(--color-primary)',
          }}>
            [Your name] 🌸
          </span>
        </p>
      </div>

      {/* ============================================================ */}

      <div style={{ textAlign: 'center', marginTop: '48px', fontSize: '1.5rem', letterSpacing: '8px', opacity: 0.4 }}>
        🌸 ✦ 🌸
      </div>
    </motion.div>
  )
}
