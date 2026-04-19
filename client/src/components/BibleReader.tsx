import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Loader2, BookOpen } from 'lucide-react';
import { fetchChapter, BIBLE_VERSIONS, BOOK_NAME_MAP } from '@/services/bibleApi';
import type { BibleChapter } from '@/services/bibleApi';

interface BibleReaderProps {
  bookName: string;
  initialChapter?: number;
}

export default function BibleReader({ bookName, initialChapter = 1 }: BibleReaderProps) {
  const [version, setVersion] = useState('en-kjv');
  const [chapter, setChapter] = useState(initialChapter);
  const [chapterData, setChapterData] = useState<BibleChapter | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadChapter();
  }, [version, bookName, chapter]);

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
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {bookName} {chapter}
            </CardTitle>
            <CardDescription>
              {BIBLE_VERSIONS[version]?.version || 'Bible Reading'}
            </CardDescription>
          </div>
          
          <div className="flex gap-2 items-center">
            <Select value={version} onValueChange={setVersion}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(BIBLE_VERSIONS).map(([key, ver]) => (
                  <SelectItem key={key} value={key}>
                    {ver.version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Chapter navigation */}
        <div className="flex gap-2 items-center mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleChapterChange(chapter - 1)}
            disabled={chapter <= 1 || loading}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Chapter</span>
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
            Next
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <Button onClick={loadChapter} variant="outline" className="mt-4">
              Try Again
            </Button>
          </div>
        )}
        
        {!loading && !error && chapterData && (
          <div className="space-y-4">
            {chapterData.data.map((verse) => (
              <div key={verse.verse} className="flex gap-3 group hover:bg-accent/50 p-2 rounded-lg transition-colors">
                <span className="text-sm font-semibold text-muted-foreground min-w-[2rem] text-right">
                  {verse.verse}
                </span>
                <p className="text-base leading-relaxed">{verse.text}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
