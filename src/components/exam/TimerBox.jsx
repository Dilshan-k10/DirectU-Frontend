import React from 'react';

const TimerBox = ({ secondsLeft }) => {
  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const isWarning = secondsLeft <= 300; // ≤5 min
  const isDanger  = secondsLeft <= 60;  // ≤1 min

  const colors = isDanger
    ? 'bg-red-50 text-red-600'
    : isWarning
    ? 'bg-yellow-50 text-yellow-600'
    : 'bg-green-50 text-green-700';

  const dotColor = isDanger ? 'bg-red-500' : isWarning ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${colors}`}>
      <span className={`inline-block h-2 w-2 rounded-full ${dotColor}`} />
      <span>{mins}:{secs} Remaining</span>
    </div>
  );
};

export default TimerBox;

