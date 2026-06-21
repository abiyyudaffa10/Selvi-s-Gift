import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TARGET = 10
const ITEMS = ['💕', '💕', '💕', '☕'] // mostly hearts, some coffee

let nextId = 0

export default function CatchHearts({ prompt, onDone }) {
  const [caught, setCaught] = useState(0)
  const [items, setItems] = useState([]) // { id, emoji, left, duration }
  const [won, setWon] = useState(false)
  const areaRef = useRef(null)

  const wonRef = useRef(false)
  wonRef.current = won

  // Spawn a new falling item on an interval
  useEffect(() => {
    if (won) return
    const spawn = setInterval(() => {
      setItems(prev => {
        // cap concurrent items so it never floods
        if (prev.length > 14) return prev
        const emoji = ITEMS[Math.floor(Math.random() * ITEMS.length)]
        const left = 5 + Math.random() * 85 // percent
        const duration = 2.6 + Math.random() * 1.6 // seconds to fall
        return [...prev, { id: nextId++, emoji, left, duration }]
      })
    }, 520)
    return () => clearInterval(spawn)
  }, [won])

  // Remove an item once it finishes falling (missed)
  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(it => it.id !== id))
  }, [])

  function catchItem(item, e) {
    e.stopPropagation()
    if (wonRef.current) return
    removeItem(item.id)
    // only hearts count toward the goal; coffee is a fun miss
    if (item.emoji === '💕') {
      setCaught(c => {
        const nc = c + 1
        if (nc >= TARGET) {
          setWon(true)
        }
        return nc
      })
    }
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
        padding: '32px 28px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.2rem',
          color: 'var(--color-primary-dark)',
          marginBottom: '8px',
          lineHeight: 1.5,
        }}>
          {prompt}
        </p>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)',
          marginBottom: '16px',
        }}>
          Tap the hearts 💕 to catch them — coffee ☕ is just for the all-nighters!
        </p>

        {/* Counter */}
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
          marginBottom: '16px',
        }}>
          {caught} / {TARGET} 💕
        </div>

        {/* Play area */}
        <div
          ref={areaRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '360px',
            background: 'linear-gradient(180deg, #fff8f9 0%, #fde9ef 100%)',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid var(--color-pink-light)',
            touchAction: 'manipulation',
          }}
        >
          {!won && items.map(item => (
            <motion.button
              key={item.id}
              initial={{ top: '-12%' }}
              animate={{ top: '108%' }}
              transition={{ duration: item.duration, ease: 'linear' }}
              onAnimationComplete={() => removeItem(item.id)}
              onClick={(e) => catchItem(item, e)}
              aria-label={item.emoji === '💕' ? 'heart' : 'coffee'}
              style={{
                position: 'absolute',
                left: `${item.left}%`,
                fontSize: '2.2rem',
                lineHeight: 1,
                background: 'none',
                border: 'none',
                padding: '4px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              {item.emoji}
            </motion.button>
          ))}

          {/* Win overlay */}
          <AnimatePresence>
            {won && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '24px',
                  background: 'rgba(255,248,249,0.95)',
                }}
              >
                <div style={{ fontSize: '2.6rem', marginBottom: '12px' }}>🤍</div>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.15rem',
                  color: 'var(--color-primary-dark)',
                  lineHeight: 1.6,
                  maxWidth: '420px',
                }}>
                  Through every late night and every hard day — I was always right
                  here, catching you. And you made it through all of it. 💕
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Continue appears after winning */}
        <AnimatePresence>
          {won && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button
                onClick={onDone}
                style={{
                  marginTop: '24px',
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
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
