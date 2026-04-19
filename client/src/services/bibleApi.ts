/**
 * Bible API Service
 * Provides access to Bible verses and chapters using the free Bible API
 * https://github.com/wldeh/bible-api
 */

const BIBLE_API_BASE = "https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles";

export interface BibleVerse {
  book: string;
  chapter: string;
  verse: string;
  text: string;
}

export interface BibleChapter {
  data: BibleVerse[];
}

export interface BibleVersion {
  id: string;
  version: string;
  description: string;
  scope: string;
  language: {
    name: string;
    code: string;
    level: string;
  };
}

/**
 * Available Bible versions (focusing on popular English translations)
 */
export const BIBLE_VERSIONS: Record<string, BibleVersion> = {
  "en-kjv": {
    id: "en-kjv",
    version: "King James Version (KJV)",
    description: "King James Version - 1769 standardized text",
    scope: "Complete Bible",
    language: { name: "English", code: "en", level: "Common" }
  },
  "en-web": {
    id: "en-web",
    version: "World English Bible (WEB)",
    description: "World English Bible - American Edition, Public Domain",
    scope: "Complete Bible",
    language: { name: "English", code: "en", level: "Common" }
  },
  "en-bsb": {
    id: "en-bsb",
    version: "Berean Study Bible (BSB)",
    description: "Berean Study Bible - Modern readable translation",
    scope: "Complete Bible",
    language: { name: "English", code: "en", level: "Common" }
  }
};

/**
 * Book name mappings - standardized names to API format
 */
export const BOOK_NAME_MAP: Record<string, string> = {
  "Genesis": "genesis",
  "Exodus": "exodus",
  "Leviticus": "leviticus",
  "Numbers": "numbers",
  "Deuteronomy": "deuteronomy",
  "Joshua": "joshua",
  "Judges": "judges",
  "Ruth": "ruth",
  "1 Samuel": "1-samuel",
  "2 Samuel": "2-samuel",
  "1 Kings": "1-kings",
  "2 Kings": "2-kings",
  "1 Chronicles": "1-chronicles",
  "2 Chronicles": "2-chronicles",
  "Ezra": "ezra",
  "Nehemiah": "nehemiah",
  "Esther": "esther",
  "Job": "job",
  "Psalms": "psalms",
  "Proverbs": "proverbs",
  "Ecclesiastes": "ecclesiastes",
  "Song of Solomon": "song-of-songs",
  "Isaiah": "isaiah",
  "Jeremiah": "jeremiah",
  "Lamentations": "lamentations",
  "Ezekiel": "ezekiel",
  "Daniel": "daniel",
  "Hosea": "hosea",
  "Joel": "joel",
  "Amos": "amos",
  "Obadiah": "obadiah",
  "Jonah": "jonah",
  "Micah": "micah",
  "Nahum": "nahum",
  "Habakkuk": "habakkuk",
  "Zephaniah": "zephaniah",
  "Haggai": "haggai",
  "Zechariah": "zechariah",
  "Malachi": "malachi",
  "Matthew": "matthew",
  "Mark": "mark",
  "Luke": "luke",
  "John": "john",
  "Acts": "acts",
  "Romans": "romans",
  "1 Corinthians": "1-corinthians",
  "2 Corinthians": "2-corinthians",
  "Galatians": "galatians",
  "Ephesians": "ephesians",
  "Philippians": "philippians",
  "Colossians": "colossians",
  "1 Thessalonians": "1-thessalonians",
  "2 Thessalonians": "2-thessalonians",
  "1 Timothy": "1-timothy",
  "2 Timothy": "2-timothy",
  "Titus": "titus",
  "Philemon": "philemon",
  "Hebrews": "hebrews",
  "James": "james",
  "1 Peter": "1-peter",
  "2 Peter": "2-peter",
  "1 John": "1-john",
  "2 John": "2-john",
  "3 John": "3-john",
  "Jude": "jude",
  "Revelation": "revelation"
};

/**
 * Fetch a specific verse from the Bible
 */
export async function fetchVerse(
  version: string,
  bookName: string,
  chapter: number,
  verse: number
): Promise<BibleVerse> {
  const apiBookName = BOOK_NAME_MAP[bookName] || bookName.toLowerCase();
  const url = `${BIBLE_API_BASE}/${version}/books/${apiBookName}/chapters/${chapter}/verses/${verse}.json`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch verse: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
}

/**
 * Fetch an entire chapter from the Bible
 */
export async function fetchChapter(
  version: string,
  bookName: string,
  chapter: number
): Promise<BibleChapter> {
  const apiBookName = BOOK_NAME_MAP[bookName] || bookName.toLowerCase();
  const url = `${BIBLE_API_BASE}/${version}/books/${apiBookName}/chapters/${chapter}.json`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch chapter: ${response.statusText}`);
  }
  
  const data = await response.json();
  return data;
}

/**
 * Fetch a range of verses from a chapter
 */
export async function fetchVerseRange(
  version: string,
  bookName: string,
  chapter: number,
  startVerse: number,
  endVerse: number
): Promise<BibleVerse[]> {
  const chapterData = await fetchChapter(version, bookName, chapter);
  return chapterData.data.filter(
    (v) => {
      const verseNum = parseInt(v.verse);
      return verseNum >= startVerse && verseNum <= endVerse;
    }
  );
}
