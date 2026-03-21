import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheckCircle,
  FiLoader,
  FiXCircle,
} from "react-icons/fi";
import { BsStars } from "react-icons/bs";

import AOS from "aos";
import "aos/dist/aos.css";

import alternativeIllustration from "../assets/not-qualified-illustration.svg";
import {
  getApplicationResult,
  reconsiderApplication,
} from "../services/applicationService";

import se from "../assets/se.jpg";
import cs from "../assets/cs.jpg";
import bis from "../assets/bis.jpg";
import bda from "../assets/bda.jpg";
import defaultImage from "../assets/default.jpg" 

const STATUS_UI = {
  qualified: {
    badgeClass: "bg-green-50 text-green-600 border-green-200",
    badgeText: "QUALIFIED",
    header: "Qualified for Admission",
  },
  not_qualified: {
    badgeClass: "bg-red-50 text-red-600 border-red-200",
    badgeText: "NOT QUALIFIED",
    header: "Not Qualified for Admission",
  },
  over_qualified: {
    badgeClass: "bg-accent/10 text-accent border-accent/30",
    badgeText: "OVER QUALIFIED",
    header: "Over Qualified for Admission",
  },
};

const programImages = {
  "deg_se_001": se,
  "deg_cs_001": cs,
  "deg_bis_001": bis,
  "deg_bda_001": bda
};

function getApplicationIdFromLocation() {
  const params = new URLSearchParams(window.location.search);
  return params.get("applicationId") || params.get("id") || "";
}

function normalizeStatus(status) {
  if (!status) return "";
  return String(status).toLowerCase();
}

function getBreakdownIcon(passed) {
  return passed ? (
    <FiCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" />
  ) : (
    <FiXCircle className="text-red-500 mt-0.5 flex-shrink-0" />
  );
}

function normalizePass(item) {
  if (!item) return false;
  if (typeof item.passed === "boolean") return item.passed;
  const raw = item.result ?? item.status;
  if (!raw) return false;
  const s = String(raw).toLowerCase();
  return (
    s === "pass" ||
    s === "passed" ||
    s === "success" ||
    s === "ok" ||
    s === "true"
  );
}

