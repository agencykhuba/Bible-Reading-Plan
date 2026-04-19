import { useState, useCallback } from 'react';
import { Link } from 'wouter';
import { BIBLE_BOOKS } from '@/data/bibleBooks';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import BibleBookItem from '@/components/BibleBookItem';
import ProgressTracker from '@/components/ProgressTracker';
import MotivationalMessage from '@/components/MotivationalMessage';
import { Button } from '@/components/ui/button';
import { BookOpen, RotateCcw, BookOpenCheck } from 'lucide-react';

export default function Home() {
  const {
    toggleBook,
    isBookRead,
    getCompletedDate,
    getProgressPercentage,
    getReadCount,
    resetProgress,
  } = useReadingProgress();

  const [showMotivation, setShowMotivation] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleToggleBook = useCallback(
    (bookId: number) => {
      toggleBook(bookId);
      setShowMotivation(true);
    },
    [toggleBook]
  );

  const handleResetProgress = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
    }
  }, [resetProgress]);

  const percentage = getProgressPercentage(BIBLE_BOOKS.length);
  const readCount = getReadCount();

  const filteredBooks = BIBLE_BOOKS.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">Bible Reading Tracker</h1>
              </div>
              <p className="text-gray-600">Track your journey through all 66 books of the Bible</p>
            </div>
            
            <Link href="/read">
              <Button className="gap-2" size="lg">
                <BookOpenCheck className="w-5 h-5" />
                Read the Bible
              </Button>
            </Link>
          </div>
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

        {/* Search and Controls */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleResetProgress}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Progress
          </Button>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <BibleBookItem
              key={book.id}
              book={book}
              isRead={isBookRead(book.id)}
              completedDate={getCompletedDate(book.id)}
              onToggle={handleToggleBook}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No books found matching "{searchTerm}"</p>
          </div>
        )}
      </main>

      {/* Motivational Message */}
      <MotivationalMessage
        isVisible={showMotivation}
        onClose={() => setShowMotivation(false)}
      />
    </div>
  );
}
