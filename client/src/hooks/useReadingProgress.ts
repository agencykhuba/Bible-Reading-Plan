import { useState, useEffect } from 'react';

export interface BookProgress {
  bookId: number;
  isRead: boolean;
  completedDate?: string; // ISO date string
}

const STORAGE_KEY = 'bible-reading-progress';

export function useReadingProgress() {
  const [progress, setProgress] = useState<Map<number, BookProgress>>(() => {
    // Initialize from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        return new Map(data);
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error);
    }
    return new Map();
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    try {
      const data = Array.from(progress.entries());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
    }
  }, [progress]);

  const toggleBook = (bookId: number) => {
    setProgress((prev) => {
      const newProgress = new Map(prev);
      const current = newProgress.get(bookId);

      if (current?.isRead) {
        // Unmark as read
        newProgress.set(bookId, { bookId, isRead: false });
      } else {
        // Mark as read with current date
        const today = new Date();
        const completedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        newProgress.set(bookId, { bookId, isRead: true, completedDate });
      }

      return newProgress;
    });
  };

  const isBookRead = (bookId: number): boolean => {
    return progress.get(bookId)?.isRead ?? false;
  };

  const getCompletedDate = (bookId: number): string | undefined => {
    return progress.get(bookId)?.completedDate;
  };

  const getProgressPercentage = (totalBooks: number): number => {
    const readBooks = Array.from(progress.values()).filter((p) => p.isRead).length;
    return Math.round((readBooks / totalBooks) * 100);
  };

  const getReadCount = (): number => {
    return Array.from(progress.values()).filter((p) => p.isRead).length;
  };

  const resetProgress = () => {
    setProgress(new Map());
  };

  return {
    progress,
    toggleBook,
    isBookRead,
    getCompletedDate,
    getProgressPercentage,
    getReadCount,
    resetProgress,
  };
}
