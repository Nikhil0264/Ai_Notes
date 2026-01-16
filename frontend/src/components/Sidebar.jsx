import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full bg-[#172842] border-r border-blue-900 flex flex-col">

      {/* User Info */}
      <div className="p-6 border-b border-blue-900 flex items-center gap-4">
        <img
          src="https://i.pravatar.cc/100"
          alt="user"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="font-semibold">      Nikhil Padul</h2>
          <p className="text-sm text-blue-300">     Frontend Dev</p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4 space-y-3">
        <Link to="/allNotes">
          <SidebarBtn label="📒 All Notes" />
        </Link>
        <SidebarBtn label="⭐ Favorites" />
        <SidebarBtn label="📁 Archive" />
        <SidebarBtn label="📊 Analytics" />
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-blue-900">
        <SidebarBtn label="⚙ Settings" />
      </div>
    </div>
  );
};

const SidebarBtn = ({ label }) => (
  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-600 transition">
    {label}
  </button>
);

export default Sidebar;
