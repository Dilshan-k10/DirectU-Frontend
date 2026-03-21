import React, { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { FiEdit2, FiCalendar, FiUsers, FiClock } from "react-icons/fi";
import AddIntakeModal from "../../components/admin_components/AddIntakeModal";

const Intakes = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIntake, setEditingIntake] = useState(null);
  
  // Mock Data
  const [intakes, setIntakes] = useState([
    {
      id: 1,
      name: "2026 September Intake",
      startDate: "2026-06-01",
      deadline: "2026-08-15",
      status: "Active", // Active, Upcoming, Closed
      applicationCount: 342
    },
    {
      id: 2,
      name: "2027 February Intake",
      startDate: "2026-11-01",
      deadline: "2027-01-20",
      status: "Upcoming",
      applicationCount: 0
    },
    {
      id: 3,
      name: "2026 February Intake",
      startDate: "2025-11-01",
      deadline: "2026-01-20",
      status: "Closed",
      applicationCount: 415
    }
  ]);

  useEffect(() => {
    setLoading(false); 
  }, []);

  const handleAddNewClick = () => {
    setEditingIntake(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (intake) => {
    setEditingIntake(intake);
    setIsModalOpen(true);
  };

  const handleSaveIntake = (savedIntake, isEdit) => {
    if (isEdit) {
      setIntakes(intakes.map(i => i.id === savedIntake.id ? savedIntake : i));
    } else {
      setIntakes([savedIntake, ...intakes]);
    }
  };

  // Status එකට අනුව Badge එකේ පාට වෙනස් කරන Function එක
  const getStatusBadge = (status) => {
    switch(status) {
      case 'Active':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">Active</span>;
      case 'Upcoming':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">Upcoming</span>;
      case 'Closed':
        return <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20">Closed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto relative">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Intakes</h1>
        <p className="text-gray-500 text-sm">
          Manage admission periods, set deadlines, and track application volumes.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-brand-light rounded-2xl shadow-sm p-8">
        
        <div className="flex justify-between items-center pb-5 mb-6 border-b border-gray-200">
          <h2 className="text-gray-700 font-semibold text-lg">Admission Periods</h2>
          <button 
            onClick={handleAddNewClick}
            className="bg-[#6366f1] text-white flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-[#4f46e5] transition font-semibold text-sm shadow-md shadow-[#6366f1]/20"
          >
            <HiPlus className="w-4 h-4" />
            Create Intake
          </button>
        </div>

        {/* Intakes List */}
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <div className="flex items-center gap-3 p-10 justify-center text-gray-500">
              <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              Loading intakes...
            </div>
          ) : (
            intakes.map((intake) => (
              <div 
                key={intake.id} 
                className={`bg-[#1a1f36] rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border transition duration-300 ${intake.status === 'Closed' ? 'border-gray-700 opacity-75' : 'border-transparent shadow-lg'}`}
              >
                
                {/* Left: Name & Status */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white tracking-wide">{intake.name}</h3>
                    {getStatusBadge(intake.status)}
                  </div>
                  
                  {/* Stats Badge */}
                  <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                    <FiUsers className="text-[#6366f1]" />
                    <span className="text-sm font-medium text-gray-300">
                      <strong className="text-white">{intake.applicationCount}</strong> Total Applications
                    </span>
                  </div>
                </div>

                {/* Right: Dates & Actions */}
                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 lg:gap-10">
                  
                  {/* Dates Info */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FiCalendar className="text-gray-500" />
                      <span>Starts: <strong className="text-gray-200 font-medium">{intake.startDate}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <FiClock className={intake.status === 'Active' ? 'text-red-400' : 'text-gray-500'} />
                      <span>Deadline: <strong className={intake.status === 'Active' ? 'text-red-400 font-semibold' : 'text-gray-200 font-medium'}>{intake.deadline}</strong></span>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <div className="pl-4 border-l border-white/10 hidden md:block">
                    <button 
                      onClick={() => handleEditClick(intake)}
                      className="text-gray-400 hover:text-[#6366f1] transition p-2 rounded-lg hover:bg-white/5 flex items-center justify-center"
                      title="Edit Intake"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddIntakeModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingIntake(null);
        }} 
        onSave={handleSaveIntake} 
        editingIntake={editingIntake}
      />

    </div>
  );
};

export default Intakes;