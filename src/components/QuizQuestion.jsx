import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function QuizQuestion({ question, questionIndex, chapterIndex, onAnswer }) {
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    setSelected(null)
  }, [questionIndex, chapterIndex])

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
