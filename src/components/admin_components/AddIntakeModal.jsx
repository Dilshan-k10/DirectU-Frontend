import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const AddIntakeModal = ({ isOpen, onClose, onSave, editingIntake }) => {
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (isOpen && editingIntake) {
      setFormData({
        name: editingIntake.name || "",
        year: editingIntake.year || "",
        startDate: editingIntake.startDate ? editingIntake.startDate.slice(0, 10) : "",
        endDate: editingIntake.endDate ? editingIntake.endDate.slice(0, 10) : "",
        status: editingIntake.status || "Active",
      });
    } else if (isOpen && !editingIntake) {
      setFormData({ name: "", year: "", startDate: "", endDate: "" });
    }
  }, [isOpen, editingIntake]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...(editingIntake && { id: editingIntake.id }),
      name: formData.name,
      year: Number(formData.year),
      startDate: formData.startDate,
      endDate: formData.endDate,
      ...(editingIntake && { status: formData.status }),
    };
    onSave(payload, !!editingIntake);
    onClose();
  };

  const isEditMode = !!editingIntake;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Intake" : "Create New Intake"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEditMode ? "Update deadlines or status." : "Set up a new admission period."}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition p-2 rounded-full hover:bg-red-50">
            <FiX className="text-2xl" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <form id="intakeForm" onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Intake Name</label>
              <input 
                type="text" required name="name" value={formData.name} onChange={handleInputChange}
                placeholder="e.g. 2026 September Intake"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                <input
                  type="number" required name="year" value={formData.year} onChange={handleInputChange}
                  placeholder="e.g. 2026"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all"
                />
              </div>
            </div>

            {isEditMode && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  name="status" value={formData.status} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                <input 
                  type="date" required name="startDate" value={formData.startDate} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                <input 
                  type="date" required name="endDate" value={formData.endDate} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all"
                />
              </div>
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-600 font-semibold hover:bg-gray-200 transition">
            Cancel
          </button>
          <button type="submit" form="intakeForm" className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-2.5 px-8 rounded-xl transition-all duration-200 shadow-md shadow-[#6366f1]/20">
            {isEditMode ? "Update Intake" : "Create Intake"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddIntakeModal;