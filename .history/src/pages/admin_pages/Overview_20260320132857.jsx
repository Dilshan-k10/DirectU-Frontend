import React, { useEffect, useState } from "react";
import { getApplications } from "../../services/applicationService";
import { getActiveDegrees } from "../../services/degreeService";
import { getIntakes } from "../../services/intakeService";

const CARDS = [
  {
    label: "Total Applications",
    value: "1,250",
    change: 12,
    sparkColor: "#6366f1",
    points: "0,18 10,14 20,16 30,10 40,12 50,6 60,8",
  },
  {
    label: "Total Active Degrees",
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

const StatCard = ({ label, value, loading }) => {
  return (
    <div className="bg-[#1a1f36] rounded-2xl p-5 flex flex-col justify-between gap-3 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-lg">{label}</span>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 h-9">
          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-white/40 text-sm">Loading...</span>
        </div>
      ) : (
        <p className="text-white text-4xl font-bold tracking-tight item-center">{value}</p>
      )}
      
    </div>
  );
};

const Overview = () => {
  const [totalApplications, setTotalApplications] = useState(null);
  const [totalActiveDegrees, setTotalActiveDegrees] = useState(null);
  const [activeIntakes, setActiveIntakes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications()
      .then((res) => {
        console.log('Applications:', res);
        setTotalApplications(res.data.count);
      })
      .catch((err) => console.error('Failed to fetch applications:', err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getActiveDegrees()
      .then((res) => {
        console.log('Degrees:', res);
        setTotalActiveDegrees(res.length);
      })
      .catch((err) => console.error('Failed to fetch degrees:', err));
  }, []);

  useEffect(() => { 
    getIntakes()
      .then((res) => {
        console.log('Intakes:', res)
        
      })
      .catch((err) => console.error('Failed to fetch intakes:', err));
  },[]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Overview</h1>
      <p className="text-gray-500 text-sm mb-6">Welcome to the admin dashboard.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {CARDS.map((card) => (
          <StatCard
            key={card.label}
            {...card}
            value={
              card.label === "Total Applications" ? (totalApplications ?? "—") :
              card.label === "Total Active Degrees" ? (totalActiveDegrees ?? "—") :
              card.value
            }
            loading={
              (card.label === "Total Applications" || card.label === "Total Active Degrees") && loading
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
