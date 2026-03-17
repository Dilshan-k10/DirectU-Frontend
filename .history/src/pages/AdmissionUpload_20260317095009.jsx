import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUploadCloud, FiX, FiArrowRight } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

import AOS from 'aos';
import 'aos/dist/aos.css';

const AdmissionUpload = () => {
  const navigate = useNavigate(); // Hook for programmatic navigation
  const fileInputRef = useRef(null); // Ref to trigger the hidden file input
  
  // State variables
  const [programmes, setProgrammes] = useState([]); // Stores the list of programmes fetched from the database
  const [selectedDegree, setSelectedDegree] = useState("");
  const [file, setFile] = useState(null); // Stores the uploaded file object
  const [isDragging, setIsDragging] = useState(false); // Tracks whether a file is being dragged over the drop zone

  // Fetch programme data on component mount
  useEffect(() => {
    // ... (your existing fetchProgrammes code remains unchanged) ...
  }, []);

  // ---> Add this new useEffect to initialize AOS <---
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true,     // Run animation only once
      offset: 50,     // Offset trigger point
    });
  }, []);
  // Fetch programme data on component mount
  useEffect(() => {
    const fetchProgrammes = async () => {
      // Simulating a database fetch. Replace this with an actual API call (e.g., axios.get) in production.
      const dbData = [
        { id: "cs", name: "BSc (Hons) Computer Science" },
        { id: "se", name: "BEng (Hons) Software Engineering" },
        { id: "is", name: "BSc (Hons) Information Systems" },
        { id: "ds", name: "BSc (Hons) Data Science" }
      ];
      setProgrammes(dbData);
    };
    fetchProgrammes();
  }, []);

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  //File Selection Handler (via click)
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Remove the currently selected file
  const removeFile = () => {
    setFile(null);
    // Reset the input value to allow uploading the same file again if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle form submission
  const handleSubmit = () => {
    // Basic validation before submission
    if (!selectedDegree) {
      alert("Please select a target programme first!");
      return;
    }
    if (!file) {
      alert("Please upload your transcript!");
      return;
    }
    
    // Navigate to the processing/analyzing page upon successful validation
    navigate('/analyzing'); 
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-gradient-to-br from-brand-dark to-brand-card">
      
      {/* Left Section - Hero Text */}
      {/* <div className="w-full lg:w-1/2 p-10 lg:p-24 flex flex-col justify-center text-white">
        <h1 className="text-5xl lg:text-7xl font-bold mb-10 leading-tight"> */}
      <div data-aos="fade-right" className="w-full lg:w-1/2 p-10 lg:p-24 flex flex-col justify-center text-white">
        <h1 className="text-5xl lg:text-7xl font-bold mb-10 leading-tight">  
          Ready to <br /> Analyze Your <br /> Admission?
        </h1>
        <div className="flex items-start space-x-4 mt-8 max-w-md">
          <BsStars className="text-white text-3xl flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-1">AI Analysis in Progress</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Our AI will analyze your documents to calculate GPA conversions and match course requirements automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Form Card */}
      {/* <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
        <div className="bg-[#EAEAEA] rounded-[2.5rem] p-8 lg:p-10 w-full max-w-lg shadow-2xl"> */}
      {/* Right Section - Form Card */}
      <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
        {/* ---> Add data-aos="fade-left" and data-aos-delay="200" to this div <--- */}
        <div data-aos="fade-left" data-aos-delay="200" className="bg-brand-light rounded-[2.5rem] p-8 lg:p-10 w-full max-w-lg shadow-2xl">  
          
          <div className="flex justify-between items-center mb-2 text-sm font-semibold text-blue-900">
            <span>Step 1 of 3</span>
            <span className="text-gray-500">Upload Documents</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-8">
            <div className="bg-accent-hover h-2 rounded-full w-1/3"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Application Analysis</h2>
          <p className="text-gray-600 text-sm mb-8">
            Select your target degree and upload your transcripts to receive instant AI-powered admission insights.
          </p>

          {/* Dynamic Dropdown for Programme Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select The Course</label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              <select 
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-none appearance-none text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select option</option>
                {/* Dynamically populate options based on fetched database records */}
                {programmes.map((prog) => (
                  <option key={prog.id} value={prog.id}>{prog.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Transcripts</label>
            
            {/* Hidden file input element */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="hidden" 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />

            {/* Interactive Drop Zone */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition cursor-pointer 
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
            >
              <div className="bg-blue-50 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
                <FiUploadCloud className="text-blue-600 text-2xl" />
              </div>
              <p className="text-sm text-gray-800 font-semibold mb-1">
                <span className="text-blue-700">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF, DOCX, or JPG up to 10MB</p>
            </div>
          </div>

          {/* Conditional rendering: Display the uploaded file details if a file exists */}
          {file && (
            <div className="flex items-center justify-between bg-white p-3 rounded-xl mb-8 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-red-50 p-2 rounded-lg">
                  <span className="text-red-500 font-bold text-xs">
                    {/* Extract and display the file extension */}
                    {file.name.split('.').pop().toUpperCase()} 
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 truncate w-40 sm:w-56">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
              <button onClick={removeFile} className="text-gray-400 hover:text-red-500 transition">
                <FiX className="text-lg" />
              </button>
            </div>
          )}

          {/* Form Submit Button */}
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