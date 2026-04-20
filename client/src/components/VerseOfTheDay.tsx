import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Share2 } from 'lucide-react';

interface VerseOfDay {
  reference: string;
  text: string;
  book: string;
  chapter: number;
  verse: number;
}

// Curated collection of inspiring verses
const FEATURED_VERSES: VerseOfDay[] = [
  {
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    book: "John",
    chapter: 3,
    verse: 16
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ which strengtheneth me.",
    book: "Philippians",
    chapter: 4,
    verse: 13
  },
  {
    reference: "Jeremiah 29:11",
    text: "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
    book: "Jeremiah",
    chapter: 29,
    verse: 11
  },
  {
    reference: "Psalm 23:1",
    text: "The Lord is my shepherd; I shall not want.",
    book: "Psalms",
    chapter: 23,
    verse: 1
  },
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    book: "Proverbs",
    chapter: 3,
    verse: 5
  },
  {
    reference: "Romans 8:28",
    text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    book: "Romans",
    chapter: 8,
    verse: 28
  },
  {
    reference: "Isaiah 40:31",
    text: "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    book: "Isaiah",
    chapter: 40,
    verse: 31
  },
  {
    reference: "Matthew 6:33",
    text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    book: "Matthew",
    chapter: 6,
    verse: 33
  },
  {
    reference: "Joshua 1:9",
    text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest.",
    book: "Joshua",
    chapter: 1,
    verse: 9
  },
  {
    reference: "Psalm 46:1",
    text: "God is our refuge and strength, a very present help in trouble.",
    book: "Psalms",
    chapter: 46,
    verse: 1
  }
];

export default function VerseOfTheDay() {
  const [verse, setVerse] = useState<VerseOfDay | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getVerseOfTheDay = () => {
    // Use date as seed for consistent daily verse
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const index = dayOfYear % FEATURED_VERSES.length;
    return FEATURED_VERSES[index];
  };

  const getRandomVerse = () => {
    const randomIndex = Math.floor(Math.random() * FEATURED_VERSES.length);
    return FEATURED_VERSES[randomIndex];
  };

  useEffect(() => {
    setVerse(getVerseOfTheDay());
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setVerse(getRandomVerse());
      setIsRefreshing(false);
    }, 500);
  };

  const handleShare = () => {
    if (verse && navigator.share) {
      navigator.share({
        title: 'Verse of the Day',
        text: `"${verse.text}" - ${verse.reference}`,
      }).catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
        alert('Verse copied to clipboard!');
      });
    } else if (verse) {
      navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
      alert('Verse copied to clipboard!');
    }
  };

  if (!verse) return null;

  return (
    <Card className="overflow-hidden border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-100">
              <Sparkles className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Verse of the Day</CardTitle>
              <CardDescription className="text-sm">{verse.reference}</CardDescription>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="h-8 w-8 p-0"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="text-base md:text-lg leading-relaxed text-slate-700 italic border-l-4 border-blue-400 pl-4">
          "{verse.text}"
        </blockquote>
      </CardContent>
    </Card>
  );
}
