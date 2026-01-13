import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

function AdminDashboard() {
  const { role } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 text-red-600 px-6 py-4 rounded-lg shadow">
          🚫 Access Denied
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      await api.post("/notes", formData);
      alert("Note uploaded successfully");
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (error) {
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      
      {/* Page Header */}
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          📤 Upload Learning Material
        </h1>
        <p className="text-gray-500 mt-2">
          Share notes and resources with students
        </p>
      </div>

      {/* Card */}
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Introduction to React"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Brief overview of the topic covered in this note"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         outline-none transition resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload PDF
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-2 border-dashed
                                border-blue-300 rounded-xl cursor-pointer
                                hover:border-blue-500 transition
                                bg-blue-50/50">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <span className="text-3xl">📄</span>
                  <p className="text-sm text-gray-600 mt-2">
                    {file ? file.name : "Click to upload or drag & drop PDF"}
                  </p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  required
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-semibold text-lg
                         bg-gradient-to-r from-blue-600 to-indigo-600
                         hover:from-blue-700 hover:to-indigo-700
                         shadow-md hover:shadow-lg transition-all"
            >
              🚀 Upload Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;
