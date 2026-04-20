import { useState, useCallback } from 'react';
import { Link } from 'wouter';
import { BIBLE_BOOKS } from '@/data/bibleBooks';
import { useReadingProgress } from '@/hooks/useReadingProgress';
import BibleBookItem from '@/components/BibleBookItem';
import ProgressTracker from '@/components/ProgressTracker';
import MotivationalMessage from '@/components/MotivationalMessage';
import VerseOfTheDay from '@/components/VerseOfTheDay';
import HebrewTermOfTheDay from '@/components/HebrewTermOfTheDay';
import GreekTermOfTheDay from '@/components/GreekTermOfTheDay';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, RotateCcw, BookOpenCheck, Sparkles } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('tracker');

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 rounded-lg bg-blue-100">
                  <BookOpen className="w-7 h-7 text-blue-600" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Bible Reading Tracker
                </h1>
              </div>
              <p className="text-slate-600 text-sm md:text-base ml-14">
                Track your journey through all 66 books of the Bible
              </p>
            </div>
            
            <Link href="/read">
              <Button className="gap-2 shadow-lg hover:shadow-xl transition-shadow" size="lg">
                <BookOpenCheck className="w-5 h-5" />
                Read the Bible
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="tracker" className="gap-2">
              <BookOpen className="w-4 h-4" />
              Reading Tracker
            </TabsTrigger>
            <TabsTrigger value="daily" className="gap-2">
              <Sparkles className="w-4 h-4" />
              Daily Features
            </TabsTrigger>
          </TabsList>

          {/* Reading Tracker Tab */}
          <TabsContent value="tracker" className="space-y-6">
            {/* Progress Tracker */}
            <ProgressTracker
              percentage={percentage}
              readCount={readCount}
              totalBooks={BIBLE_BOOKS.length}
            />

            {/* Search and Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <input
                type="text"
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <Button
                onClick={handleResetProgress}
                variant="outline"
                size="default"
                className="gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Progress
              </Button>
            </div>

            {/* Books Grid */}
            <div>
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <span className="text-blue-600">📖</span> Old Testament (39 books)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {filteredBooks.filter(book => book.id <= 39).map((book) => (
                  <BibleBookItem
                    key={book.id}
                    book={book}
                    isRead={isBookRead(book.id)}
                    completedDate={getCompletedDate(book.id)}
                    onToggle={handleToggleBook}
                  />
                ))}
              </div>

              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
                <span className="text-blue-600">✨</span> New Testament (27 books)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBooks.filter(book => book.id > 39).map((book) => (
                  <BibleBookItem
                    key={book.id}
                    book={book}
                    isRead={isBookRead(book.id)}
                    completedDate={getCompletedDate(book.id)}
                    onToggle={handleToggleBook}
                  />
                ))}
              </div>
            </div>

            {/* Empty State */}
            {filteredBooks.length === 0 && (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
                  <BookOpen className="w-10 h-10 text-slate-400" />
                </div>
                <p className="text-slate-500 text-lg">No books found matching "{searchTerm}"</p>
                <Button
                  onClick={() => setSearchTerm('')}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Daily Features Tab */}
          <TabsContent value="daily" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Daily Inspiration</h2>
              <p className="text-slate-600">
                Discover something new from God's Word every day
              </p>
            </div>

            {/* Verse of the Day */}
            <VerseOfTheDay />

            {/* Terms Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <HebrewTermOfTheDay />
              <GreekTermOfTheDay />
            </div>

            {/* Call to Action */}
            <div className="text-center py-8">
              <Link href="/read">
                <Button size="lg" className="gap-2 shadow-lg">
                  <BookOpenCheck className="w-5 h-5" />
                  Start Reading Today
                </Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Motivational Message */}
      <MotivationalMessage
        isVisible={showMotivation}
        onClose={() => setShowMotivation(false)}
      />
    </div>
  );
}
