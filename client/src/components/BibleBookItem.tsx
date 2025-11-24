import { Checkbox } from '@/components/ui/checkbox';
import { BibleBook } from '@/data/bibleBooks';
import { format } from 'date-fns';

interface BibleBookItemProps {
  book: BibleBook;
  isRead: boolean;
  completedDate?: string;
  onToggle: (bookId: number) => void;
}

export default function BibleBookItem({
  book,
  isRead,
  completedDate,
  onToggle,
}: BibleBookItemProps) {
  const formattedDate = completedDate
    ? format(new Date(completedDate), 'MMM dd, yyyy')
    : null;

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
        isRead
          ? 'bg-green-50 border-green-200'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <Checkbox
        checked={isRead}
        onCheckedChange={() => onToggle(book.id)}
        className="h-5 w-5"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className={`font-semibold text-sm ${
              isRead ? 'text-green-700 line-through' : 'text-gray-900'
            }`}
          >
            {book.name}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {book.chapters} chapters
          </span>
        </div>
        {isRead && formattedDate && (
          <p className="text-xs text-green-600 mt-1">✓ Completed on {formattedDate}</p>
        )}
      </div>
    </div>
  );
}
