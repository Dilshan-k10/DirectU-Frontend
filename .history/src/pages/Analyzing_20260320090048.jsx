import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  'Reading academic transcript...',
  'Cross-referencing university standards...',
  'Generating degree recommendation...',
];

const CARDS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
        <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/>
      </svg>
    ),
    bg: 'bg-[#1e2a6e]',
    title: 'Qualification Analysis',
    desc: 'Calculating weighted scores based on course difficulty.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
      </svg>
    ),
    bg: 'bg-[#1e2a6e]',
    title: 'Course Match',
    desc: 'Matching completed credits against university prerequisites.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
      </svg>
    ),
    bg: 'bg-[#1e2a6e]',
    title: 'Predictive Score',
    desc: 'Generating admission probability based on historical data.',
  },
];

const Analyzing = () => {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((i) => (i + 1) % STEPS.length);
    }, 2000);

    // const navTimer = setTimeout(() => navigate('/results'), 7000);

    return () => {
      clearInterval(stepTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-brand-dark to-brand-card flex flex-col items-center justify-center p-6 font-sans">
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        .spin-slow { animation: spin-slow 3s linear infinite; }
        @keyframes fadeStep {
          0%,100% { opacity: 0; transform: translateY(4px); }
          20%,80% { opacity: 1; transform: translateY(0); }
        }
        .fade-step { animation: fadeStep 2s ease-in-out infinite; }
      `}</style>

      <div className="px-16 py-10 bg-brand-light rounded-[2.5rem] shadow-md">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-[#3b4fd8]">
              Step 2 of 3
            </span>
            <span className="text-gray-500">Application Analysis</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-300 rounded-full h-2 mb-8">
            <div className="bg-accent-hover h-2 rounded-full w-2/3" />
          </div>

          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-sm p-10 flex flex-col items-center text-center mb-4">
            {/* Circular spinner */}
            <div className="relative w-24 h-24 mb-6">
              <svg className="w-full h-full spin-slow" viewBox="0 0 96 96">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="primary"
                  strokeWidth="8"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  fill="none"
                  stroke="#2A528A"
                  strokeWidth="8"
                  strokeDasharray="180 72"
                  strokeLinecap="round"
                  strokeDashoffset="0"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-[#2A528A] rounded-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                  >
                    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96a7.02 7.02 0 00-1.62-.94l-.36-2.54A.484.484 0 0014 2h-4a.484.484 0 00-.48.41l-.36 2.54a7.02 7.02 0 00-1.62.94l-2.39-.96a.48.48 0 00-.59.22L2.74 8.47a.47.47 0 00.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.47.47 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.36 1.04.67 1.62.94l.36 2.54c.05.24.27.41.48.41h4c.24 0 .44-.17.47-.41l.36-2.54a7.02 7.02 0 001.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 00-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1112 8.4a3.6 3.6 0 010 7.2z" />
                  </svg>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Analyzing Your Admission
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              Our AI is currently reviewing your academic records and evaluating
              eligibility criteria.
            </p>

            {/* Animated step */}
            <div className="bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 w-full max-w-sm">
              <p
                key={stepIndex}
                className="fade-step text-sm font-medium text-gray-700 flex items-center gap-2 justify-center"
              >
                <span className="w-2 h-2 rounded-full bg-[#3b4fd8] inline-block flex-shrink-0" />
                {STEPS[stepIndex]}
              </p>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-4">
            {CARDS.map(({ icon, bg, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl shadow-sm p-5">
                <div
                  className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center mb-3`}
                >
                  {icon}
                </div>
                <h3 className="text-sm font-bold text-gray-800 mb-1">
                  {title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyzing;
