import React, { useEffect, useState } from "react";
import { getApplications } from "../../services/applicationService";
import { getQualifiedApplications } from "../../services/applicationService";
import { getActiveDegrees } from "../../services/degreeService";
import { getIntakes } from "../../services/intakeService";
import { getApplicants } from "../../services/userService";
import { getNotQualifiedApplications } from "../../services/applicationService";
import { getPendingTestApplications } from "../../services/applicationService";
import { getRejectedApplications } from "../../services/applicationService";

const CARDS = [
  {
    label: "Total Applications",
    value: "",
  },
  {
    label: "Total Active Degrees",
    value: "",
  },
  {
    label: "Active Intake",
    value: "",
  },
  {
    label: "Total Applicants",
    value: "",
  },
  {
    label: "Qualified Applications",
    value: "",
  },

  {
    label: "Not Qualified Applications",
    value: "",
  },

  {
    label: "Pending Test",
    value: "",
  },
  {
    label: "Rejected Applications",
    value: "",
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
  const [totalPendingTestApplications, setTotalPendingTestApplications] = useState(null);
  const [totalRejectedApplications, setTotalRejectedApplications] = useState(null);
  const [totalNotQualifiedApplications, setTotalNotQualifiedApplications] = useState(null);
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

  useEffect(() => {
    getNotQualifiedApplications()
      .then((res) => {
        console.log("Not Qualified Applications:", res);
        setTotalNotQualifiedApplications(res.count);
      })
      .catch((err) => console.error("Failed to fetch not qualified applications:", err));
  }, []);

   useEffect(() => {
    getPendingTestApplications()
      .then((res) => {
        console.log("Pending Test Applications:", res);
        setTotalPendingTestApplications(res.count);
      })
      .catch((err) => console.error("Failed to fetch pending test applications:", err));
  }, []);

  useEffect(() => {
    getRejectedApplications()
      .then((res) => {
        console.log("Rejected Applications:", res);
        setTotalRejectedApplications(res.count);
      })
      .catch((err) => console.error("Failed to fetch rejected applications:", err));
  }, []);



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
                      card.label === "Qualified Applications" ? (totalQualifiedApplications ?? "") :
                        
                        card.label === "Not Qualified Applications" ? (totalNotQualifiedApplications ?? "") :
                          
                          card.label === "Pending Test" ? (totalPendingTestApplications ?? "") :
                            card.label === "Rejected Applications" ? (totalRejectedApplications ?? "") :
              card.value
            }
            loading={
              (card.label === "Total Applications" || card.label === "Total Active Degrees" || card.label === "Total Applicants" || card.label === "Active Intake" || card.label === "Qualified Applications" || card.label === "Not Qualified Applications" || card.label === "Pending Test" || card.label === "Rejected Applications") && loading
            }
          />
        ))}
      </div>

      {/* Chart section */}
      <div className="mt-10"></div>
    </div>
  );
};

export default Overview;
