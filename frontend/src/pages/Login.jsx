import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user.role);
      navigate("/allnotes");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 px-4">
      
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-3 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 
                          flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            🎓
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to your learning dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300
                         focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                         outline-none transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-blue-600 to-indigo-600
                       hover:from-blue-700 hover:to-indigo-700
                       shadow-md hover:shadow-lg transition-all
                       disabled:opacity-60"
          >
            {loading ? "Signing you in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-8">
          📘 Smart Learning. Better Future.
        </p>
      </div>
    </div>
  );
}

export default Login;
