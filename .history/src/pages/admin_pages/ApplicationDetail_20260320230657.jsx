import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getApplications } from '../../services/applicationService';

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

  useEffect(() => {
    getApplications()
      .then((res) => {
        const found = res.data.data.find((a) => a.id === applicationId);
        setApp(found || null);
      })
      .catch((err) => console.error('Failed to fetch application:', err))
      .finally(() => setLoading(false));
  }, [applicationId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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
          <h1 className="text-2xl font-bold text-gray-800">Application Detail</h1>
          <p className="text-gray-400 text-xs mt-0.5">ID: {app.id}</p>
        </div>
        <span className={`ml-auto px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[app.status] || 'bg-white/10 text-white/50'}`}>
          {app.status.replace('_', ' ')}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Applicant Info */}
        <div className="bg-brand-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-base">Applicant Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Field label="Full Name"  value={app.candidate?.name} />
            <Field label="Email"      value={app.candidate?.email} />
            <Field label="Candidate ID" value={app.candidateId} />
          </div>
        </div>

        {/* Application Info */}
        <div className="bg-brand-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
              </svg>
            </div>
            <h2 className="text-white font-semibold text-base">Application Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Field label="Programme"   value={app.program?.name} />
            <Field label="Level"       value={app.program?.level} />
            <Field label="Intake"      value={app.intake?.name} />
            <Field label="Intake Year" value={app.intake?.year} />
            <Field label="Document"    value={app.documentName} />
            <Field label="Applied At"  value={new Date(app.appliedAt).toLocaleString()} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApplicationDetail;
