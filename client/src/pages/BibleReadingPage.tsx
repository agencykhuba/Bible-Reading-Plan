import { useState } from 'react';
import { BIBLE_BOOKS } from '@/data/bibleBooks';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import BibleReader from '@/components/BibleReader';
import BibleBookItem from '@/components/BibleBookItem';
import ProgressTracker from '@/components/ProgressTracker';
import { Button } from '@/components/ui/button';
import { BookOpen, List, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function BibleReadingPage() {
  const {
    toggleBook,
    isBookRead,
    getCompletedDate,
    getProgressPercentage,
    getReadCount,
  } = useReadingProgress();

  const [selectedBook, setSelectedBook] = useState<{ name: string; chapters: number } | null>(null);
  const [showList, setShowList] = useState(true);

  const percentage = getProgressPercentage(BIBLE_BOOKS.length);
  const readCount = getReadCount();

  if (selectedBook && !showList) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setShowList(true)}
            variant="ghost"
            className="mb-4 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Book List
          </Button>
          
          <BibleReader bookName={selectedBook.name} initialChapter={1} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Bible Reading Tracker</h1>
          </div>
          <p className="text-gray-600">Track your journey and read all 66 books of the Bible</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Tracker */}
        <ProgressTracker
          percentage={percentage}
          readCount={readCount}
          totalBooks={BIBLE_BOOKS.length}
        />

        {/* Books Grid */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <List className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Select a Book to Read</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BIBLE_BOOKS.map((book) => (
              <div
                key={book.id}
                onClick={() => {
                  setSelectedBook(book);
                  setShowList(false);
                }}
                className="cursor-pointer"
              >
                <BibleBookItem
                  book={book}
                  isRead={isBookRead(book.id)}
                  completedDate={getCompletedDate(book.id)}
                  onToggle={() => toggleBook(book.id)}
                />
              </div>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
