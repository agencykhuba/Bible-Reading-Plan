import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Loader2, BookOpen } from 'lucide-react';
import { fetchChapter, BIBLE_VERSIONS } from '@/services/bibleApi';
import type { BibleChapter } from '@/services/bibleApi';

interface BibleReaderProps {
  bookName: string;
  initialChapter?: number;
  initialVerse?: number;
}

export default function BibleReader({ bookName, initialChapter = 1, initialVerse }: BibleReaderProps) {
  const [version, setVersion] = useState('en-kjv');
  const [chapter, setChapter] = useState(initialChapter);
  const [chapterData, setChapterData] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highlightedVerse, setHighlightedVerse] = useState<number | null>(initialVerse || null);

  useEffect(() => {
    loadChapter();
  }, [version, bookName, chapter]);

  useEffect(() => {
    if (initialVerse && chapterData) {
      // Scroll to verse after data loads
      setTimeout(() => {
        const verseElement = document.getElementById(`verse-${initialVerse}`);
        if (verseElement) {
          verseElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [initialVerse, chapterData]);

  const loadChapter = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchChapter(version, bookName, chapter);
      setChapterData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load chapter');
      setChapterData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChapterChange = (newChapter: number) => {
    if (newChapter > 0) {
      setChapter(newChapter);
      setHighlightedVerse(null);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="border-b bg-slate-50/50">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="w-6 h-6 text-blue-600" />
              {bookName} {chapter}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              {BIBLE_VERSIONS[version]?.version || 'Bible Reading'}
            </CardDescription>
          </div>
          
          <div className="flex gap-2 items-center">
            <Select value={version} onValueChange={setVersion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(BIBLE_VERSIONS).map(([key, ver]) => (
                  <SelectItem key={key} value={key}>
                    {ver.version.replace(' (KJV)', '').replace(' (WEB)', '').replace(' (BSB)', '')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Chapter navigation */}
        <div className="flex gap-2 items-center mt-4 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleChapterChange(chapter - 1)}
            disabled={chapter <= 1 || loading}
          >
            ← Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600 font-medium">Chapter</span>
            <Input
              type="number"
              value={chapter}
              onChange={(e) => handleChapterChange(parseInt(e.target.value) || 1)}
              className="w-20 text-center"
              min={1}
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleChapterChange(chapter + 1)}
            disabled={loading}
          >
            Next →
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 md:p-8">
        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-slate-600">Loading chapter...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <Button onClick={loadChapter} variant="outline">
              Try Again
            </Button>
          </div>
        )}
        
        {!loading && !error && chapterData && (
          <div className="space-y-3 max-w-4xl mx-auto">
            {chapterData.data.map((verse) => {
              const verseNum = parseInt(verse.verse);
              const isHighlighted = highlightedVerse === verseNum;
              
              return (
                <div
                  key={verse.verse}
                  id={`verse-${verseNum}`}
                  className={`flex gap-4 p-3 rounded-lg transition-all duration-200 ${
                    isHighlighted
                      ? 'bg-yellow-50 border-l-4 border-yellow-400 shadow-sm'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm font-bold text-slate-400 min-w-[2.5rem] text-right select-none">
                    {verse.verse}
                  </span>
                  <p className="text-base md:text-lg leading-relaxed text-slate-800">
                    {verse.text}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
