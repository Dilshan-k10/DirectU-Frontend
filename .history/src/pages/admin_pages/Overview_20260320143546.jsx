import React, { useEffect, useState } from "react";
import { getApplications } from "../../services/applicationService";
import { getQualifiedApplications } from "../../services/applicationService";
import { getActiveDegrees } from "../../services/degreeService";
import { getIntakes } from "../../services/intakeService";
import { getApplicants } from "../../services/userService";
import { getNotQualifiedApplications } from "../../services/applicationService";
import { use } from "react";

const CARDS = [
  {
    label: "Total Applications",
    value: "",
  },
  {
    label: "Total Active Degrees",
    value: "450",
  },
  {
    label: "Active Intake",
    value: "120",
  },
  {
    label: "Total Applicants",
    value: "36%",
  },
  {
    label: "Qualified Applications",
    value: "36%",
  },

  {
    label: "Not Qualified Applications",
    value: "36%",
  },

  {
    label: "Pending Test",
    value: "36%",
  },
  {
    label: "Rejected Applications",
    value: "36%",
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
        <p className="text-white text-2xl font-bold tracking-tight item-center">{value}</p>
      )}
      
    </div>
  );
};

const Overview = () => {
  const [totalApplications, setTotalApplications] = useState(null);
  const [totalActiveDegrees, setTotalActiveDegrees] = useState(null);
  const [totalApplicants, setTotalApplicants] = useState(null);
  const [activeIntake, setActiveIntake] = useState(null);
  const [totalQualifiedApplications, setTotalQualifiedApplications] = useState(null);
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
    getApplicants()
      .then((res) => {
        console.log('Applicants:', res);
        setTotalApplicants(res.data.applicants.length);
      })
      .catch((err) => console.error('Failed to fetch applicants:', err));
  }, []);

  useEffect(() => {
      getIntakes()
        .then((data) => {
          console.log("Fetched intakes:", data);
          setActiveIntake(data);
        })
        .catch(() => console.error("Failed to load intakes."));
  }, []);
  
  useEffect(() => {
    getQualifiedApplications()
      .then((res) => {
        console.log("Qualified Applications:", res);
        setTotalQualifiedApplications(res.count);
      })
      .catch((err) => console.error("Failed to fetch qualified applications:", err));
  }, []);

  use



  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Overview</h1>
      <p className="text-gray-500 text-sm mb-6">Welcome to the admin dashboard.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
        {CARDS.map((card) => (
          <StatCard
            key={card.label}
            {...card}
            value={
              card.label === "Total Applications" ? (totalApplications ?? "—") :
              card.label === "Total Active Degrees" ? (totalActiveDegrees ?? "—") :
              card.label === "Active Intake" ? (activeIntake ? activeIntake.name : "—") :
                    card.label === "Total Applicants" ? (totalApplicants ?? "—") :
                      card.label === "Qualified Applications" ? (totalQualifiedApplications ?? "—") :
              card.value
            }
            loading={
              (card.label === "Total Applications" || card.label === "Total Active Degrees" || card.label === "Total Applicants" || card.label === "Active Intake" || card.label === "Qualified Applications") && loading
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
