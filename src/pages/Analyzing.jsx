import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Analyzing = () => {
  const navigate = useNavigate();

  // තත්පර 6කට පස්සේ ඔටෝම ඊළඟ පේජ් එකට (Results) යන්න හදලා තියෙන්නේ
  useEffect(() => {
    const timer = setTimeout(() => {
      // මෙතන '/results' වෙනුවට උඹලගේ ඊළඟ පේජ් එකේ ලින්ක් එක දාන්න පුළුවන්
      navigate('/results'); 
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    // Main Container - Matches our brand colors
    <div className="min-h-[calc(100vh-80px)] bg-brand-dark flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      {/* ---------------- Custom CSS Animations ---------------- */}
      <style>{`
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .scanner-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: #8C52FF; /* accent color */
          box-shadow: 0 0 20px 5px rgba(140, 82, 255, 0.6);
          animation: scan 2.5s ease-in-out infinite;
          z-index: 10;
        }
        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .dot { animation: blink 1.4s infinite both; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(10px); }
          10% { opacity: 1; transform: translateY(0); }
          90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .ai-step-1 { animation: fadeUp 3s infinite; animation-delay: 0s; }
        .ai-step-2 { animation: fadeUp 3s infinite; animation-delay: 1s; opacity: 0; }
        .ai-step-3 { animation: fadeUp 3s infinite; animation-delay: 2s; opacity: 0; }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
      {/* -------------------------------------------------------- */}

      {/* Glass Card */}
      <div className="bg-brand-card border border-brand-border shadow-2xl rounded-[2.5rem] p-10 w-full max-w-lg text-center flex flex-col items-center relative z-10">
        
        {/* Step Indicator */}
        <div className="w-full mb-10">
          <div className="flex justify-between text-sm font-bold text-gray-400 mb-3">
            <span className="text-accent">Step 2 of 3</span>
            <span>AI Analysis</span>
          </div>
          <div className="w-full bg-[#12183a] h-1.5 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-accent h-full w-[66%] rounded-full"></div>
          </div>
        </div>

        {/* Scanner Graphic */}
        <div className="relative w-28 h-36 bg-[#12183a]/50 border border-brand-border rounded-xl mb-8 flex items-center justify-center shadow-lg overflow-hidden">
          {/* Document SVG */}
          <svg className="w-12 h-12 text-gray-500 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          
          <div className="scanner-line"></div>
          
          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-accent/50"></div>
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-accent/50"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-accent/50"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-accent/50"></div>
        </div>

        {/* Status Text */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide">
          AI Analysis in Progress<span className="dot text-accent">.</span><span className="dot text-accent">.</span><span className="dot text-accent">.</span>
        </h1>
        <p className="text-gray-400 text-sm mb-8 px-4 leading-relaxed">
          Please wait while our system verifies your documents and calculates your eligibility.
        </p>

        {/* Fake Terminal Text Animation */}
        <div className="h-6 relative w-full flex justify-center text-xs md:text-sm font-mono text-accent/80 mb-2">
          <div className="absolute ai-step-1">▶ Extracting A/L and O/L transcripts...</div>
          <div className="absolute ai-step-2">▶ Cross-referencing university standards...</div>
          <div className="absolute ai-step-3">▶ Generating smart degree recommendation...</div>
        </div>

        {/* Shimmer Progress Bar */}
        <div className="w-full bg-[#12183a] h-2 rounded-full mt-6 overflow-hidden border border-brand-border">
          <div className="bg-gradient-to-r from-primary to-accent h-full w-[85%] rounded-full shadow-[0_0_10px_#8C52FF] relative">
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analyzing;