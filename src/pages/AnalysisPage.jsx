import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiUploadCloud, FiX, FiArrowRight } from 'react-icons/fi';
import { BsStars } from 'react-icons/bs';

const AnalysisPage = () => {
  const navigate = useNavigate(); // Page eka maru karanna
  const fileInputRef = useRef(null); // Hidden file input eka trigger karanna
  
  // State variables
  const [programmes, setProgrammes] = useState([]); // DB eken ena data
  const [selectedDegree, setSelectedDegree] = useState("");
  const [file, setFile] = useState(null); // Upload karana file eka
  const [isDragging, setIsDragging] = useState(false); // Drag karanawada kiyala balanna

  // 1. Database eken data gannawa wage simulate karamu (useEffect run wenne component eka load weddi)
  useEffect(() => {
    // Aththtama API ekak call karaddi methana axios.get() use karanna puluwan
    const fetchProgrammes = async () => {
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

  // 2. Drag & Drop Functions
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

  // 3. Click karala Upload karana Function eka
  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // 4. File eka remove karana eka
  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 5. Submit kalama wena de
  const handleSubmit = () => {
    if (!selectedDegree) {
      alert("Please select a target programme first!");
      return;
    }
    if (!file) {
      alert("Please upload your transcript!");
      return;
    }
    
    // File ekai degree ekai thiyenawanm ilaga page ekata yanawa
    // (Passe api me data tika backend ekata methanadi yawamu)
    navigate('/analyzing'); 
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#020520] to-[#0A1157]">
      
      {/* Left Section - Text */}
      <div className="w-full lg:w-1/2 p-10 lg:p-24 flex flex-col justify-center text-white">
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
      <div className="w-full lg:w-1/2 p-6 lg:p-12 flex items-center justify-center">
        <div className="bg-[#EAEAEA] rounded-[2.5rem] p-8 lg:p-10 w-full max-w-lg shadow-2xl">
          
          <div className="flex justify-between items-center mb-2 text-sm font-semibold text-blue-900">
            <span>Step 1 of 3</span>
            <span className="text-gray-500">Upload Documents</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2 mb-8">
            <div className="bg-[#7455F6] h-2 rounded-full w-1/3"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Application Analysis</h2>
          <p className="text-gray-600 text-sm mb-8">
            Select your target degree and upload your transcripts to receive instant AI-powered admission insights.
          </p>

          {/* Dynamic Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Target Programme</label>
            <div className="relative">
              <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
              <select 
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-none appearance-none text-gray-700 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Search for a degree...</option>
                {/* Database eken ena data meken map wela option widiyata pennanawa */}
                {programmes.map((prog) => (
                  <option key={prog.id} value={prog.id}>{prog.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Transcripts</label>
            
            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileSelect} 
              className="hidden" 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />

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

          {/* Uploaded File Item (File ekak thiyenawanam WITHARAK pennanawa) */}
          {file && (
            <div className="flex items-center justify-between bg-white p-3 rounded-xl mb-8 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-red-50 p-2 rounded-lg">
                  <span className="text-red-500 font-bold text-xs">
                    {file.name.split('.').pop().toUpperCase()} {/* File extension eka gannawa (e.g. PDF) */}
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

          {/* Submit Button */}
          <button 
            onClick={handleSubmit}
            className="w-full mt-2 bg-gradient-to-r from-[#3146A2] to-[#8C52FF] hover:opacity-90 transition text-white font-semibold py-4 rounded-xl flex justify-center items-center space-x-2"
          >
            <span>Submit for AI Analysis</span>
            <FiArrowRight className="text-lg" />
          </button>

        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;