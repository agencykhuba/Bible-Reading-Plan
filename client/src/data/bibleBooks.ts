export interface BibleBook {
  id: number;
  name: string;
  chapters: number;
  testament: 'Old' | 'New';
}

export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament - Law
  { id: 1, name: 'Genesis', chapters: 50, testament: 'Old' },
  { id: 2, name: 'Exodus', chapters: 40, testament: 'Old' },
  { id: 3, name: 'Leviticus', chapters: 27, testament: 'Old' },
  { id: 4, name: 'Numbers', chapters: 36, testament: 'Old' },
  { id: 5, name: 'Deuteronomy', chapters: 34, testament: 'Old' },

  // Old Testament - History
  { id: 6, name: 'Joshua', chapters: 24, testament: 'Old' },
  { id: 7, name: 'Judges', chapters: 21, testament: 'Old' },
  { id: 8, name: 'Ruth', chapters: 4, testament: 'Old' },
  { id: 9, name: '1 Samuel', chapters: 31, testament: 'Old' },
  { id: 10, name: '2 Samuel', chapters: 24, testament: 'Old' },
  { id: 11, name: '1 Kings', chapters: 22, testament: 'Old' },
  { id: 12, name: '2 Kings', chapters: 25, testament: 'Old' },
  { id: 13, name: '1 Chronicles', chapters: 29, testament: 'Old' },
  { id: 14, name: '2 Chronicles', chapters: 36, testament: 'Old' },
  { id: 15, name: 'Ezra', chapters: 10, testament: 'Old' },
  { id: 16, name: 'Nehemiah', chapters: 13, testament: 'Old' },
  { id: 17, name: 'Esther', chapters: 10, testament: 'Old' },

  // Old Testament - Poetry & Wisdom
  { id: 18, name: 'Job', chapters: 42, testament: 'Old' },
  { id: 19, name: 'Psalms', chapters: 150, testament: 'Old' },
  { id: 20, name: 'Proverbs', chapters: 31, testament: 'Old' },
  { id: 21, name: 'Ecclesiastes', chapters: 12, testament: 'Old' },
  { id: 22, name: 'Song of Songs', chapters: 8, testament: 'Old' },

  // Old Testament - Major Prophets
  { id: 23, name: 'Isaiah', chapters: 66, testament: 'Old' },
  { id: 24, name: 'Jeremiah', chapters: 52, testament: 'Old' },
  { id: 25, name: 'Lamentations', chapters: 5, testament: 'Old' },
  { id: 26, name: 'Ezekiel', chapters: 48, testament: 'Old' },
  { id: 27, name: 'Daniel', chapters: 12, testament: 'Old' },

  // Old Testament - Minor Prophets
  { id: 28, name: 'Hosea', chapters: 14, testament: 'Old' },
  { id: 29, name: 'Joel', chapters: 3, testament: 'Old' },
  { id: 30, name: 'Amos', chapters: 9, testament: 'Old' },
  { id: 31, name: 'Obadiah', chapters: 1, testament: 'Old' },
  { id: 32, name: 'Jonah', chapters: 4, testament: 'Old' },
  { id: 33, name: 'Micah', chapters: 7, testament: 'Old' },
  { id: 34, name: 'Nahum', chapters: 3, testament: 'Old' },
  { id: 35, name: 'Habakkuk', chapters: 3, testament: 'Old' },
  { id: 36, name: 'Zephaniah', chapters: 3, testament: 'Old' },
  { id: 37, name: 'Haggai', chapters: 2, testament: 'Old' },
  { id: 38, name: 'Zechariah', chapters: 14, testament: 'Old' },
  { id: 39, name: 'Malachi', chapters: 4, testament: 'Old' },

  // New Testament - Gospels
  { id: 40, name: 'Matthew', chapters: 28, testament: 'New' },
  { id: 41, name: 'Mark', chapters: 16, testament: 'New' },
  { id: 42, name: 'Luke', chapters: 24, testament: 'New' },
  { id: 43, name: 'John', chapters: 21, testament: 'New' },

  // New Testament - Acts & Paul's Letters
  { id: 44, name: 'Acts', chapters: 28, testament: 'New' },
  { id: 45, name: 'Romans', chapters: 16, testament: 'New' },
  { id: 46, name: '1 Corinthians', chapters: 16, testament: 'New' },
  { id: 47, name: '2 Corinthians', chapters: 13, testament: 'New' },
  { id: 48, name: 'Galatians', chapters: 6, testament: 'New' },
  { id: 49, name: 'Ephesians', chapters: 6, testament: 'New' },
  { id: 50, name: 'Philippians', chapters: 4, testament: 'New' },
  { id: 51, name: 'Colossians', chapters: 4, testament: 'New' },
  { id: 52, name: '1 Thessalonians', chapters: 5, testament: 'New' },
  { id: 53, name: '2 Thessalonians', chapters: 3, testament: 'New' },
  { id: 54, name: '1 Timothy', chapters: 6, testament: 'New' },
  { id: 55, name: '2 Timothy', chapters: 4, testament: 'New' },
  { id: 56, name: 'Titus', chapters: 3, testament: 'New' },
  { id: 57, name: 'Philemon', chapters: 1, testament: 'New' },

  // New Testament - Hebrews & James
  { id: 58, name: 'Hebrews', chapters: 13, testament: 'New' },
  { id: 59, name: 'James', chapters: 5, testament: 'New' },

  // New Testament - Peter, John, Jude
  { id: 60, name: '1 Peter', chapters: 5, testament: 'New' },
  { id: 61, name: '2 Peter', chapters: 3, testament: 'New' },
  { id: 62, name: '1 John', chapters: 5, testament: 'New' },
  { id: 63, name: '2 John', chapters: 1, testament: 'New' },
  { id: 64, name: '3 John', chapters: 1, testament: 'New' },
  { id: 65, name: 'Jude', chapters: 1, testament: 'New' },

  // New Testament - Revelation
  { id: 66, name: 'Revelation', chapters: 22, testament: 'New' },
];

export const MOTIVATIONAL_MESSAGES = [
  "Great job! Keep the momentum going! 🙌",
  "You're making progress! One book closer to completion! 📖",
  "Excellent! Your dedication is inspiring! 💪",
  "Well done! Stay focused on your goal! 🎯",
  "Amazing! Every chapter brings you closer! ✨",
  "You're doing great! Keep pushing forward! 🚀",
  "Fantastic! Your commitment is admirable! 👏",
  "Wonderful! You're building a great habit! 🌟",
  "Awesome! The finish line is in sight! 🏁",
  "Superb! Your consistency is paying off! 💎",
  "Incredible! You're unstoppable! 🔥",
  "Perfect! Keep this up and you'll finish! 🎉",
  "Outstanding! Your faith journey continues! ⛪",
  "Brilliant! Every step counts! 🌈",
  "Marvelous! You're a Bible reading champion! 👑",
  "Splendid! Your perseverance is beautiful! 🌺",
  "Phenomenal! You're crushing your goal! 💯",
  "Remarkable! The Word is transforming you! 📚",
  "Stellar! Your commitment is unwavering! ⭐",
  "Magnificent! Keep reading, keep growing! 🌱",
];