const AdmissionResult = () => {
  const navigate = useNavigate();
  const { applicationId: applicationIdParam } = useParams();

  const applicationId = useMemo(
    () => applicationIdParam || getApplicationIdFromLocation(),
    [applicationIdParam],
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resultData, setResultData] = useState(null);
  const [reconsidering, setReconsidering] = useState(false);
  const [reconsiderLocked, setReconsiderLocked] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    let alive = true;
    const run = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getApplicationResult(applicationId);
        if (!alive) return;
        setResultData(data);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "Failed to load application result.");
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    if (!applicationId) {
      setLoading(false);
      setError("Missing applicationId in the URL.");
      return () => {};
    }

    run();
    return () => {
      alive = false;
    };
  }, [applicationId]);

  const apiData = resultData?.data || null;
  const qualification = apiData?.qualification || null;
  const application = apiData?.application || null;
  const alternatives = Array.isArray(apiData?.alternatives)
    ? apiData.alternatives
    : [];

  const status = normalizeStatus(qualification?.feedbackType);
  const statusUi = STATUS_UI[status] || null;

  const explanation = qualification?.message || "";
  const reasons =
    qualification?.reasons && Array.isArray(qualification.reasons)
      ? qualification.reasons.filter(Boolean)
      : [];

  const analysisBreakdown = Array.isArray(qualification?.analysis_breakdown)
    ? qualification.analysis_breakdown
    : [];

  const primaryAlternative = alternatives[0] || null;
  const alternativeProgram = primaryAlternative?.program || null;
  const alternativeReason = primaryAlternative?.reason || "";
  const alternativeProgramId =
    alternativeProgram?.id || primaryAlternative?.programId || "";
  const alternativeProgramName = alternativeProgram?.name || "";
  const alternativeProgramDescription = alternativeReason || "";

  const showBreakdown = status === "not_qualified";
  const showAlternative = Boolean(
    alternativeProgram &&
    (alternativeProgramName || alternativeProgramDescription),
  );

  const handleReconsider = async () => {
    if (reconsiderLocked || reconsidering) return;
    if (!alternativeProgramId) {
      setError("Alternative program id is missing in the API response.");
      return;
    }

    try {
      setReconsidering(true);
      setError("");
      await reconsiderApplication(applicationId, alternativeProgramId);
      setReconsiderLocked(true);
      navigate("/exam");
    } catch (e) {
      setError(e?.message || "Failed to reconsider application.");
    } finally {
      setReconsidering(false);
    }
  };

  useEffect(() => {
    if (application && typeof application.reconsiderationLocked === "boolean") {
      setReconsiderLocked(application.reconsiderationLocked);
    }
  }, [application]);

  const heroImage = defaultImage;
  const confidencePercentage = Math.round((parseFloat(qualification?.confidenceScore) || 0) * 100);

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-gradient-to-br from-brand-dark to-brand-card">
      <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto flex-1 lg:gap-12 items-start">
        {/* Left Section - Main Content */}
        <div className="w-full lg:w-2/3 p-10 lg:pl-16 lg:pr-8 lg:pt-10 lg:pb-8">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 text-center text-white">
              <FiLoader className="text-3xl text-accent animate-spin" />
              <p className="text-gray-300 text-sm mt-3">Loading your result...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="flex items-center space-x-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-8">
              <FiAlertCircle className="flex-shrink-0 text-lg" />
              <span>{error}</span>
            </div>
          )}

          {/* Result */}
          {!loading && !error && (
            <>
              {/* Top Result Card (Hero Section) */}
              <div
                className="relative bg-cover bg-center rounded-3xl p-8 mb-8 min-h-[300px] flex flex-col justify-end"
                style={{ backgroundImage: `url(${heroImage})` }}
                data-aos="fade-right"
              >
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border ${
                      statusUi?.badgeClass || "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    <FiAlertCircle className="text-base" />
                    {statusUi?.badgeText || (qualification?.feedbackType ? String(qualification.feedbackType).toUpperCase() : "")}
                  </span>
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">{statusUi?.header || "Admission Result"}</h1>
                <p className="text-white text-lg">Confidence Score: {confidencePercentage}%</p>
              </div>

              {/* AI Analysis Report Card */}
              <div className="bg-white rounded-3xl p-6 mb-8 shadow-sm border border-gray-100" data-aos="fade-up">
                <h2 className="text-xl font-bold text-gray-900 mb-4">AI Analysis Report</h2>
                <p className="text-gray-700">{qualification?.message || ""}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8" data-aos="fade-up">
                <button
                  onClick={() => navigate("/generatingExam")}
                  className="w-full sm:w-1/2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  Proceed to Entrance Examination
                </button>
                <button className="w-full sm:w-1/2 bg-gray-200 hover:bg-gray-300 transition text-gray-800 font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                  Download Result
                </button>
              </div>

              {/* Stats Cards */}
              <div className="flex gap-4 mb-8" data-aos="fade-up">
                <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex-1 text-center">
                  <h3 className="text-sm font-semibold text-gray-600">Match Score</h3>
                  <p className="text-2xl font-bold text-gray-900">{confidencePercentage}/100</p>
                </div>
                {/* Additional stats cards can be added here if needed */}
              </div>
            </>
          )}
        </div>

        {/* Right Section - Alternative or Learn More */}
        <div className="w-full lg:w-1/3 p-6 lg:p-12 flex items-start justify-center">
          {!loading && !error && (
            <div data-aos="fade-left" data-aos-delay="200">
              {alternatives.length > 0 ? (
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                  <img
                    src={programImages[alternativeProgramId] || "/images/default.jpg"}
                    alt={alternativeProgramName}
                    className="w-full h-48 object-cover rounded-2xl mb-6"
                  />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{alternativeProgramName}</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-gray-500 text-sm font-semibold mb-1">LEVEL</p>
                      <p className="text-gray-900 text-base">{alternativeProgram?.level}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-semibold mb-1">DURATION</p>
                      <p className="text-gray-900 text-base">{alternativeProgram?.duration || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm font-semibold mb-1">WHY THIS PROGRAM</p>
                      <p className="text-gray-700 text-base">{alternativeReason}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleReconsider}
                    disabled={reconsiderLocked || reconsidering}
                    className={`w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 ${
                      reconsiderLocked || reconsidering ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {reconsidering ? (
                      <>
                        <FiLoader className="animate-spin" />
                        Continuing...
                      </>
                    ) : (
                      "Continue with Suggested Degree!"
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Learn more about degree programs</h3>
                  <div className="space-y-4 mb-6">
                    {[
                      { name: "Software Engineering", id: "deg_se_001" },
                      { name: "Computer Science", id: "deg_cs_001" },
                      { name: "Business Information Systems", id: "deg_bis_001" },
                      { name: "Business Data Analytics", id: "deg_bda_001" }
                    ].map(deg => (
                      <div key={deg.id} className="flex items-center gap-4">
                        <img
                          src={programImages[deg.id] || "/images/default.jpg"}
                          alt={deg.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <span className="text-gray-900 font-medium">{deg.name}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => window.open('https://www.example.com', '_blank')}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition text-white font-semibold py-3 rounded-xl"
                  >
                    Visit University Website
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionResult;