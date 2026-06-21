import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CatchHearts from './CatchHearts'
import CapToss from './CapToss'
import LoveLetter from './LoveLetter'

export default function QuizQuestion({ question, questionIndex, chapterIndex, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [textValue, setTextValue] = useState('')
  const [textSubmitted, setTextSubmitted] = useState(false)
  const [uploadedSrcs, setUploadedSrcs] = useState([])

  useEffect(() => {
    setSelected(null)
    setTextValue('')
    setTextSubmitted(false)
    setUploadedSrcs([])
  }, [questionIndex, chapterIndex])

  // ── Love letter (as a chapter step) ──────────────────────────────────────────
  if (question.type === 'letter') {
    return (
      <motion.div
        key={`letter-${chapterIndex}-${questionIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <LoveLetter />
        <div style={{ textAlign: 'center', marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }} className="no-print">
          <button
            onClick={() => window.print()}
            style={{
              background: 'white',
              color: 'var(--color-primary)',
              border: '2px solid var(--color-primary)',
              borderRadius: '50px',
              padding: '12px 28px',
              fontSize: '1rem',
              fontFamily: 'var(--font-sans)',
              cursor: 'pointer',
            }}
          >
            💌 Save letter
          </button>
          <button
            onClick={() => onAnswer(true)}
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
        </div>
      </motion.div>
    )
  }

  // ── Mini-games ───────────────────────────────────────────────────────────────
  if (question.type === 'game') {
    if (question.game === 'capToss') {
      return (
        <CapToss
          key={`game-${chapterIndex}-${questionIndex}`}
          prompt={question.prompt}
          onDone={() => onAnswer(true)}
        />
      )
    }
    // default: catch hearts
    return (
      <CatchHearts
        key={`game-${chapterIndex}-${questionIndex}`}
        prompt={question.prompt}
        onDone={() => onAnswer(true)}
      />
    )
  }

  // ── Multiple choice ──────────────────────────────────────────────────────────
  function handleSelect(index) {
    if (selected !== null) return
    setSelected(index)
    setTimeout(() => onAnswer(index === question.correct), 1500)
  }

  function getChoiceStyle(index) {
    const base = {
      width: '100%',
      textAlign: 'left',
      padding: '14px 20px',
      borderRadius: '10px',
      border: '2px solid var(--color-pink-light)',
      background: 'white',
      fontSize: '1rem',
      fontFamily: 'var(--font-sans)',
      color: 'var(--color-text)',
      transition: 'all 0.2s',
      cursor: selected === null ? 'pointer' : 'default',
    }
    if (selected === null) return base
    if (index === question.correct) {
      return { ...base, background: '#e8f5e9', borderColor: 'var(--color-correct)', color: 'var(--color-correct)' }
    }
    if (index === selected) {
      return { ...base, background: '#ffebee', borderColor: 'var(--color-wrong)', color: 'var(--color-wrong)' }
    }
    return { ...base, opacity: 0.4 }
  }

  // ── Text question ────────────────────────────────────────────────────────────
  function handleTextSubmit() {
    if (!textValue.trim()) return
    setTextSubmitted(true)
  }

  if (question.type === 'text') {
    return (
      <motion.div
        key={`q-${chapterIndex}-${questionIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        <div style={{
          background: 'white',
          borderRadius: 'var(--radius)',
          padding: '36px',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--color-pink-light)',
        }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            marginBottom: '16px',
          }}>
            Question {questionIndex + 1}
          </p>
          <h3 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.4rem',
            color: 'var(--color-primary-dark)',
            marginBottom: '28px',
            lineHeight: 1.4,
          }}>
            {question.text}
          </h3>

          <AnimatePresence mode="wait">
            {!textSubmitted ? (
              <motion.div
                key="input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <textarea
                  value={textValue}
                  onChange={e => setTextValue(e.target.value)}
                  placeholder={question.placeholder || 'Write your answer here...'}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '2px solid var(--color-pink-light)',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    color: 'var(--color-text)',
                    lineHeight: 1.6,
                    resize: 'none',
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: '#fff8f9',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--color-primary)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--color-pink-light)' }}
                />
                <button
                  onClick={handleTextSubmit}
                  disabled={!textValue.trim()}
                  style={{
                    marginTop: '16px',
                    background: textValue.trim() ? 'var(--color-primary)' : '#f8bbd0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px 32px',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-sans)',
                    cursor: textValue.trim() ? 'pointer' : 'default',
                    transition: 'background 0.2s',
                  }}
                >
                  Save this memory →
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="reveal"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Her answer shown as a diary entry */}
                <div style={{
                  background: '#fff8f9',
                  borderRadius: '10px',
                  border: '1px solid var(--color-pink-light)',
                  padding: '16px 20px',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}>
                  "{textValue}"
                </div>

                {/* Photo reveal */}
                {question.photo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ marginBottom: '24px' }}
                  >
                    <img
                      src={question.photo}
                      alt={question.photoCaption || 'A memory'}
                      style={{
                        width: '100%',
                        maxHeight: '70vh',
                        objectFit: 'contain',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow)',
                        display: 'block',
                      }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    {question.photoCaption && (
                      <p style={{
                        fontFamily: 'var(--font-serif)',
                        fontStyle: 'italic',
                        color: 'var(--color-text-muted)',
                        marginTop: '10px',
                        fontSize: '0.95rem',
                        textAlign: 'center',
                      }}>
                        {question.photoCaption}
                      </p>
                    )}
                  </motion.div>
                )}

                <button
                  onClick={() => onAnswer(true)}
                  style={{
                    background: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '12px 32px',
                    fontSize: '0.95rem',
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

  // ── Upload question ──────────────────────────────────────────────────────────
  function handleFileChange(e) {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    const newSrcs = files.map(f => URL.createObjectURL(f))
    setUploadedSrcs(prev => [...prev, ...newSrcs])
    // allow re-selecting the same file again later
    e.target.value = ''
  }

  function removeUpload(src) {
    setUploadedSrcs(prev => prev.filter(s => s !== src))
    URL.revokeObjectURL(src)
  }

  if (question.type === 'upload') {
    const gallery = question.galleryPhotos || []
    const hasUploads = uploadedSrcs.length > 0
    const allPhotos = [
      ...uploadedSrcs.map(src => ({ src, yours: true })),
      ...gallery,
    ]

    // Deterministic pseudo-random scatter so polaroids don't jump on re-render
    const scatterFor = (i) => {
      const rand = (seed) => {
        const x = Math.sin(seed * 99.13 + 7.7) * 10000
        return x - Math.floor(x)
      }
      const rotate = (rand(i) - 0.5) * 24 // -12deg..12deg
      const dx = (rand(i + 100) - 0.5) * 18 // small horizontal jitter %
      const dy = (rand(i + 200) - 0.5) * 14
      return { rotate, dx, dy }
    }

    return (
      <motion.div
        key={`q-${chapterIndex}-${questionIndex}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%' }}
      >
        {/* Full-screen scattered-polaroid collage overlay (builds as she adds photos) */}
        {hasUploads && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 5,
              background: 'rgba(255, 248, 249, 0.92)',
              overflow: 'hidden',
              pointerEvents: 'none',
            }}
          >
            {allPhotos.map((p, i) => {
              const { rotate, dx, dy } = scatterFor(i)
              // Spread photos across a loose grid, then jitter each one
              const cols = Math.ceil(Math.sqrt(allPhotos.length))
              const col = i % cols
              const row = Math.floor(i / cols)
              const cellW = 100 / cols
              const rows = Math.ceil(allPhotos.length / cols)
              const cellH = 100 / rows
              const left = col * cellW + cellW / 2 + dx
              const top = row * cellH + cellH / 2 + dy
              return (
                <motion.div
                  key={p.src}
                  initial={{ opacity: 0, scale: 0.6, rotate: rotate * 2 }}
                  animate={{ opacity: 1, scale: 1, rotate }}
                  transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.04 }}
                  style={{
                    position: 'absolute',
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `min(${Math.max(180, 520 / cols)}px, 38vw)`,
                    background: 'white',
                    padding: '8px 8px 22px',
                    borderRadius: '4px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                  }}
                >
                  <img
                    src={p.src}
                    alt={`Memory ${i + 1}`}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '2px',
                    }}
                    onError={e => { e.target.parentElement.style.display = 'none' }}
                  />
                </motion.div>
              )
            })}
          </div>
        )}

        {/* Prompt card — floats above the collage */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          background: 'white',
          borderRadius: 'var(--radius)',
          padding: '36px',
          boxShadow: hasUploads ? '0 12px 40px rgba(0,0,0,0.18)' : 'var(--shadow)',
          border: '1px solid var(--color-pink-light)',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.2rem',
            color: 'var(--color-primary-dark)',
            marginBottom: '24px',
            lineHeight: 1.5,
          }}>
            {question.prompt}
          </p>

          {/* Upload area */}
          <label style={{
            display: 'block',
            border: `2px dashed ${hasUploads ? 'var(--color-correct)' : 'var(--color-pink-light)'}`,
            borderRadius: '12px',
            padding: '28px 20px',
            textAlign: 'center',
            cursor: 'pointer',
            background: hasUploads ? '#f1f8f1' : '#fff8f9',
            transition: 'all 0.2s',
            marginBottom: '24px',
          }}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {hasUploads ? (
              <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-correct)', fontSize: '0.95rem' }}>
                ✓ {uploadedSrcs.length} photo{uploadedSrcs.length > 1 ? 's' : ''} added — tap to add more
              </span>
            ) : (
              <>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📷</div>
                <span style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                  Tap to choose photos — you can pick as many as you want
                </span>
              </>
            )}
          </label>

          {/* Thumbnails of her uploads, so she can remove any */}
          {hasUploads && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '24px',
            }}>
              {uploadedSrcs.map((src, i) => (
                <div key={src} style={{ position: 'relative', width: '56px', height: '56px' }}>
                  <img
                    src={src}
                    alt={`Your photo ${i + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      boxShadow: '0 0 0 2px var(--color-primary)',
                      display: 'block',
                    }}
                  />
                  <button
                    onClick={() => removeUpload(src)}
                    aria-label="Remove photo"
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: 'none',
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      fontSize: '0.8rem',
                      lineHeight: 1,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 0,
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => onAnswer(true)}
            disabled={!hasUploads}
            style={{
              background: hasUploads ? 'var(--color-primary)' : '#f8bbd0',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              padding: '12px 32px',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-sans)',
              cursor: hasUploads ? 'pointer' : 'default',
              transition: 'background 0.2s',
            }}
          >
            Continue →
          </button>
        </div>
      </motion.div>
    )
  }

  // ── Default: multiple choice ─────────────────────────────────────────────────
  return (
    <motion.div
      key={`q-${chapterIndex}-${questionIndex}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%' }}
    >
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius)',
        padding: '36px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--color-pink-light)',
      }}>
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          marginBottom: '16px',
        }}>
          Question {questionIndex + 1}
        </p>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.4rem',
          color: 'var(--color-primary-dark)',
          marginBottom: '28px',
          lineHeight: 1.4,
        }}>
          {question.text}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              style={getChoiceStyle(i)}
            >
              {choice}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
