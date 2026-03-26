import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '../api/axiosClient';
import QuestionCard from '../components/exam/QuestionCard';
import QuestionPalette from '../components/exam/QuestionPalette';
import InstructionsPanel from '../components/exam/InstructionsPanel';
import TimerBox from '../components/exam/TimerBox';
import { calculateExamScore, fetchExamQuestions, submitExamAnswers } from '../services/examService';

const ExamPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const degreeId = "deg_cs_001"; // For testing, hardcode a degreeId

  const degreeId = useMemo(() => {
    return location.state?.degreeId || new URLSearchParams(location.search).get('degreeId') || '';
  }, [location]);

  const studentId = useMemo(() => {
    const user = getUser();
    return user?.id ?? user?._id ?? '';
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersByQuestionId, setAnswersByQuestionId] = useState({});

  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const EXAM_DURATION = 30 * 60; // 30 minutes in seconds
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION);
  const timerRef = React.useRef(null);
  const autoSubmitRef = React.useRef(false);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      if (!degreeId) {
        if (!alive) return;
        setError('Missing degreeId. Start the exam from the programme page.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');

        const payload = await fetchExamQuestions(degreeId);
        const apiQuestions = payload?.data?.questions ?? [];

        const normalized = apiQuestions.map((q) => ({
          id: q.id,
          questionText: q.questionText,
          options: [q.optionA, q.optionB, q.optionC, q.optionD],
        }));

        if (!alive) return;
        setQuestions(normalized);
        setCurrentQuestionIndex(0);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load exam questions.');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [degreeId]);

  const total = questions.length;
  const currentQuestion = useMemo(
    () => questions[currentQuestionIndex] ?? null,
    [questions, currentQuestionIndex],
  );

  const selectedOption = useMemo(() => {
    if (!currentQuestion) return null;
    return answersByQuestionId[currentQuestion.id] ?? null;
  }, [answersByQuestionId, currentQuestion]);

  const answeredNumbers = useMemo(() => {
    return questions.reduce((acc, q, idx) => {
      if (answersByQuestionId[q.id]) acc.push(idx + 1);
      return acc;
    }, []);
  }, [questions, answersByQuestionId]);

  const progressPercent = total ? ((currentQuestionIndex + 1) / total) * 100 : 0;

  const handleSelectOption = (optionLetter) => {
    if (!currentQuestion || completed || submitting) return;
    setAnswersByQuestionId((prev) => ({
      ...prev,
      [currentQuestion.id]: optionLetter,
    }));
  };

  const handleSelectQuestion = (index) => {
    if (completed || submitting) return;
    if (index < 0 || index >= total) return;
    setCurrentQuestionIndex(index);
  };

  const handlePrevious = () => {
    if (completed || submitting) return;
    setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
  };

  // Start countdown on mount, auto-submit when time runs out
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          if (!autoSubmitRef.current) {
            autoSubmitRef.current = true;
            handleSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop timer once exam is done
  useEffect(() => {
    if (completed || submitting) clearInterval(timerRef.current);
  }, [completed, submitting]);

  const handleSubmit = async () => {
    if (completed || submitting) return;

    if (!studentId) {
      setError('Not authenticated. Please login again.');
      return;
    }
    if (!degreeId) {
      setError('Missing degreeId.');
      return;
    }

    const answers = Object.entries(answersByQuestionId)
      .filter(([, v]) => v)
      .map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer: String(selectedAnswer).toUpperCase(),
      }));

    if (!answers.length) {
      setError('Please select at least one answer before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');

      await submitExamAnswers({ studentId, degreeId, answers });
      await calculateExamScore({ studentId, degreeId });

      setCompleted(true);
      navigate('/exam-result');
    } catch (e) {
      setError(e?.message || 'Failed to submit exam answers.');
    } finally {
      setSubmitting(false);
    }
  };

  const isLastQuestion = total > 0 && currentQuestionIndex === total - 1;

  return (
    <div className="bg-brand-dark min-h-screen">
      <div className="mx-auto w-full max-w-[1400px] px-10 py-10 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="rounded-xl bg-gray-100 p-10">
          <div className="grid grid-cols-12 gap-6">
            {/* Left palette */}
            <aside className="col-span-12 lg:col-span-2">
              <QuestionPalette
                total={total || 10}
                current={currentQuestionIndex + 1}
                answeredNumbers={answeredNumbers}
                markedNumbers={[]}
                onSelectQuestion={handleSelectQuestion}
              />
            </aside>

            {/* Center question */}
            <section className="col-span-12 lg:col-span-8">
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-700">
                    {total
                      ? `Question ${currentQuestionIndex + 1} of ${total}`
                      : "Question"}
                  </div>
                  <TimerBox secondsLeft={secondsLeft} />
                </div>

                {/* Progress line */}
                <div className="mt-3 h-1.5 w-40 max-w-full rounded-full bg-gray-200">
                  <div
                    className="h-1.5 rounded-full bg-accent"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="mt-5">
                  {loading ? (
                    <div className="flex h-64 items-center justify-center text-sm font-semibold text-gray-600">
                      Loading questions...
                    </div>
                  ) : error ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      {error}
                    </div>
                  ) : completed ? (
                    <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
                      Exam submitted successfully.
                    </div>
                  ) : currentQuestion ? (
                    <QuestionCard
                      questionNumber={currentQuestionIndex + 1}
                      question={currentQuestion}
                      selectedOption={selectedOption}
                      disabled={submitting}
                      onSelectOption={handleSelectOption}
                    />
                  ) : (
                    <div className="text-sm text-gray-600">
                      No questions found.
                    </div>
                  )}
                </div>

                <div className="mt-10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={
                      completed || submitting || currentQuestionIndex === 0
                    }
                    className="flex items-center gap-2 rounded-lg border border-gray-400 bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="text-base leading-none">&lsaquo;</span>
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={
                      isLastQuestion
                        ? handleSubmit
                        : () => setCurrentQuestionIndex((p) => p + 1)
                    }
                    disabled={completed || submitting || total === 0}
                    className="flex items-center gap-2 rounded-lg bg-primary px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLastQuestion
                      ? submitting
                        ? "Submitting..."
                        : "Submit"
                      : "Next"}
                    <span className="text-base leading-none">&rsaquo;</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Right instructions */}
            <aside className="col-span-12 lg:col-span-2">
              <InstructionsPanel />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;

