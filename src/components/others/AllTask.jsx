import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AllTask = () => {
  const [userData] = useContext(AuthContext);
  const navigate = useNavigate();

  // Local state to manage sorting and filtering
  const [filterFailedOnly, setFilterFailedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("firstName");

  // Filter logic: optionally show only employees with failed > 0
  const filteredData = filterFailedOnly
    ? userData.filter((user) => user.taskCounts.failed > 0)
    : userData;

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "firstName") {
      return a.firstName.localeCompare(b.firstName);
    } else {
      return b.taskCounts[sortBy] - a.taskCounts[sortBy];
    }
  });

  // Total task summary across all employees
  const total = userData.reduce(
    (acc, curr) => {
      acc.newTask += curr.taskCounts.newTask;
      acc.active += curr.taskCounts.active;
      acc.completed += curr.taskCounts.completed;
      acc.failed += curr.taskCounts.failed;
      return acc;
    },
    { newTask: 0, active: 0, completed: 0, failed: 0 }
  );

  // If no employee data
  if (!userData || userData.length === 0) {
    return (
      <div className="p-6 mt-6 bg-gray-800 text-white rounded-xl shadow-lg text-center">
        <h2 className="text-xl font-semibold">No employee data found.</h2>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl mt-6 shadow-lg">
      {/* Filter & Sort Controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <label className="text-white font-medium mr-2">Sort By:</label>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 text-white px-4 py-1 rounded"
          >
            <option value="firstName">Name</option>
            <option value="newTask">New Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="text-white font-medium mr-2">
            Show Failed Only:
          </label>
          <input
            type="checkbox"
            checked={filterFailedOnly}
            onChange={() => setFilterFailedOnly(!filterFailedOnly)}
          />
        </div>
      </div>

      {/* Table Header */}
      <div className="bg-emerald-600 text-white py-3 px-5 grid grid-cols-5 gap-4 rounded-t-lg">
        <h2 className="text-base font-semibold">Employee (Email)</h2>
        <h3 className="text-base font-semibold">New Tasks</h3>
        <h3 className="text-base font-semibold">Active</h3>
        <h3 className="text-base font-semibold">Completed</h3>
        <h3 className="text-base font-semibold">Failed</h3>
      </div>

      {/* Employee Rows */}
      <div className="divide-y divide-gray-700 bg-gray-900 rounded-b-lg overflow-hidden">
        {sortedData.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/employee/${encodeURIComponent(elem.email)}`)} // Replace with navigation logic
            className={`grid grid-cols-5 gap-4 px-5 py-3 text-sm text-gray-200 hover:bg-gray-700 transition duration-200 cursor-pointer ${
              idx % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
            }`}
          >
            {/* Use full name and email for clarity */}
            <h2 className="font-medium">
              {elem.firstName} {elem.lastName} ({elem.email})
            </h2>
            <h3 className="text-blue-400 font-semibold">
              {elem.taskCounts.newTask}
            </h3>
            <h3 className="text-yellow-400 font-semibold">
              {elem.taskCounts.active}
            </h3>
            <h3 className="text-green-400 font-semibold">
              {elem.taskCounts.completed}
            </h3>
            <h3 className="text-red-500 font-semibold">
              {elem.taskCounts.failed}
            </h3>
          </div>
        ))}

        {/* Total Count Row */}
        <div className="grid grid-cols-5 gap-4 px-5 py-3 text-sm text-white font-bold bg-emerald-700">
          <h2>Total</h2>
          <h3>{total.newTask}</h3>
          <h3>{total.active}</h3>
          <h3>{total.completed}</h3>
          <h3>{total.failed}</h3>
        </div>
      </div>
    </div>
  );
};

export default AllTask;
