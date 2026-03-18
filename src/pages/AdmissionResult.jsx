import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiAlertCircle, FiArrowLeft, FiCheckCircle, FiLoader, FiXCircle } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

import AOS from 'aos';
import 'aos/dist/aos.css';

import alternativeIllustration from '../assets/not-qualified-illustration.svg';
import { getApplicationResult, reconsiderApplication } from '../services/applicationService';

const STATUS_UI = {
  qualified: {
    badgeClass: 'bg-green-50 text-green-600 border-green-200',
    badgeText: 'QUALIFIED',
    header: 'You are qualified for this program',
  },
  not_qualified: {
    badgeClass: 'bg-red-50 text-red-600 border-red-200',
    badgeText: 'NOT QUALIFIED',
    header: null,
  },
  over_qualified: {
    badgeClass: 'bg-accent/10 text-accent border-accent/30',
    badgeText: 'OVER QUALIFIED',
    header: 'You are eligible for a higher-level program',
  },
};

function getApplicationIdFromLocation() {
  const params = new URLSearchParams(window.location.search);
  return params.get('applicationId') || params.get('id') || '';
}

function normalizeStatus(status) {
  if (!status) return '';
  return String(status).toLowerCase();
}

function getBreakdownIcon(passed) {
  return passed ? (
    <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
  ) : (
    <FiXCircle className="text-red-500 mt-0.5 flex-shrink-0" />
  );
}

function normalizePass(item) {
  if (!item) return false;
  if (typeof item.passed === 'boolean') return item.passed;
  const raw = item.result ?? item.status;
  if (!raw) return false;
  const s = String(raw).toLowerCase();
  return s === 'pass' || s === 'passed' || s === 'success' || s === 'ok' || s === 'true';
}

