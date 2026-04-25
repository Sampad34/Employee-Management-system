import React, { useState } from "react";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";

const Login = ({ handleLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const success = handleLogin(email, password);
      if (!success) {
        setError("Invalid email or password. Please try again.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center">
      {/* Card container */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 md:p-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-300 mt-2">Sign in to your account</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Email field */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-400
                         focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                         transition-all duration-200"
              />
            </div>
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-400
                         focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                         transition-all duration-200"
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="#" className="text-sm text-emerald-400 hover:text-emerald-300 transition">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 
                     text-white text-lg font-semibold py-3 rounded-lg shadow-lg 
                     transform hover:scale-[1.02] transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-300">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition"
              >
                Sign up
              </button>
            </p>
          </div>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-center text-gray-400 mb-3">Demo Credentials:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
            <div className="bg-white/5 p-2 rounded">
              <span className="text-emerald-400">Admin:</span> admin@me.com / 123
            </div>
            <div className="bg-white/5 p-2 rounded">
              <span className="text-emerald-400">Employee:</span> employee1@example.com / 123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;