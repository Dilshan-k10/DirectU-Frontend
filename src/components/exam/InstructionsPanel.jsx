import React from 'react';

const InstructionsPanel = () => {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-gray-700">Instructions</div>
        <div className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
          i
        </div>
      </div>

      <div className="mt-3 space-y-2 text-sm text-gray-600">
        <div className="flex gap-2">
          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
          <p>Do not switch browser tabs.</p>
        </div>
        <div className="flex gap-2">
          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
          <p>Use “Next” &amp; “Previous” to navigate.</p>
        </div>
        <div className="flex gap-2">
          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
          <p>You cannot edit answers after submitting.</p>
        </div>
        <div className="flex gap-2">
          <div className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-400" />
          <p>Use the palette to jump to a question.</p>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPanel;

