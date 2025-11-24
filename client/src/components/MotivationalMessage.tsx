import { useEffect, useState } from 'react';
import { MOTIVATIONAL_MESSAGES } from '@/data/bibleBooks';

interface MotivationalMessageProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MotivationalMessage({
  isVisible,
  onClose,
}: MotivationalMessageProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isVisible) {
      const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
      setMessage(MOTIVATIONAL_MESSAGES[randomIndex]);

      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-gray-900 px-6 py-4 rounded-lg shadow-lg max-w-sm">
        <p className="text-center font-semibold text-sm">{message}</p>
      </div>
    </div>
  );
}
