import React from 'react';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

const QuestionCard = ({
  questionNumber,
  question,
  selectedOption = null,
  onSelectOption,
  disabled = false,
}) => {
  const questionText = question?.questionText ?? '';
  const options = Array.isArray(question?.options) ? question.options : ['', '', '', ''];
  const questionId = question?.id ?? question?.questionId ?? questionNumber ?? '';

  return (
    <div>
      <div className="text-lg font-semibold text-gray-900">
        <span className="mr-2 font-extrabold">Q{questionNumber ?? ''}.</span>
        {questionText ? (
          <span>{questionText}</span>
        ) : (
          <span className="inline-block align-middle">
            <span className="block h-5 w-[520px] max-w-full rounded bg-gray-100" />
          </span>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {options.slice(0, 4).map((opt, idx) => (
          <label
            key={idx}
            className={[
              'flex cursor-pointer items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 hover:border-gray-300',
              disabled ? 'cursor-not-allowed opacity-70' : '',
              selectedOption === OPTION_LABELS[idx] ? 'border-primary' : 'border-gray-200',
            ].join(' ')}
          >
            <input
              type="radio"
              name={`answer-${questionId}`}
              className="h-4 w-4 border-primary text-primary focus:ring-primary"
              checked={selectedOption === OPTION_LABELS[idx]}
              disabled={disabled}
              onChange={() => onSelectOption?.(OPTION_LABELS[idx])}
            />
            <span className="text-sm font-semibold text-gray-600">{OPTION_LABELS[idx]}.</span>
            {opt ? (
              <span className="text-sm text-gray-800">{opt}</span>
            ) : (
              <span className="h-4 w-2/3 rounded bg-gray-100" />
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;

