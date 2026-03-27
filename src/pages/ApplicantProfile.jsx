import React from 'react';
import { useNavigate } from 'react-router-dom';

const dummy = {
  id: '2fb1a13f-35a4-4883-8987-cd0941e117b2',
  status: 'qualified',
  confidenceScore: '0.50',
  candidate: { name: 'Sandeepa', email: 'sandeepa.20234079@iit.ac.lk', id: '19f8a074-8045-4d83-87b5-1ab68c2fa9ab' },
  program: { name: 'Software Engineering', level: 'BACHELOR' },
  intake: { name: 'January 2026 Intake', year: '2026' },
  appliedAt: '2026-03-27T12:25:54.000Z',
  feedback: 'You meet the minimum requirements for the selected degree program.',
  obtainedMarks: 30,
};

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

const IconBox = ({ path }) => (
  <div className="w-10 h-10 rounded-full bg-[#1e3a8a] flex items-center justify-center shrink-0">
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
      <path d={path} />
    </svg>
  </div>
);

const ApplicantProfile = () => {
  const navigate = useNavigate();
  const app = dummy;

  const scoreColor = app.obtainedMarks >= 70 ? 'text-emerald-500' : app.obtainedMarks >= 40 ? 'text-yellow-500' : 'text-red-500';
  const confColor = parseFloat(app.confidenceScore) >= 0.7 ? 'text-emerald-400' : parseFloat(app.confidenceScore) >= 0.4 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/40 hover:text-white text-sm transition">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Applicant Profile</h1>
          <p className="text-gray-400 text-xs mt-0.5">ID: {app.id}</p>
        </div>
      </div>

      {/* Top 3 cards */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1.5fr_2fr] gap-6 mb-6">
        {/* Application Status */}
        <div className="bg-brand-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <IconBox path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            <h2 className="text-white font-semibold text-base">Application Status</h2>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-lg font-semibold capitalize ${STATUS_STYLES[app.status] || 'bg-white/10 text-white/50'}`}>
            {app.status.replace('_', ' ')}
          </span>
          <div className="flex items-center justify-between mt-4">
            <p className="text-white/40 text-xs uppercase tracking-wider">Confidence Score</p>
            <p className={`text-lg font-bold ${confColor}`}>
              {(parseFloat(app.confidenceScore) * 100).toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Applicant Info */}
        <div className="bg-brand-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <IconBox path="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            <h2 className="text-white font-semibold text-base">Applicant Information</h2>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <Field label="Full Name" value={app.candidate.name} />
            <Field label="Email" value={app.candidate.email} />
            <Field label="Candidate ID" value={app.candidate.id} />
          </div>
        </div>

        {/* Application Info */}
        <div className="bg-brand-card rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <IconBox path="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
            <h2 className="text-white font-semibold text-base">Application Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Field label="Programme" value={app.program.name} />
            <Field label="Level" value={app.program.level} />
            <Field label="Intake" value={app.intake.name} />
            <Field label="Intake Year" value={app.intake.year} />
            <Field label="Applied At" value={new Date(app.appliedAt).toLocaleString()} />
          </div>
        </div>
      </div>

      {/* Analysis + Score */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 mb-6">
        <div className="bg-brand-light rounded-2xl p-8">
          <div className="flex items-center gap-3">
            <IconBox path="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <h2 className="text-gray-700 font-semibold text-base">Analysis Results</h2>
              </div>
              <div>
                <p className="text-gray-500 text-sm">{app.feedback}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-light rounded-2xl p-8">
          <div className="flex items-center gap-3">
            <IconBox path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
            <div className="flex items-center justify-between w-full">
              <div>
                <h2 className="text-gray-700 font-semibold text-base">Test Marks</h2>
                <p className="text-gray-400 text-xs mt-0.5">Obtained Marks</p>
              </div>
              <p className={`text-4xl font-bold ${scoreColor}`}>{app.obtainedMarks}/100</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submitted Document placeholder */}
      <div className="bg-brand-light rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <IconBox path="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
          <h2 className="text-gray-700 font-semibold text-base">Submitted Document</h2>
        </div>
        <p className="text-gray-400 text-sm text-center py-10">No document available.</p>
      </div>
    </div>
  );
};

export default ApplicantProfile;
