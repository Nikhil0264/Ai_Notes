import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex bg-[#0f1c33] text-white relative">

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow"
      >
        {isOpen ? "Hide Menu" : "See Sidebar"}
      </button>

      {/* Sidebar */}
      {isOpen && (
        <div className="w-[20%] min-w-[250px]">
          <Sidebar />
        </div>
      )}

      {/* Main Content */}
      <div className={`${isOpen ? "w-[80%]" : "w-full"} transition-all duration-300`}>
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;
