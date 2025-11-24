import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReadingProgress } from './useReadingProgress';

describe('useReadingProgress', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty progress', () => {
    const { result } = renderHook(() => useReadingProgress());

    expect(result.current.getReadCount()).toBe(0);
    expect(result.current.getProgressPercentage(66)).toBe(0);
  });

  it('should toggle a book as read', () => {
    const { result } = renderHook(() => useReadingProgress());

    act(() => {
      result.current.toggleBook(1);
    });

    expect(result.current.isBookRead(1)).toBe(true);
    expect(result.current.getReadCount()).toBe(1);
  });

  it('should set completion date when marking a book as read', () => {
    const { result } = renderHook(() => useReadingProgress());

    act(() => {
      result.current.toggleBook(1);
    });

    const completedDate = result.current.getCompletedDate(1);
    expect(completedDate).toBeDefined();
    expect(completedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should toggle a book as unread', () => {
    const { result } = renderHook(() => useReadingProgress());

    act(() => {
      result.current.toggleBook(1);
    });

    expect(result.current.isBookRead(1)).toBe(true);

    act(() => {
      result.current.toggleBook(1);
    });

    expect(result.current.isBookRead(1)).toBe(false);
  });

  it('should calculate progress percentage correctly', () => {
    const { result } = renderHook(() => useReadingProgress());

    act(() => {
      result.current.toggleBook(1);
      result.current.toggleBook(2);
    });

    const percentage = result.current.getProgressPercentage(66);
    expect(percentage).toBe(3);
  });

  it('should persist progress to localStorage', () => {
    const { result } = renderHook(() => useReadingProgress());

    act(() => {
      result.current.toggleBook(1);
    });

    const stored = localStorage.getItem('bible-reading-progress');
    expect(stored).toBeDefined();
    expect(stored).toContain('1');
  });

  it('should reset all progress', () => {
    const { result } = renderHook(() => useReadingProgress());

    act(() => {
      result.current.toggleBook(1);
      result.current.toggleBook(2);
      result.current.toggleBook(3);
    });

    expect(result.current.getReadCount()).toBe(3);

    act(() => {
      result.current.resetProgress();
    });

    expect(result.current.getReadCount()).toBe(0);
    expect(result.current.isBookRead(1)).toBe(false);
    expect(result.current.isBookRead(2)).toBe(false);
    expect(result.current.isBookRead(3)).toBe(false);
  });

  it('should handle multiple book toggles correctly', () => {
    const { result } = renderHook(() => useReadingProgress());

    act(() => {
      for (let i = 1; i <= 10; i++) {
        result.current.toggleBook(i);
      }
    });

    expect(result.current.getReadCount()).toBe(10);
    expect(result.current.getProgressPercentage(66)).toBe(15);
  });
});
