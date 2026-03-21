import React, { useEffect, useState } from 'react';
import { getAllIntakes } from '../../services/intakeService';
import { getActiveDegrees } from '../../services/degreeService';
import { getApplications } from '../../services/applicationService';

const STATUS_STYLES = {
  qualified:     'bg-emerald-500/10 text-emerald-400',
  not_qualified: 'bg-red-500/10 text-red-400',
  submitted:     'bg-blue-500/10 text-blue-400',
  test_pending:  'bg-yellow-500/10 text-yellow-400',
  rejected:      'bg-red-500/10 text-red-400',
};

const Applications = () => {
  const [intakes, setIntakes]               = useState([]);
  const [degrees, setDegrees]               = useState([]);
  const [allApplications, setAllApplications] = useState([]);
  const [filtered, setFiltered]             = useState([]);
  const [selectedIntake, setSelectedIntake] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [searched, setSearched]             = useState(false);
  const [loading, setLoading]               = useState(false);

  useEffect(() => {
    getAllIntakes()
      .then((data) => {
        setIntakes(data);
        if (data.length > 0) setSelectedIntake(data[0].id);
      })
      .catch((err) => console.error('Failed to fetch intakes:', err));

    getActiveDegrees()
      .then((data) => {
        setDegrees(data);
        if (data.length > 0) setSelectedDegree(data[0].id);
      })
      .catch((err) => console.error('Failed to fetch degrees:', err));

    getApplications()
      .then((res) => setAllApplications(res.data.data))
      .catch((err) => console.error('Failed to fetch applications:', err));
  }, []);

  const handleViewApplicants = () => {
    setLoading(true);
    const result = allApplications.filter(
      (app) => app.intakeId === selectedIntake && app.programId === selectedDegree
    );
    setFiltered(result);
    setSearched(true);
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Applications</h1>

      {/* Filter card */}
      <div className="bg-brand-light rounded-2xl mb-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row items-end gap-4 px-8 py-6 border-t border-white/10">
          {/* Select Intake */}
          <div className="flex-1 min-w-0">
            <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">
              Select Intake
            </label>
            <div className="relative">
              <select
                value={selectedIntake}
                onChange={(e) => setSelectedIntake(e.target.value)}
                className="w-full appearance-none bg-brand-card text-white/80 text-sm px-4 py-3 pr-10 rounded-xl transition cursor-pointer"
              >
                {intakes.map((intake) => (
                  <option
                    key={intake.id}
                    value={intake.id}
                    className="bg-[#111827]"
                  >
                    {intake.name}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white/30 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>

          {/* Select Course */}
          <div className="flex-1 min-w-0">
            <label className="block text-gray-700 text-[10px] font-bold uppercase tracking-[0.15em] mb-2">
              Select Course
            </label>
            <div className="relative">
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full appearance-none bg-brand-card text-white/80 text-sm px-4 py-3 pr-10 rounded-xl transition cursor-pointer"
              >
                {degrees.map((degree) => (
                  <option
                    key={degree.id}
                    value={degree.id}
                    className="bg-[#111827]"
                  >
                    {degree.name}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white/30 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>

          {/* View Applicants button */}
          <button
            onClick={handleViewApplicants}
            className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-6 py-3 rounded-xl transition whitespace-nowrap tracking-[0.1em]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
            </svg>
            VIEW APPLICANTS
          </button>
        </div>
      </div>

      {/* Results table card */}
      <div className="p-8 bg-brand-card rounded-2xl mb-10">
        {!searched ? (
          <p className="text-gray-400 text-sm text-center py-10">
            Select an intake and course, then click{" "}
            <span className="text-white font-semibold">VIEW APPLICANTS</span>.
          </p>
        ) : loading ? (
          <div className="flex justify-center py-10">
            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-10">
            No applications found for the selected filters.
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-semibold text-base">
                Results{" "}
                <span className="text-white/40 text-sm font-normal ml-1">
                  ({filtered.length})
                </span>
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {[
                      "Candidate",
                      "Email",
                      "Programme",
                      "Intake",
                      "Status",
                                                      "Applied At",
                      "Details",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-white/40 text-xs font-semibold uppercase tracking-wider pb-3 pr-6"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-3 pr-6 text-white font-medium whitespace-nowrap">
                        {app.candidate?.name}
                      </td>
                      <td className="py-3 pr-6 text-white/50 whitespace-nowrap">
                        {app.candidate?.email}
                      </td>
                      <td className="py-3 pr-6 text-white/70 whitespace-nowrap">
                        {app.program?.name}
                      </td>
                      <td className="py-3 pr-6 text-white/70 whitespace-nowrap">
                        {app.intake?.name}
                      </td>
                      <td className="py-3 pr-6">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[app.status] || "bg-white/10 text-white/50"}`}
                        >
                          {app.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 text-white/40 whitespace-nowrap">
                        {new Date(app.appliedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Applications;
