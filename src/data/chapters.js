import { collagePhotos } from './collagePhotos'

export const chapters = [
  {
    id: 1,
    title: 'The Beginning',
    emoji: '🎒',
    scene: `It was your first year of university. Everything was new — the campus, the faces, the possibilities. You didn't know it yet, but this year would change your life in more ways than one.\n\nYou found your first class, met your first coursemates, and got your first assignment. It was the start of something big — even if it didn't feel like it at the time.`,
    questions: [
      {
        type: 'text',
        text: 'What was the first thing that happened to you on your very first day?',
        placeholder: 'Write whatever comes to mind...',
        photo: '/photos/fober.jpg',
        photoCaption: 'Your first year ✨',
      },
      {
        type: 'text',
        text: 'Who was the first friend you made, and how did you meet?',
        placeholder: 'Tell the story...',
        photo: '/photos/717993289_960799560116892_4919061328471501835_n.jpg',
        photoCaption: 'The ones who made it worth it 🌸',
      },
      {
        type: 'upload',
        prompt: 'Add a photo from your first year — any memory from those early days.',
        // Auto-loaded from src/assets/collage/ — drop new photos there to add them.
        galleryPhotos: collagePhotos,
      },
    ],
  },
  {
    id: 2,
    title: 'The Journey',
    emoji: '📚',
    scene: `Then came our months — the second and the third. Every night, we'd find our way to each other, making memories and telling stories until the hours slipped away.\n\nAnd then, on one of those nights... you finally said yes.`,
    questions: [
      {
        text: 'Where did we first meet?',
        choices: ['Shipwreck', 'Ship port', 'Terminal port'],
        correct: 2,
      },
      {
        text: 'When was the first time you said yes?',
        choices: ['17 Agustus', '17 September', '10 November'],
        correct: 1,
      },
    ],
  },
  {
    id: 3,
    title: 'The Hard Part',
    emoji: '🌙',
    scene: `Final year. The thesis. The pressure. The 2am panic. There were days you questioned everything — whether you were smart enough, whether it was worth it.\n\nYou were. It was. And I hope you know I saw you fight for every single word of that thesis.`,
    questions: [
      {
        type: 'game',
        prompt: 'The hard days came fast — but you never fell alone. Catch them all 💕',
      },
    ],
  },
  {
    id: 4,
    title: 'Graduation Day',
    emoji: '🎓',
    scene: `And then it was over. Four years of hard work, late nights, friendships, growth, love — all leading to this moment.\n\nYou walked across that stage and I was so proud I didn't know what to do with myself.\n\nSo go on — throw your cap. You earned this.`,
    questions: [
      {
        type: 'game',
        game: 'capToss',
        prompt: 'This is your moment, graduate. 🎓',
      },
      {
        type: 'text',
        text: 'Before we go on — write a little message to your future self.',
        placeholder: 'One thing you\'re proud of, one hope for what\'s next...',
      },
    ],
  },
  {
    id: 5,
    title: 'For You',
    emoji: '💌',
    scene: `You made it through every chapter — the beginning, the journey, the hard part, and the day you crossed that stage.\n\nThere's just one more thing I need to say. Take your time with this one.`,
    questions: [
      {
        type: 'letter',
      },
    ],
  },
]
