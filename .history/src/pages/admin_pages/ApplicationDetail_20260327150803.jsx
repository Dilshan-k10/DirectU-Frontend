import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplications, viewApplicationById, getApplicantExamDetails, getApplicantanalysisResultById, getApplicantanalysisFeedbackById } from '../../services/applicationService';

const STATUS_STYLES = {
  qualified:     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  not_qualified: 'bg-red-500/10 text-red-400 border border-red-500/20',
  submitted:     'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  test_pending:  'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
  rejected:      'bg-red-500/10 text-red-400 border border-red-500/20',
};

const Field = ({ label, value }) => (
  <div>
    <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</p>
    <p className="text-white text-sm font-medium">{value || '—'}</p>
  </div>
);

const ApplicationDetail = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [examData, setExamData] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);

  useEffect(() => {
    getApplications()
      .then((res) => {
        const found = res.data.data.find((a) => a.id === applicationId);
        setApp(found || null);
      })
      .catch((err) => console.error('Failed to fetch application:', err))
      .finally(() => setLoading(false));
  }, [applicationId]);

  useEffect(() => {
    if (!applicationId) return;
    getApplicantanalysisFeedbackById(applicationId)
      .then((res) => setFeedbackData(res.data.data))
      .catch((err) => console.error('Failed to fetch feedback:', err));
  }, [applicationId]);

  useEffect(() => {
    if (!applicationId) return;
    getApplicantanalysisResultById(applicationId)
      .then((res) => setAnalysisData(res.data.data))
      .catch((err) => console.error('Failed to fetch analysis data:', err));
  }, [applicationId]);

  useEffect(() => {
    if (!applicationId) return;
    getApplicantExamDetails(applicationId)
      .then((res) => setExamData(res.data.exam))
      .catch((err) => console.error('Failed to fetch exam details:', err));
  }, [applicationId]);

  useEffect(() => {
    if (!applicationId) return;
    let objectUrl;
    const loadPdf = async () => {
      setPdfLoading(true);
      try {
        const { data } = await viewApplicationById(applicationId);
        objectUrl = URL.createObjectURL(data);
        setPdfUrl(objectUrl);
      } catch (err) {
        console.error('Failed to load PDF:', err);
      } finally {
        setPdfLoading(false);
      }
    };
    loadPdf();
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [applicationId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-3">
        <div className="w-10 h-10 border-4 border-brand-card border-t-brand-card rounded-full animate-spin" />
        <p className="text-brand-card text-sm">Loading application...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40 text-sm">Application not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-400 text-sm hover:underline">
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Application Detail
          </h1>
          <p className="text-gray-400 text-xs mt-0.5">ID: {app.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.5fr_2fr] gap-6">
        {/* application status */}
        <div className="bg-brand-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-base">
              Application Status
            </h2>
          </div>
          <div>
            <span
              className={`ml-auto px-3 py-1.5 rounded-full text-lg font-semibold capitalize ${STATUS_STYLES[app.status] || "bg-white/10 text-white/50"}`}
            >
              {app.status.replace("_", " ")}
            </span>
            {analysisData && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-white/40 text-xs uppercase tracking-wider">
                  Confidence Score
                </p>
                <p
                  className={`text-3xl font-bold ${
                    parseFloat(analysisData.confidenceScore) >= 0.7
                      ? "text-emerald-400"
                      : parseFloat(analysisData.confidenceScore) >= 0.4
                        ? "text-yellow-400"
                        : "text-red-400"
                  }`}
                >
                  {(parseFloat(analysisData.confidenceScore) * 100).toFixed(0)}%
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Applicant Info */}
        <div className="flex-3 bg-brand-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-base">
              Applicant Information
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Field label="Full Name" value={app.candidate?.name} />
            <Field label="Email" value={app.candidate?.email} />
            <Field label="Candidate ID" value={app.candidateId} />
          </div>
        </div>

        {/* Application Info */}
        <div className="flex-1 bg-brand-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-base">
              Application Information
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Field label="Programme" value={app.program?.name} />
            <Field label="Level" value={app.program?.level} />
            <Field label="Intake" value={app.intake?.name} />
            <Field label="Intake Year" value={app.intake?.year} />
            <Field
              label="Applied At"
              value={new Date(app.appliedAt).toLocaleString()}
            />
          </div>
        </div>
      </div>
      {/* AI results */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="bg-brand-light rounded-2xl p-8 mt-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full ">
              <div>
                <h2 className="text-gray-700 font-semibold text-base ">Analysis Results</h2>
              </div>
              <div>
                {feedbackData && (
                  <p className="text-gray-500 text-md">{feedbackData.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-brand-light rounded-2xl p-8 mt-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
              </svg>
            </div>
            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="text-gray-700 font-semibold text-base">
                  Test Marks
                </h2>
                <p className="text-gray-400 text-xs mt-0.5">Obtained Marks</p>
              </div>
              <div>
                {examData != null ? (
                  <p
                    className={`text-3xl font-bold ${
                      examData.obtainedMarks >= 70
                        ? "text-emerald-500"
                        : examData.obtainedMarks >= 40
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {examData.obtainedMarks}/100
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm">No Test Marks</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admission View */}
      <div className="bg-brand-light rounded-2xl p-8 mt-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-white"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
            </svg>
          </div>
          <h2 className="text-gray-700 font-semibold text-base">
            Submitted Document
          </h2>
        </div>
        {pdfLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-gray-300/30 border-t-gray-600 rounded-full animate-spin" />
          </div>
        ) : pdfUrl ? (
          <iframe
            src={pdfUrl}
            className="w-full h-[700px] rounded-xl border border-white/10"
          />
        ) : (
          <p className="text-white/40 text-sm text-center py-10">
            No document available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetail;
