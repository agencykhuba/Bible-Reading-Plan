interface ProgressTrackerProps {
  percentage: number;
  readCount: number;
  totalBooks: number;
}

export default function ProgressTracker({
  percentage,
  readCount,
  totalBooks,
}: ProgressTrackerProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900">Your Progress</h2>
        <span className="text-2xl font-bold text-blue-600">{percentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-3">
        <div
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="text-sm text-gray-600 text-center">
        <span className="font-semibold text-gray-900">{readCount}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalBooks}</span> books completed
      </p>

      {percentage === 100 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-green-700 font-semibold">🎉 Congratulations! You've completed the entire Bible! 🎉</p>
        </div>
      )}
    </div>
  );
}
