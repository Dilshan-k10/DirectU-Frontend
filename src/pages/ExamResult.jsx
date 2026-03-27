import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// TODO: Replace with API response value
const score = 82;

const ExamResult = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0A1035" }}>


      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center" style={{ background: "linear-gradient(135deg, #011f4b 0%, #03396c 60%, #005b96 100%)" }}>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Entrance Exam Completed!</h1>
            <p className="text-[#b3cde0] text-sm">
              We have successfully recorded your exam answers for{" "}
              <span className="font-semibold text-white">BSc (Hons) in Computer Science</span>.
            </p>
          </div>

          <div className="px-8 py-8 space-y-6">

            {/* Score + Status Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Score Card */}
              <div className="rounded-2xl border border-[#b3cde0] bg-[#f0f6fb] p-5 text-center">
                <p className="text-xs font-bold tracking-widest text-[#005b96] mb-2">YOUR SCORE</p>
                <p className="text-5xl font-extrabold text-[#011f4b]">{score}%</p>
              </div>

              {/* Status Card */}
              <div className="rounded-2xl border border-[#b3cde0] bg-[#f0f6fb] p-5 text-center">
                <p className="text-xs font-bold tracking-widest text-[#005b96] mb-2">STATUS</p>
                <p className="text-2xl font-extrabold text-[#011f4b]">Under Review</p>
                <p className="text-xs text-[#6497b1] mt-1 font-medium">Awaiting Batch Cut-off</p>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-gray-200" />

            {/* Final Selection Section */}
            <div>
              <span className="inline-block text-xs font-bold tracking-widest text-[#005b96] bg-[#e8f2fb] px-3 py-1 rounded-full mb-3">
                PHASE 3: FINAL SELECTION
              </span>
              <h2 className="text-xl font-bold text-[#011f4b] mb-2">Generating Your Final Rank...</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                The university is currently evaluating all candidates. Your final rank will determine
                your placement within the available slots for this batch.
              </p>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="w-full bg-[#b3cde0] rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: "65%",
                    background: "linear-gradient(90deg, #03396c, #005b96, #6497b1)",
                  }}
                />
              </div>
              <p className="text-xs font-bold tracking-widest text-[#6497b1] mt-2 text-center">
                PROCESSING BATCH!
              </p>
            </div>

            {/* Notification */}
            <div className="flex items-start gap-3 bg-[#f0f6fb] border border-[#b3cde0] rounded-xl px-4 py-3">
              <svg className="w-5 h-5 text-[#005b96] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="text-sm text-[#03396c]">
                You will receive an <span className="font-semibold">Email notification</span> once the final ranking is published.
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => {}}
                className="px-10 py-3 rounded-full font-semibold text-white text-sm shadow-md transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #011f4b, #005b96)" }}
              >
                View Profile
              </button>
            </div>

          </div>
        </div>
      </main>


    </div>
  );
};

export default ExamResult;
