import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4">
      {/* Card container */}
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-gray-600 p-10">
        {/* Header */}
        <h2 className="text-3xl font-extrabold text-center text-white drop-shadow-sm">
          Welcome Back
        </h2>
        <p className="text-center text-gray-300 mt-2 mb-10 font-medium">
          Sign in to continue
        </p>

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-200 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-600 rounded-lg px-4 py-3 text-gray-900 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-500"
            />
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-200 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-600 rounded-lg px-4 py-3 text-gray-900 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 placeholder-gray-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-bold py-3 rounded-lg shadow-lg transform hover:scale-[1.02] transition-all duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
