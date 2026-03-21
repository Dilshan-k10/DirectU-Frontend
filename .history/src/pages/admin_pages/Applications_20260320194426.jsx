import React, { useEffect, useState } from 'react';
import { getAllIntakes } from '../../services/intakeService';
import { getActiveDegrees } from '../../services/degreeService';

const Applications = () => {
  const [intakes, setIntakes] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [selectedIntake, setSelectedIntake] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');

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
  }, []);

  const handleViewApplicants = () => {
    console.log('Selected Intake:', selectedIntake);
    console.log('Selected Degree:', selectedDegree);
    // TODO: fetch applicants by intake + degree
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Applications</h1>

      <div className="p-8 bg-brand-light rounded-2xl mb-10">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-end gap-4  border-t border-white/10">
          {/* Select Intake */}
          <div className="flex-1 min-w-0">
            <label className="block text-gray-700 text-xs font-semibold uppercase tracking-widest mb-2">
              Select Intake
            </label>
            <div className="relative">
              <select
                value={selectedIntake}
                onChange={(e) => setSelectedIntake(e.target.value)}
                className="w-full appearance-none bg-[#0d1228] text-white text-sm px-4 py-3 pr-10 rounded-2xl transition cursor-pointer"
              >
                {intakes.map((intake) => (
                  <option key={intake.id} value={intake.id}>
                    {intake.name}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>

          {/* Select Course */}
          <div className="flex-1 min-w-0">
            <label className="block text-gray-700 text-xs font-semibold uppercase tracking-widest mb-2">
              Select Course
            </label>
            <div className="relative">
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full appearance-none bg-[#0d1228] text-white text-sm px-4 py-3 pr-10 rounded-2xl transition cursor-pointer"
              >
                {degrees.map((degree) => (
                  <option key={degree.id} value={degree.id}>
                    {degree.name}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              >
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
            </div>
          </div>

          {/* View Applicants button */}
          <button
            onClick={handleViewApplicants}
            className="flex items-center gap-2 bg-primary hover:bg-[#1d4ed8] text-white text-sm font-semibold px-6 py-3 rounded-xl transition whitespace-nowrap"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
            </svg>
            VIEW APPLICANTS
          </button>
        </div>
      </div>

      <div className="p-8 bg-brand-light rounded-2xl mb-10" />
    </div>
  );
};

export default Applications;
