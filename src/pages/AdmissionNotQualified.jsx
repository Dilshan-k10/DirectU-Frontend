import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiAlertCircle, FiArrowLeft, FiDownload, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

import AOS from 'aos';
import 'aos/dist/aos.css';

import notQualifiedIllustration from '../assets/not-qualified-illustration.svg';

const AdmissionNotQualified = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-gradient-to-br from-brand-dark to-brand-card">
      <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto flex-1 lg:gap-12">
        {/* Left Section */}
        <div data-aos="fade-right" className="w-full lg:w-1/2 p-10 lg:pl-16 lg:pr-8 lg:py-24 flex flex-col justify-center text-white">
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Admission
            <br />
            Analysis
            <br />
            Result
          </h1>

          <p className="text-gray-300 text-sm max-w-md">
            Reviewed your admission probability by AI generated insights. If you don&apos;t meet the criteria, we&apos;ll still suggest
            suitable alternatives.
          </p>

          <div className="flex items-start space-x-4 mt-10 max-w-md">
            <BsStars className="text-white text-3xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-1">Suggested Alternative Programmes</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Based on your transcript, these paths may help you qualify faster and strengthen your academic profile.
              </p>
            </div>
          </div>

          <div className="mt-8 bg-brand-card/70 border border-brand-border rounded-3xl p-5 max-w-md">
            <div className="flex items-center gap-4">
              <img
                src={notQualifiedIllustration}
                alt="Alternative programme placeholder"
                className="w-16 h-16 rounded-2xl bg-white/10 p-2 object-contain"
              />
              <div>
                <h4 className="text-white font-semibold">IIT Foundation</h4>
                <p className="text-gray-300 text-xs">International Foundation Programme</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed mt-4">
              A structured pathway that strengthens fundamentals and prepares you for entry into computing-related degree programmes.
              You can replace this card content later with real recommendations.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
          <div data-aos="fade-left" data-aos-delay="200" className="bg-brand-light rounded-[2.5rem] p-8 lg:p-10 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-2 text-sm font-semibold text-blue-900">
              <span>Step 3 of 3</span>
              <span className="text-gray-500">Analysis Completed</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 mb-8">
              <div className="bg-accent-hover h-2 rounded-full w-full"></div>
            </div>

            <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">
              <div className="flex items-center justify-center mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-200">
                  <FiAlertCircle className="text-base" />
                  NOT QUALIFIED
                </span>
              </div>

              <h2 className="text-center text-2xl font-extrabold text-gray-900 leading-snug">
                Unfortunately, you do not meet the criteria
              </h2>
              <p className="text-center text-gray-500 text-sm mt-3 leading-relaxed">
                Based on the analysis of your submitted academic documents, our system identified that the minimum admission requirements
                for the selected programme have not been satisfied.
              </p>

              <div className="mt-6 bg-gray-50 rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-4">
                  <span className="inline-flex w-7 h-7 rounded-lg bg-accent/10 items-center justify-center text-accent">✦</span>
                  Analysis Breakdown
                </div>

                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <FiXCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-semibold">AL Qualification Check</p>
                      <p className="text-gray-500 text-xs">AI results do not meet the minimum subject requirements for this programme.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiXCircle className="text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-semibold">Required Academic Documents</p>
                      <p className="text-gray-500 text-xs">One or more required certificates were not submitted or could not be verified.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-gray-800 font-semibold">Document Format Validation</p>
                      <p className="text-gray-500 text-xs">The uploaded documents were successfully processed by the system.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="w-full sm:w-1/2 bg-white border border-gray-200 hover:bg-gray-50 transition text-gray-800 font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <FiArrowLeft />
                  Back to Upload
                </button>
                <button
                  type="button"
                  onClick={() => {}}
                  className="w-full sm:w-1/2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <FiDownload />
                  Download Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionNotQualified;

