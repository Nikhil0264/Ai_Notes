import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [adminSecret, setAdminSecret] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  // Password strength calculation
  const handlePasswordChange = (value) => {
    setPassword(value);
    let strength = 0;
    if (value.length > 5) strength += 1;
    if (/[A-Z]/.test(value)) strength += 1;
    if (/[0-9]/.test(value)) strength += 1;
    if (/[@$!%*?&]/.test(value)) strength += 1;
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If role is admin, require admin secret
    if (role === "admin" && !adminSecret) {
      alert("Admin secret is required!");
      return;
    }

    if (role === "admin" && adminSecret != "Nikhil@123") {
      alert("Admin secret is required!");
      return;
    }

    
    try {
      await api.post("/auth/register", {
        name,
        email,
        role,
        password,
      });
      alert("Registered successfully 🎉");
      navigate("/login");
    } catch (err) {
        console.log(err)
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const strengthColor = [
    "bg-gray-300",
    "bg-red-500",
    "bg-yellow-400",
    "bg-blue-500",
    "bg-green-600",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 transform hover:scale-105 transition-transform duration-300">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 
                          flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            🎓
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-1">Join our e-learning platform today!</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-300
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl border border-gray-300
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         outline-none transition"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-gray-300
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Admin Secret (conditional) */}
          {role === "admin" && (
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Admin Secret
              </label>
              <input
                type="text"
                placeholder="Enter admin secret key"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-300
                           focus:ring-2 focus:ring-red-500 focus:border-red-500
                           outline-none transition"
              />
            </div>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-300
                           focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                           outline-none transition pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {/* Password Strength Meter */}
            <div className="h-2 w-full rounded-full bg-gray-200 mt-2 overflow-hidden">
              <div
                className={`h-2 ${strengthColor[passwordStrength]} transition-all duration-300`}
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl font-semibold text-white text-lg
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       hover:from-blue-700 hover:to-indigo-700
                       shadow-md hover:shadow-lg transition-all"
          >
            🚀 Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
