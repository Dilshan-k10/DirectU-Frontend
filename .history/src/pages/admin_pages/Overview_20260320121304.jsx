import React, { useEffect, useState } from "react";
import { getApplications } from "../../services/applicationService";
const CARDS = [
  {
    label: "Total Applications",
    value : "1,250",
    change: 12,
    sparkColor: "#6366f1",
    points: "0,18 10,14 20,16 30,10 40,12 50,6 60,8",
  },
  {
    label: "AI Qualified",
    value: "450",
    change: 5,
    sparkColor: "#6366f1",
    points: "0,18 10,15 20,17 30,11 40,9 50,7 60,5",
  },
  {
    label: "Pending Review",
    value: "120",
    change: -2,
    sparkColor: "#f97316",
    points: "0,5 10,8 20,6 30,12 40,10 50,15 60,18",
  },
  {
    label: "Admission Rate",
    value: "36%",
    change: 1.5,
    sparkColor: "#6366f1",
    points: "0,16 10,14 20,15 30,11 40,12 50,8 60,9",
  },
];

const StatCard = ({ label, value, change, sparkColor, points }) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-[#1a1f36] rounded-2xl p-5 flex flex-col justify-between gap-3 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">{label}</span>
        <span className={`flex items-center gap-0.5 text-xs font-semibold ${
          isPositive ? "text-emerald-400" : "text-orange-400"
        }`}>
          {isPositive ? (
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
              <path d="M7 14l5-5 5 5H7z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          )}
          {Math.abs(change)}%
        </span>
      </div>

      <p className="text-white text-3xl font-bold tracking-tight">{value}</p>

      {/* Sparkline */}
      <svg viewBox="0 0 60 24" className="w-full h-8" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={sparkColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={sparkColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={points}
          fill="none"
          stroke={sparkColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points={`0,24 ${points} 60,24`}
          fill={`url(#grad-${label})`}
        />
      </svg>
    </div>
  );
};

const Overview = () => {
  const [totalApplications, setTotalApplications] = useState(null);

  useEffect(() => {
    getApplications()
      .then((res) => {
        console.log('Applications:', res);
        setTotalApplications(res.count);
        console
      })
      .catch((err) => console.error('Failed to fetch applications:', err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Overview</h1>
      <p className="text-gray-500 text-sm mb-6">Welcome to the admin dashboard.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CARDS.map((card) => (
          <StatCard
            key={card.label}
            {...card}
            value={card.label === "Total Applications" ? (totalApplications ?? '—') : card.value}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
