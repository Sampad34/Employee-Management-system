import React, { useState } from "react";
import { Mail, Lock, LogIn, User, UserPlus, ArrowLeft } from "lucide-react";

const Register = ({ handleRegister, onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 3) {
      setError("Password must be at least 3 characters");
      return;
    }

    setLoading(true);
    
    setTimeout(() => {
      const success = handleRegister(firstName, lastName, email, password);
      if (!success) {
        setError("User with this email already exists");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 md:p-10">
        {/* Back button */}
        <button
          onClick={onSwitchToLogin}
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
          <p className="text-gray-300 mt-2">Join us and start managing tasks</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  type="text"
                  placeholder="John"
                  className="w-full pl-9 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg 
                           text-white placeholder-gray-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                           transition-all duration-200"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  type="text"
                  placeholder="Doe"
                  className="w-full pl-9 pr-3 py-2 bg-white/10 border border-white/20 rounded-lg 
                           text-white placeholder-gray-400
                           focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                           transition-all duration-200"
                />
              </div>
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg 
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
                placeholder="Create a password"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-400
                         focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                         transition-all duration-200"
              />
            </div>
          </div>

          {/* Confirm Password field */}
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type="password"
                placeholder="Confirm your password"
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg 
                         text-white placeholder-gray-400
                         focus:ring-2 focus:ring-emerald-500 focus:border-transparent 
                         transition-all duration-200"
              />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 
                     text-white text-lg font-semibold py-3 rounded-lg shadow-lg 
                     transform hover:scale-[1.02] transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;