const AdmissionResult = () => {
  const navigate = useNavigate();
  const { applicationId: applicationIdParam } = useParams();

  const applicationId = useMemo(() => applicationIdParam || getApplicationIdFromLocation(), [applicationIdParam]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [resultData, setResultData] = useState(null);
  const [reconsidering, setReconsidering] = useState(false);
  const [reconsiderLocked, setReconsiderLocked] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getApplicationResult(applicationId);
        if (!alive) return;
        setResultData(data);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load application result.');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    if (!applicationId) {
      setLoading(false);
      setError('Missing applicationId in the URL.');
      return () => {};
    }

    run();
    return () => {
      alive = false;
    };
  }, [applicationId]);

  const apiData = resultData?.data || null;
  const qualification = apiData?.qualification || null;
  const application = apiData?.application || null;
  const alternatives = Array.isArray(apiData?.alternatives) ? apiData.alternatives : [];

  const status = normalizeStatus(qualification?.feedbackType);
  const statusUi = STATUS_UI[status] || null;

  const explanation = qualification?.message || '';
  const reasons = qualification?.reasons && Array.isArray(qualification.reasons) ? qualification.reasons.filter(Boolean) : [];

  const analysisBreakdown = Array.isArray(qualification?.analysis_breakdown) ? qualification.analysis_breakdown : [];

  const primaryAlternative = alternatives[0] || null;
  const alternativeProgram = primaryAlternative?.program || null;
  const alternativeReason = primaryAlternative?.reason || '';
  const alternativeProgramId = alternativeProgram?.id || primaryAlternative?.programId || '';
  const alternativeProgramName = alternativeProgram?.name || '';
  const alternativeProgramDescription = alternativeReason || '';

  const showBreakdown = status === 'not_qualified';
  const showAlternative = Boolean(alternativeProgram && (alternativeProgramName || alternativeProgramDescription));

  const handleReconsider = async () => {
    if (reconsiderLocked || reconsidering) return;
    if (!alternativeProgramId) {
      setError('Alternative program id is missing in the API response.');
      return;
    }

    try {
      setReconsidering(true);
      setError('');
      await reconsiderApplication(applicationId, alternativeProgramId);
      setReconsiderLocked(true);
      navigate('/exam');
    } catch (e) {
      setError(e?.message || 'Failed to reconsider application.');
    } finally {
      setReconsidering(false);
    }
  };

  useEffect(() => {
    if (application && typeof application.reconsiderationLocked === 'boolean') {
      setReconsiderLocked(application.reconsiderationLocked);
    }
  }, [application]);

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

          <p className="text-gray-300 text-sm max-w-md">{explanation || ' '}</p>

          {showAlternative && (
            <>
              <div className="flex items-start space-x-4 mt-10 max-w-md">
                <BsStars className="text-white text-3xl flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Suggested Alternative Programmes</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    According to your CV, this is the most suitable program to follow for your future. Are you ready to take the risk?
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-brand-card/70 border border-brand-border rounded-3xl p-5 max-w-md">
                <div className="flex items-center gap-4">
                  <img
                    src={alternativeIllustration}
                    alt="Alternative programme"
                    className="w-16 h-16 rounded-2xl bg-white/10 p-2 object-contain"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{alternativeProgramName}</h4>
                    <p className="text-gray-300 text-xs">{alternativeProgram?.level ? String(alternativeProgram.level) : ' '}</p>
                  </div>
                </div>
                {alternativeProgramDescription ? (
                  <p className="text-gray-300 text-xs leading-relaxed mt-4">{alternativeProgramDescription}</p>
                ) : (
                  <p className="text-gray-300 text-xs leading-relaxed mt-4">{' '}</p>
                )}
              </div>
            </>
          )}
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
              {/* Loading */}
              {loading && (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <FiLoader className="text-3xl text-accent animate-spin" />
                  <p className="text-gray-500 text-sm mt-3">Loading your result...</p>
                </div>
              )}

              {/* Error */}
              {!loading && error && (
                <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
                  <FiAlertCircle className="flex-shrink-0 text-lg" />
                  <span>{error}</span>
                </div>
              )}

              {/* Result */}
              {!loading && !error && (
                <>
                  <div className="flex items-center justify-center mb-5">
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border ${
                        statusUi?.badgeClass || 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}
                    >
                      <FiAlertCircle className="text-base" />
                      {statusUi?.badgeText || (qualification?.feedbackType ? String(qualification.feedbackType).toUpperCase() : '')}
                    </span>
                  </div>

                  <h2 className="text-center text-2xl font-extrabold text-gray-900 leading-snug">
                    {statusUi?.header || qualification?.title || ' '}
                  </h2>

                  {reasons.length > 0 && (
                    <div className="mt-4 bg-gray-50 rounded-2xl border border-gray-100 p-5">
                      <ul className="space-y-2 text-sm text-gray-700">
                        {reasons.map((r, idx) => (
                          <li key={`${idx}-${r}`} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Analysis Breakdown (only not_qualified) */}
                  {showBreakdown && analysisBreakdown.length > 0 && (
                    <div className="mt-6 bg-gray-50 rounded-2xl border border-gray-100 p-5">
                      <div className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-4">
                        <span className="inline-flex w-7 h-7 rounded-lg bg-accent/10 items-center justify-center text-accent">✦</span>
                        Analysis Breakdown
                      </div>

                      <ul className="space-y-3 text-sm">
                        {analysisBreakdown.map((item, idx) => {
                          const passed = normalizePass(item);
                          const title = item?.title || '';
                          const description = item?.description || '';

                          return (
                            <li key={item?.id || `${idx}-${title}`} className="flex items-start gap-3">
                              {getBreakdownIcon(passed)}
                              <div>
                                <p className="text-gray-800 font-semibold">{title}</p>
                                <p className="text-gray-500 text-xs">{description}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => navigate('/')}
                      className="w-full sm:w-1/2 bg-white border border-gray-200 hover:bg-gray-50 transition text-gray-800 font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <FiArrowLeft />
                      Back to Upload
                    </button>

                    {showAlternative && (
                      <button
                        type="button"
                        onClick={handleReconsider}
                        disabled={reconsiderLocked || reconsidering}
                        className={`w-full sm:w-1/2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 ${
                          reconsiderLocked || reconsidering ? 'opacity-60 cursor-not-allowed' : ''
                        }`}
                      >
                        {reconsidering ? (
                          <>
                            <FiLoader className="animate-spin" />
                            Continuing...
                          </>
                        ) : reconsiderLocked ? (
                          <>
                            <FiCheckCircle />
                            Locked
                          </>
                        ) : (
                          <>
                            <FiCheckCircle />
                            Continue with this program
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionResult;

