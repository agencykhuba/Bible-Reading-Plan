import { useState } from 'react';
import { BIBLE_BOOKS } from '@/data/bibleBooks';
import BibleReader from '@/components/BibleReader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Book, Hash, FileText } from 'lucide-react';

type SelectionStep = 'book' | 'chapter' | 'verse';

interface Selection {
  book: typeof BIBLE_BOOKS[0] | null;
  chapter: number | null;
  verse: number | null;
}

export default function BibleReadingPage() {
  const [step, setStep] = useState<SelectionStep>('book');
  const [selection, setSelection] = useState<Selection>({
    book: null,
    chapter: null,
    verse: null,
  });
  const [showReader, setShowReader] = useState(false);

  const handleBookSelect = (book: typeof BIBLE_BOOKS[0]) => {
    setSelection({ book, chapter: null, verse: null });
    setStep('chapter');
  };

  const handleChapterSelect = (chapter: number) => {
    setSelection(prev => ({ ...prev, chapter }));
    setStep('verse');
  };

  const handleVerseSelect = (verse: number | 'full') => {
    if (verse === 'full') {
      setSelection(prev => ({ ...prev, verse: null }));
    } else {
      setSelection(prev => ({ ...prev, verse }));
    }
    setShowReader(true);
  };

  const handleBack = () => {
    if (showReader) {
      setShowReader(false);
      setStep('verse');
    } else if (step === 'verse') {
      setSelection(prev => ({ ...prev, chapter: null, verse: null }));
      setStep('chapter');
    } else if (step === 'chapter') {
      setSelection(prev => ({ book: null, chapter: null, verse: null }));
      setStep('book');
    }
  };

  const handleReset = () => {
    setSelection({ book: null, chapter: null, verse: null });
    setStep('book');
    setShowReader(false);
  };

  // Breadcrumb display
  const getBreadcrumb = () => {
    const parts = [];
    if (selection.book) parts.push(selection.book.name);
    if (selection.chapter) parts.push(`Chapter ${selection.chapter}`);
    if (selection.verse) parts.push(`Verse ${selection.verse}`);
    return parts.join(' / ');
  };

  // If showing reader
  if (showReader && selection.book && selection.chapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <Button
              onClick={handleBack}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              size="sm"
            >
              Start Over
            </Button>
          </div>
          
          <BibleReader
            bookName={selection.book.name}
            initialChapter={selection.chapter}
            initialVerse={selection.verse || undefined}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                Read the Bible
              </h1>
              {getBreadcrumb() && (
                <p className="text-sm text-slate-600 mt-1">{getBreadcrumb()}</p>
              )}
            </div>
            {step !== 'book' && (
              <Button
                onClick={handleBack}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Step 1: Select Book */}
        {step === 'book' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Book className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Select a Book
              </h2>
              <p className="text-slate-600">
                Choose from the 66 books of the Bible
              </p>
            </div>

            {/* Old Testament */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <span className="text-blue-600">📖</span> Old Testament
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {BIBLE_BOOKS.filter(book => book.id <= 39).map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleBookSelect(book)}
                    className="p-4 text-left rounded-lg border-2 border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:shadow-md group"
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 mb-1">
                      {book.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* New Testament */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <span className="text-blue-600">✨</span> New Testament
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {BIBLE_BOOKS.filter(book => book.id > 39).map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleBookSelect(book)}
                    className="p-4 text-left rounded-lg border-2 border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 hover:shadow-md group"
                  >
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 mb-1">
                      {book.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {book.chapters} {book.chapters === 1 ? 'chapter' : 'chapters'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Chapter */}
        {step === 'chapter' && selection.book && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Hash className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Select a Chapter
              </h2>
              <p className="text-slate-600">
                {selection.book.name} has {selection.book.chapters} {selection.book.chapters === 1 ? 'chapter' : 'chapters'}
              </p>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3 max-w-4xl mx-auto">
              {Array.from({ length: selection.book.chapters }, (_, i) => i + 1).map((chapter) => (
                <button
                  key={chapter}
                  onClick={() => handleChapterSelect(chapter)}
                  className="aspect-square flex items-center justify-center rounded-lg border-2 border-slate-200 bg-white hover:border-green-500 hover:bg-green-50 transition-all duration-200 hover:shadow-md font-semibold text-lg hover:scale-105"
                >
                  {chapter}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select Verse or Full Chapter */}
        {step === 'verse' && selection.book && selection.chapter && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                <FileText className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Choose Reading Mode
              </h2>
              <p className="text-slate-600">
                Read the full chapter or jump to a specific verse
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              {/* Full Chapter Option */}
              <Card
                className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-purple-500"
                onClick={() => handleVerseSelect('full')}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="w-5 h-5 text-purple-600" />
                    Read Full Chapter
                  </CardTitle>
                  <CardDescription>
                    Read {selection.book.name} Chapter {selection.chapter} from beginning to end
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Specific Verse Option */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg mb-4">Jump to Specific Verse</CardTitle>
                  <CardDescription>Select a verse number to start reading from:</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-8 gap-2">
                    {/* Show first 50 verses (most chapters don't exceed this) */}
                    {Array.from({ length: 50 }, (_, i) => i + 1).map((verse) => (
                      <button
                        key={verse}
                        onClick={() => handleVerseSelect(verse)}
                        className="aspect-square flex items-center justify-center rounded-md border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all text-sm font-medium hover:scale-105"
                      >
                        {verse}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 mt-4 text-center">
                    Note: Some chapters may have fewer verses
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
