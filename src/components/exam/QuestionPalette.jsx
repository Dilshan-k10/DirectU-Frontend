import React, { useMemo } from 'react';

const QuestionPalette = ({
  total = 10,
  current = 1,
  answeredNumbers = [],
  markedNumbers = [],
  onSelectQuestion,
}) => {
  const numbers = useMemo(
    () => Array.from({ length: total }, (_, i) => i + 1),
    [total],
  );

  const answeredSet = useMemo(() => new Set(answeredNumbers), [answeredNumbers]);
  const markedSet = useMemo(() => new Set(markedNumbers), [markedNumbers]);

  const getStatus = (n) => {
    if (n === current) return 'current';
    // Marked should visually stand out even if it was answered.
    if (markedSet.has(n)) return 'marked';
    if (answeredSet.has(n)) return 'answered';
    return 'unvisited';
  };

  const statusStyles = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-emerald-300 text-emerald-900 border-emerald-300';
      case 'current':
        return 'bg-white text-primary border-primary';
      case 'marked':
        return 'bg-amber-300 text-amber-900 border-amber-300';
      default:
        return 'bg-gray-200 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="text-sm font-semibold text-gray-700">Question Palette</div>

      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-white" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-200" />
          <span>Unvisited</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span>Marked</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2">
        {numbers.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onSelectQuestion?.(n - 1)}
            className={[
              'w-6 h-6 rounded-full border text-xs font-semibold transition-colors justify-self-center',
              statusStyles(getStatus(n)),
              'hover:opacity-90',
            ].join(' ')}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionPalette;

