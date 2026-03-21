import React from 'react';

const TimerBox = () => {
  return (
    <div className="flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
      <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
      <span>24:25 Remaining</span>
    </div>
  );
};

export default TimerBox;

