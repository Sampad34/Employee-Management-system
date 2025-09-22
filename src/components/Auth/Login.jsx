import React, { useState } from "react";

const Login = ({ handleLogin }) => {
  // State variables to track email and password input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    handleLogin(email, password); // Call the login function passed via props
    setEmail(""); // Reset email input
    setPassword(""); // Reset password input
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-100 to-white">
      {/* Outer container with border and padding */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-emerald-400 p-10">
        {/* Login title */}
        <h2 className="text-3xl font-bold text-emerald-700 text-center mb-8">Login to Your Account</h2>

        {/* Login form */}
        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-6"
        >
          {/* Email input */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-emerald-500 focus:ring-2 focus:ring-emerald-400 transition duration-300 font-medium text-md py-3 px-6 rounded-lg placeholder-gray-400 focus:outline-none"
            type="email"
            placeholder="Enter your email"
          />

          {/* Password input */}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-emerald-500 focus:ring-2 focus:ring-emerald-400 transition duration-300 font-medium text-md py-3 px-6 rounded-lg placeholder-gray-400 focus:outline-none"
            type="password"
            placeholder="Enter password"
          />

          {/* Submit button */}
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
