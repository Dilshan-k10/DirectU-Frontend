import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { createDegree, updateDegree } from "../../services/degreeService";

const LEVELS = ["BACHELOR", "MASTER", "PHD", "DIPLOMA"];

const EMPTY = { name: "", description: "", level: "BACHELOR", duration: 3, capacity: 100, isActive: true };

const AddCourseModal = ({ isOpen, onClose, onSave, editingCourse }) => {
  const [formData, setFormData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    setFormData(
      editingCourse
        ? {
            name: editingCourse.name || "",
            description: editingCourse.description || "",
            level: editingCourse.level || "BACHELOR",
            duration: editingCourse.duration || 3,
            capacity: editingCourse.capacity || 100,
            isActive: editingCourse.isActive ?? true,
          }
        : EMPTY
    );
  }, [isOpen, editingCourse]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { ...formData, duration: Number(formData.duration), capacity: Number(formData.capacity) };
      const saved = editingCourse
        ? await updateDegree(editingCourse.id, payload)
        : await createDegree(payload);
      onSave(saved, !!editingCourse);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save degree.");
    } finally {
      setLoading(false);
    }
  };

  const isEditMode = !!editingCourse;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditMode ? "Edit Degree Program" : "Add New Course"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isEditMode ? "Update the details of the selected degree." : "Fill in the details to add a new degree program."}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition p-2 rounded-full hover:bg-red-50">
            <FiX className="text-2xl" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          <form id="courseForm" onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name</label>
              <input
                required type="text" name="name" value={formData.name} onChange={handleChange}
                placeholder="e.g. BSc (Hons) in Artificial Intelligence"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                required name="description" value={formData.description} onChange={handleChange} rows={3}
                placeholder="Brief description of the degree programme..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                <select name="level" value={formData.level} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all">
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (years)</label>
                <input
                  required type="number" name="duration" min={1} max={10} value={formData.duration} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
                <input
                  required type="number" name="capacity" min={1} value={formData.capacity} onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div>
                <span className="font-semibold text-gray-700 block">Active</span>
                <span className="text-xs text-gray-500">Make this degree visible to applicants.</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]" />
              </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>

        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-600 font-semibold hover:bg-gray-200 transition">
            Cancel
          </button>
          <button type="submit" form="courseForm" disabled={loading} className="bg-[#6366f1] hover:bg-[#4f46e5] disabled:opacity-60 text-white font-semibold py-2.5 px-8 rounded-xl transition-all duration-200 shadow-md shadow-[#6366f1]/20">
            {loading ? "Saving..." : isEditMode ? "Update Course" : "Save Course"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddCourseModal;
