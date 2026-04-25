import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Filter, Users } from "lucide-react";

const AllTask = () => {
  const [userData] = useContext(AuthContext);
  const navigate = useNavigate();

  const [filterFailedOnly, setFilterFailedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("firstName");

  const filteredData = filterFailedOnly
    ? userData.filter((user) => user.taskCounts.failed > 0)
    : userData;

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "firstName") {
      return a.firstName.localeCompare(b.firstName);
    } else {
      return (b.taskCounts[sortBy] || 0) - (a.taskCounts[sortBy] || 0);
    }
  });

  const total = userData.reduce(
    (acc, curr) => {
      acc.newTask += curr.taskCounts.newTask || 0;
      acc.active += curr.taskCounts.active || 0;
      acc.completed += curr.taskCounts.completed || 0;
      acc.failed += curr.taskCounts.failed || 0;
      return acc;
    },
    { newTask: 0, active: 0, completed: 0, failed: 0 }
  );

  if (!userData || userData.length === 0) {
    return (
      <div className="p-6 mt-6 bg-gray-800 rounded-2xl text-white text-center">
        <Users className="w-12 h-12 mx-auto mb-3 text-gray-500" />
        <h2 className="text-xl font-semibold">No employee data found.</h2>
        <p className="text-gray-400 mt-2">Create tasks to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden mt-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 p-6">
        <h2 className="text-2xl font-bold text-white">Employee Task Overview</h2>
        <p className="text-gray-300 mt-1">Track and manage employee tasks</p>
      </div>

      {/* Filter & Sort Controls */}
      <div className="p-4 border-b border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-800/30">
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-gray-400" />
          <label className="text-white font-medium mr-2">Sort By:</label>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 text-white px-4 py-1.5 rounded-lg border border-gray-600 focus:ring-2 focus:ring-emerald-500"
          >
            <option value="firstName">Name</option>
            <option value="newTask">New Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-white font-medium">Show Failed Only:</label>
          <button
            onClick={() => setFilterFailedOnly(!filterFailedOnly)}
            className={`px-4 py-1.5 rounded-lg transition-all ${
              filterFailedOnly 
                ? "bg-red-500 text-white" 
                : "bg-gray-700 text-gray-300"
            }`}
          >
            {filterFailedOnly ? "✓ Enabled" : "Disabled"}
          </button>
        </div>
      </div>

      {/* Table - Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <div className="bg-emerald-600 text-white py-3 px-5 grid grid-cols-5 gap-4">
          <h2 className="text-base font-semibold">Employee</h2>
          <h3 className="text-base font-semibold">New Tasks</h3>
          <h3 className="text-base font-semibold">Active</h3>
          <h3 className="text-base font-semibold">Completed</h3>
          <h3 className="text-base font-semibold">Failed</h3>
        </div>

        <div className="divide-y divide-gray-700">
          {sortedData.map((elem, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/employee/${encodeURIComponent(elem.email)}`)}
              className={`grid grid-cols-5 gap-4 px-5 py-3 text-sm text-gray-200 
                       hover:bg-gray-700/50 transition cursor-pointer
                       ${idx % 2 === 0 ? "bg-gray-800/30" : "bg-gray-800/10"}`}
            >
              <div>
                <p className="font-medium">{elem.firstName} {elem.lastName}</p>
                <p className="text-xs text-gray-400">{elem.email}</p>
              </div>
              <div className="text-blue-400 font-semibold">{elem.taskCounts.newTask || 0}</div>
              <div className="text-yellow-400 font-semibold">{elem.taskCounts.active || 0}</div>
              <div className="text-green-400 font-semibold">{elem.taskCounts.completed || 0}</div>
              <div className="text-red-400 font-semibold">{elem.taskCounts.failed || 0}</div>
            </div>
          ))}

          {/* Total Row */}
          <div className="grid grid-cols-5 gap-4 px-5 py-3 text-sm text-white font-bold bg-emerald-700/50">
            <h2>Total</h2>
            <h3>{total.newTask}</h3>
            <h3>{total.active}</h3>
            <h3>{total.completed}</h3>
            <h3>{total.failed}</h3>
          </div>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden p-4 space-y-3">
        {sortedData.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/employee/${encodeURIComponent(elem.email)}`)}
            className="bg-gray-700/30 rounded-xl p-4 cursor-pointer hover:bg-gray-700/50 transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-white">
                  {elem.firstName} {elem.lastName}
                </h3>
                <p className="text-xs text-gray-400">{elem.email}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-500/10 rounded-lg p-2 text-center">
                <p className="text-blue-400 text-xs">New</p>
                <p className="text-white font-bold">{elem.taskCounts.newTask || 0}</p>
              </div>
              <div className="bg-yellow-500/10 rounded-lg p-2 text-center">
                <p className="text-yellow-400 text-xs">Active</p>
                <p className="text-white font-bold">{elem.taskCounts.active || 0}</p>
              </div>
              <div className="bg-green-500/10 rounded-lg p-2 text-center">
                <p className="text-green-400 text-xs">Completed</p>
                <p className="text-white font-bold">{elem.taskCounts.completed || 0}</p>
              </div>
              <div className="bg-red-500/10 rounded-lg p-2 text-center">
                <p className="text-red-400 text-xs">Failed</p>
                <p className="text-white font-bold">{elem.taskCounts.failed || 0}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;