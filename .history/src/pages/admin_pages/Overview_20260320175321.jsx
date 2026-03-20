import React, { useEffect, useState } from "react";
import { getApplications, getQualifiedApplications, getNotQualifiedApplications, getPendingTestApplications, getRejectedApplications, getApplicationCountByProgram } from "../../services/applicationService";
import { getActiveDegrees } from "../../services/degreeService";
import { getIntakes } from "../../services/intakeService";
import { getApplicants } from "../../services/userService";
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line,
} from "recharts";

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
  const [applicationsByProgram, setApplicationsByProgram] = useState([]);
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

  useEffect(() => {
    getApplicationCountByProgram()
      .then((res) => {
        console.log("Applications by Program:", res);
        setApplicationsByProgram(res);
      })
      .catch((err) => console.error("Failed to fetch applications by program:", err));
  }, []);



  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Overview</h1>
      <p className="text-gray-500 text-sm mb-6">
        Welcome to the admin dashboard.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 p-8 bg-brand-light rounded-2xl">
        {CARDS.map((card) => (
          <StatCard
            key={card.label}
            {...card}
            value={
              card.label === "Total Applications"
                ? (totalApplications ?? "—")
                : card.label === "Total Active Degrees"
                  ? (totalActiveDegrees ?? "—")
                  : card.label === "Active Intake"
                    ? activeIntake
                      ? activeIntake.name
                      : "—"
                    : card.label === "Total Applicants"
                      ? (totalApplicants ?? "—")
                      : card.label === "Qualified Applications"
                        ? (totalQualifiedApplications ?? "")
                        : card.label === "Not Qualified Applications"
                          ? (totalNotQualifiedApplications ?? "")
                          : card.label === "Pending Test"
                            ? (totalPendingTestApplications ?? "")
                            : card.label === "Rejected Applications"
                              ? (totalRejectedApplications ?? "")
                              : card.value
            }
            loading={
              (card.label === "Total Applications" ||
                card.label === "Total Active Degrees" ||
                card.label === "Total Applicants" ||
                card.label === "Active Intake" ||
                card.label === "Qualified Applications" ||
                card.label === "Not Qualified Applications" ||
                card.label === "Pending Test" ||
                card.label === "Rejected Applications") &&
              loading
            }
          />
        ))}
      </div>

      {/* Chart section */}
      <div className="flex col-2 gap-6">
        <div className="mt-10 bg-brand-light rounded-2xl p-8 flex-1">
          <h2 className="text-gray-700 font-semibold text-base mb-1">
            Application Status Breakdown
          </h2>
          <p className="text-gray-400 text-xs mb-6">
            Distribution of all applications by current status
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={[
                  { name: "Qualified", value: totalQualifiedApplications || 0 },
                  {
                    name: "Not Qualified",
                    value: totalNotQualifiedApplications || 0,
                  },
                  {
                    name: "Submitted",
                    value:
                      (totalApplications || 0) -
                      (totalQualifiedApplications || 0) -
                      (totalNotQualifiedApplications || 0) -
                      (totalPendingTestApplications || 0) -
                      (totalRejectedApplications || 0),
                  },
                  {
                    name: "Pending Test",
                    value: totalPendingTestApplications || 0,
                  },
                  { name: "Rejected", value: totalRejectedApplications || 0 },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
              >
                {["#6366f1", "#f97316", "#3b82f6", "#eab308", "#ef4444"].map(
                  (color, i) => (
                    <Cell key={i} fill={color} />
                  ),
                )}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1f36",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#cbd5e1" }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: "#94a3b8", fontSize: "12px" }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-10 bg-brand-light rounded-2xl p-8 flex-1">
          <h2 className="text-gray-700 font-semibold text-base mb-1">
            Applications vs Qualified
          </h2>
          <p className="text-gray-400 text-xs mb-6">
            Total applications compared to qualified count
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={[
                { name: "Total", count: totalApplications || 0 },
                { name: "Qualified", count: totalQualifiedApplications || 0 },
                {
                  name: "Submitted",
                  count:
                    (totalApplications || 0) -
                    (totalQualifiedApplications || 0) -
                    (totalNotQualifiedApplications || 0) -
                    (totalPendingTestApplications || 0) -
                    (totalRejectedApplications || 0),
                },
                { name: "Rejected", count: totalRejectedApplications || 0 },
              ]}
              barSize={36}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2d3555"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1f36",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                itemStyle={{ color: "#cbd5e1" }}
                cursor={{ fill: "rgba(99,102,241,0.08)" }}
              />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {["#6366f1", "#22c55e", "#3b82f6", "#ef4444"].map(
                  (color, i) => (
                    <Cell key={i} fill={color} />
                  ),
                )}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Applications by Programme chart */}
      <div className="mt-6 bg-brand-light rounded-2xl p-8">
        <h2 className="text-gray-700 font-semibold text-base mb-1">
          Applications by Programme
        </h2>
        <p className="text-gray-400 text-xs mb-6">
          Number of applications submitted per degree programme
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={applicationsByProgram}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2d3555"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1f36",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
              }}
              itemStyle={{ color: "#cbd5e1" }}
              cursor={{ stroke: "rgba(99,102,241,0.3)" }}
            />
            <Line
              type="cardinal"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={2.5}
              dot={{ fill: "#6366f1", r: 5, strokeWidth: 2, stroke: "#1a1f36" }}
              activeDot={{ r: 7, fill: "#818cf8" }}
              label={{ position: "top", fill: "#94a3b8", fontSize: 12 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;
