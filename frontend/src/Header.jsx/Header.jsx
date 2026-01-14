import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Toggle dark mode and save in localStorage
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  // Apply theme to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-4 flex justify-between items-center transition-colors duration-300">
      
      {/* Left side: Logo if logged in */}
      {token && (
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <img src="/logo.png" alt="AI Notes Logo" className="w-8 h-8" />
          AI Notes
        </Link>
      )}

      {/* Right side: buttons */}
      <div className="flex items-center gap-4">

        <Link
          to="/"
          className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
        >
          Home
        </Link>

        {!token ? (
          <>
            <Link
              to="/login"
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Role: {role}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>

            {/* Dark/Light toggle */}
            <button
              onClick={toggleDarkMode}
              className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
