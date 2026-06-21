import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function CapToss({ prompt, onDone }) {
  const [tossed, setTossed] = useState(false)

  function toss() {
    if (tossed) return
    setTossed(true)
    // celebratory confetti burst
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#e91e63', '#f48fb1', '#fce4ec', '#ffffff', '#ffd54f'],
    })
    setTimeout(() => {
      confetti({ particleCount: 80, spread: 70, origin: { x: 0.2, y: 0.6 } })
      confetti({ particleCount: 80, spread: 70, origin: { x: 0.8, y: 0.6 } })
    }, 250)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '36px 28px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.2rem',
          color: 'var(--color-primary-dark)',
          marginBottom: '24px',
          lineHeight: 1.5,
        }}>
          {prompt}
        </p>

        {/* Stage */}
        <div style={{
          position: 'relative',
          height: '300px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '24px',
        }}>
          <AnimatePresence>
            {!tossed ? (
              <motion.button
                key="cap"
                onClick={toss}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                exit={{ opacity: 0 }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '5rem',
                  cursor: 'pointer',
                  marginBottom: '40px',
                  lineHeight: 1,
                }}
                aria-label="Toss the graduation cap"
              >
                🎓
              </motion.button>
            ) : (
              <motion.div
                key="cap-flying"
                initial={{ y: 40, rotate: 0, opacity: 1 }}
                animate={{ y: -260, rotate: 380, opacity: [1, 1, 0] }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
                style={{ fontSize: '5rem', lineHeight: 1, position: 'absolute', bottom: '40px' }}
              >
                🎓
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {tossed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  marginBottom: '8px',
                }}>
                  You did it! 🎉
                </div>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  color: 'var(--color-primary-dark)',
                  lineHeight: 1.6,
                  maxWidth: '420px',
                }}>
                  Four years. Every late night, every doubt, every win — all of it
                  led right here. Congratulations, graduate. 🌸
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!tossed ? (
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            color: 'var(--color-text-muted)',
          }}>
            Tap the cap to throw it ✨
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <button
              onClick={onDone}
              style={{
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                padding: '14px 36px',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
              }}
            >
              Continue →
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
