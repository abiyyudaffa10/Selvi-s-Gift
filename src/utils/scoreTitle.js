export function getScoreTitle(score) {
  if (score === 8) return "Perfect Score — You Know Me Completely 💕"
  if (score >= 6) return "Quiz Champion — Almost Perfect 🌸"
  if (score >= 4) return "A Good Student — Keep Paying Attention 😄"
  return "Hmm... We Need To Talk 😂"
}
