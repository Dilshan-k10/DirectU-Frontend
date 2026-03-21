import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const AddCourseModal = ({ isOpen, onClose, onSave, editingCourse }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "Full Time (FT)",
    duration: "4 Years",
    alMath: "",
    olEnglish: "",
    alPass: false
  });


  useEffect(() => {
    if (isOpen && editingCourse) {
      setFormData({
        name: editingCourse.name || "",
        type: editingCourse.type || "Full Time (FT)",
        duration: editingCourse.duration || "4 Years",
        alMath: editingCourse.alMath || "",
        olEnglish: editingCourse.olEnglish || "",
        alPass: editingCourse.alPass || false
      });
    } else if (isOpen && !editingCourse) {
      setFormData({
        name: "", type: "Full Time (FT)", duration: "4 Years", alMath: "", olEnglish: "", alPass: false
      });
    }
  }, [isOpen, editingCourse]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGradeSelect = (subject, grade) => {
    setFormData(prev => ({
      ...prev,
      [subject]: prev[subject] === grade ? "" : grade
    }));
  };

  const handleToggleAlPass = () => {
    setFormData(prev => ({ ...prev, alPass: !prev.alPass }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let reqs = [];
    if(formData.alPass) reqs.push("A/L Pass");
    if(formData.alMath) reqs.push(`A/L Math (${formData.alMath} pass)`);
    if(formData.olEnglish) reqs.push(`O/L English (${formData.olEnglish} pass)`);

    const requirementsText = reqs.length > 0 ? `Required: ${reqs.join(", ")}` : "No specific requirements.";

    const submittedDegree = {
      id: editingCourse ? editingCourse.id : Date.now(), 
      name: formData.name,
      type: formData.type,
      duration: formData.duration,
      alMath: formData.alMath,
      olEnglish: formData.olEnglish,
      alPass: formData.alPass,
      requirements: requirementsText,
      isActive: editingCourse ? editingCourse.isActive : true, 
    };

    onSave(submittedDegree, !!editingCourse);
    onClose();
  };

  const isEditMode = !!editingCourse;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
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
                type="text" required name="name" value={formData.name} onChange={handleInputChange}
                placeholder="e.g. BSc (Hons) in Artificial Intelligence"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all">
                  <option value="Full Time (FT)">Full Time (FT)</option>
                  <option value="Part Time (PT)">Part Time (PT)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                <select name="duration" value={formData.duration} onChange={handleInputChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:ring-2 focus:ring-[#6366f1]/20 focus:border-[#6366f1] outline-none transition-all">
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                  <option value="4 Years">4 Years</option>
                  <option value="5 Years">5 Years</option>
                </select>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Minimum Requirements</h3>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 mb-5">
                <div>
                  <span className="font-semibold text-gray-700 block">A/L Pass Required</span>
                  <span className="text-xs text-gray-500">Student must have passed GCE Advanced Level.</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={formData.alPass} onChange={handleToggleAlPass} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#6366f1]"></div>
                </label>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-3">A/L Mathematics (Minimum Grade)</label>
                <div className="flex gap-3">
                  {['A', 'B', 'C', 'S', 'W'].map(grade => (
                    <button
                      key={`math-${grade}`} type="button" onClick={() => handleGradeSelect('alMath', grade)}
                      className={`w-12 h-12 rounded-xl font-bold text-sm transition-all duration-200 ${formData.alMath === grade ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/30 scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">O/L English (Minimum Grade)</label>
                <div className="flex gap-3">
                  {['A', 'B', 'C', 'S', 'W'].map(grade => (
                    <button
                      key={`eng-${grade}`} type="button" onClick={() => handleGradeSelect('olEnglish', grade)}
                      className={`w-12 h-12 rounded-xl font-bold text-sm transition-all duration-200 ${formData.olEnglish === grade ? 'bg-[#6366f1] text-white shadow-lg shadow-[#6366f1]/30 scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </form>
        </div>

        <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl text-gray-600 font-semibold hover:bg-gray-200 transition">
            Cancel
          </button>
          <button type="submit" form="courseForm" className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-2.5 px-8 rounded-xl transition-all duration-200 shadow-md shadow-[#6366f1]/20">
            {isEditMode ? "Update Course" : "Save Course"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddCourseModal;