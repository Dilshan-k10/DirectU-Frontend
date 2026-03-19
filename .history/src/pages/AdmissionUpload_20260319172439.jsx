import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiUploadCloud,
  FiX,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { getDegrees } from "../services/degreeService";
import { getUser } from "../api/axiosClient";
import AOS from "aos";
import "aos/dist/aos.css";

const AdmissionUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [programmes, setProgrammes] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState("");
  const [intake, setIntake] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (!user?.name) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 50 });
  }, []);

  useEffect(() => {
    getDegrees()
      .then((data) => {
        console.log("Fetched degrees:", data);
        setProgrammes(data);
      })
      .catch(() => setErrorMsg("Failed to load degree programmes."));
  }, []);

  useEffect(() => { 
    getIntakes().the
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const validateAndSetFile = (selected) => {
    if (selected.type !== "application/pdf") {
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      setErrorMsg("Only PDF files are accepted. Please upload a valid PDF.");
      return;
    }
    setFile(selected);
    setErrorMsg("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length > 0)
      validateAndSetFile(e.dataTransfer.files[0]);
  };

  const handleFileSelect = (e) => {
    if (e.target.files?.length > 0) validateAndSetFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = () => {
    if (!selectedDegree) {
      setErrorMsg("Please select a target programme first!");
      return;
    }
    if (!file) {
      setErrorMsg("Please upload your transcript before submitting!");
      return;
    }
    setErrorMsg("");
    setShowSuccess(true);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-gradient-to-br from-brand-dark to-brand-card">
      <style>{`
        @keyframes backdropIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.85) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes checkBounce { 0%,100% { transform: scale(1); } 30% { transform: scale(1.3); } 60% { transform: scale(0.9); } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }
        .animate-backdrop { animation: backdropIn 0.25s ease forwards; }
        .animate-modal { animation: modalIn 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .animate-check { animation: checkBounce 0.6s ease 0.2s both; }
        .animate-shake { animation: shake 0.4s ease; }
      `}</style>

      {/* Success Modal */}
      {showSuccess && (
        <div className="animate-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="animate-modal bg-[#0A1035] border border-[#1A2255] rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl w-80">
            <div className="bg-green-500/10 rounded-full p-4 mb-5">
              <FiCheckCircle className="animate-check text-green-400 text-5xl" />
            </div>
            <h2 className="text-white text-xl font-bold mb-2">
              Application Uploaded Successfully!
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              Your documents have been submitted for AI analysis.
            </p>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate("/analyzing");
              }}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition text-white font-semibold py-3 rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Left Section */}
      <div
        data-aos="fade-right"
        className="w-full lg:w-1/2 p-10 lg:pl-16 lg:pr-8 lg:py-24 flex flex-col justify-center text-white"
      >
        <h1 className="text-5xl lg:text-7xl font-bold mb-10 leading-tight">
          Ready to <br /> Analyze Your <br /> Admission?
        </h1>
        <div className="flex items-start space-x-4 mt-8 max-w-md">
          <BsStars className="text-white text-3xl flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">
              AI Analysis in Progress
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our AI will analyze your documents to calculate GPA conversions
              and match course requirements automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
        <div
          data-aos="fade-left"
          data-aos-delay="200"
          className="bg-brand-light rounded-[2.5rem] p-8 lg:p-10 w-full max-w-lg shadow-2xl"
        >
          <div className="flex justify-between items-center mb-2 text-sm font-semibold text-blue-900">
            <span>Step 1 of 3</span>
            <span className="text-gray-500">Upload Documents</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-8">
            <div className="bg-accent-hover h-2 rounded-full w-1/3" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Start Your Application Analysis
          </h2>
          <p className="text-gray-600 text-sm mb-8">
            Select your target degree and upload your transcripts to receive
            instant AI-powered admission insights.
          </p>

          {/* Intake Selection Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Intake
            </label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              <input
                type="text"
                value={intake}
                placeholder=""
                readOnly
                className="w-full pl-12 pr-4 py-3 rounded-xl border-none text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Degree Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select The Course
            </label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              <select
                value={selectedDegree}
                onChange={(e) => {
                  const selected = programmes.find(
                    (p) => p.id === e.target.value,
                  );
                  console.log(
                    "Selected degree:",
                    selected?.name,
                    "| ID:",
                    selected?.id,
                  );
                  setSelectedDegree(e.target.value);
                  setErrorMsg("");
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-none appearance-none text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select option</option>
                {programmes.map((prog) => (
                  <option key={prog.id} value={prog.id}>
                    {prog.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Transcripts
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept=".pdf"
            />
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              }`}
            >
              <div className="bg-blue-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <FiUploadCloud className="text-blue-600 text-2xl" />
              </div>
              <p className="text-sm text-gray-800 font-semibold mb-1">
                <span className="text-blue-700">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PDF only, up to 25MB</p>
            </div>
          </div>

          {/* Selected File */}
          {file && (
            <div className="flex items-center justify-between bg-white p-3 rounded-xl mb-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-red-50 p-2 rounded-lg">
                  <span className="text-red-500 font-bold text-xs">
                    {file.name.split(".").pop().toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 truncate w-40 sm:w-56">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={removeFile}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <FiX className="text-lg" />
              </button>
            </div>
          )}

          {/* Error */}
          {errorMsg && (
            <div
              key={errorMsg}
              className="animate-shake flex items-center space-x-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4"
            >
              <FiAlertCircle className="flex-shrink-0 text-lg" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="w-full mt-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition text-white font-semibold py-4 rounded-xl flex justify-center items-center space-x-2"
          >
            <span>Submit for AI Analysis</span>
            <FiArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdmissionUpload;
