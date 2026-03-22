import React, { useState, useEffect } from "react";
import { HiPlus } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import AddCourseModal from "../../components/admin_components/AddCourseModal";
import { getDegrees } from "../../services/degreeService";

const Degrees = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    getDegrees()
      .then((data) => setDegrees(data))
      .catch((err) => console.error('Failed to load degrees:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleToggleStatus = (id) => {
    setDegrees((prevDegrees) =>
      prevDegrees.map((deg) =>
        deg.id === id ? { ...deg, isActive: !deg.isActive } : deg
      )
    );
  };

  const handleAddNewClick = () => {
    setEditingCourse(null); 
    setIsModalOpen(true);
  };

  const handleEditClick = (deg) => {
    setEditingCourse(deg); 
    setIsModalOpen(true);
  };

  const handleSaveCourse = (savedDegree, isEdit) => {
    if (isEdit) {
      setDegrees(degrees.map(d => d.id === savedDegree.id ? savedDegree : d));
    } else {
      setDegrees([savedDegree, ...degrees]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto relative">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Degrees</h1>
        <p className="text-gray-500 text-sm">
          Manage your university degree programs and their active status.
        </p>
      </div>

      <div className="bg-brand-light rounded-2xl shadow-sm p-8">
        <div className="flex justify-between items-center pb-5 mb-6 border-b border-gray-200">
          <h2 className="text-gray-700 font-semibold text-lg">
            Degree Programs
          </h2>
          <button
            onClick={handleAddNewClick}
            className="bg-primary hover:bg-brand-card text-white flex items-center gap-2 px-5 py-2.5 rounded-xl transition font-semibold text-sm shadow-md shadow-[#6366f1]/20"
          >
            <HiPlus className="w-4 h-4" />
            Add New Course
          </button>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center gap-3 p-10 justify-center text-gray-500">
              <div className="w-6 h-6 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              Loading degrees...
            </div>
          ) : (
            degrees.map((deg) => (
              <div
                key={deg.id}
                className={`bg-[#1a1f36] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border transition duration-300 ${deg.isActive ? "border-transparent shadow-lg" : "border-gray-700 opacity-60"}`}
              >
                <div className="flex-grow">
                  <h3
                    className={`text-xl font-bold mb-1.5 transition flex items-center gap-2 ${deg.isActive ? "text-white" : "text-gray-400"}`}
                  >
                    {deg.name}
                    <span className="text-xs font-normal px-2 py-1 bg-white/10 rounded-md text-gray-300">
                      {deg.level} | {deg.duration} YRS
                    </span>
                    <span className="text-xs font-normal px-2 py-1 bg-white/10 rounded-md text-gray-300">
                      CAPACITY | {deg.capacity} SEATS
                    </span>
                  </h3>
                  <p
                    className={`text-sm font-normal tracking-wide transition ${deg.isActive ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {deg.description}
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 md:min-w-[280px] flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={deg.isActive}
                        onChange={() => handleToggleStatus(deg.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                    </label>
                    <span
                      className={`text-sm font-semibold w-16 ${deg.isActive ? "text-emerald-500" : "text-gray-500"}`}
                    >
                      {deg.isActive ? "Active" : "Hidden"}
                    </span>
                  </div>

                  <button
                    onClick={() => handleEditClick(deg)}
                    className="text-gray-400 hover:text-[#6366f1] transition p-2 rounded-lg hover:bg-white/5"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <AddCourseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCourse(null);
        }}
        onSave={handleSaveCourse}
        editingCourse={editingCourse}
      />
    </div>
  );
};

export default Degrees;