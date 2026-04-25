import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Calendar, User, Tag, AlignLeft, Type, X } from 'lucide-react';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    const task = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      active: true,
      newTask: true,
      failed: false,
      completed: false,
    };

    let found = false;
    let matchedEmployee = null;

    const updatedUserData = userData.map((emp) => {
      // Match by firstName (case insensitive)
      if (emp.firstName.toLowerCase() === assignTo.toLowerCase()) {
        found = true;
        matchedEmployee = emp;
        return {
          ...emp,
          tasks: [...emp.tasks, task],
          taskCounts: {
            ...emp.taskCounts,
            newTask: emp.taskCounts.newTask + 1,
            active: emp.taskCounts.active + 1,
          },
        };
      }
      return emp;
    });

    if (!found) {
      setErrorMsg(`❌ Employee "${assignTo}" not found. Please check the first name.`);
      setSuccessMsg('');
      setTimeout(() => setErrorMsg(''), 3000);
      return;
    }

    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    // Update logged in user if it's the same employee
    const currentLoggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (
      currentLoggedIn?.role === "employee" &&
      currentLoggedIn.data?.firstName?.toLowerCase() === assignTo.toLowerCase()
    ) {
      const updatedEmployee = updatedUserData.find(
        (emp) => emp.firstName.toLowerCase() === assignTo.toLowerCase()
      );
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "employee", data: updatedEmployee })
      );
    }

    // Reset form
    setTaskTitle('');
    setCategory('');
    setAssignTo('');
    setTaskDate('');
    setTaskDescription('');
    setSuccessMsg(`✅ Task successfully assigned to ${matchedEmployee?.firstName || assignTo}!`);
    setErrorMsg('');
    setTimeout(() => setSuccessMsg(''), 3000);
    setShowForm(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 cursor-pointer"
        onClick={() => setShowForm(!showForm)}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Create New Task</h2>
            <p className="text-emerald-100 mt-1">Assign tasks to team members</p>
          </div>
          <button className="text-white text-3xl font-bold">
            {showForm ? '−' : '+'}
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="p-6">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 text-sm">
              {successMsg}
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Task Title
                  </label>
                  <div className="relative">
                    <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                               text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      type="text"
                      placeholder="e.g., Create login page"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Due Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={taskDate}
                      onChange={(e) => setTaskDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                               text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      type="date"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Assign To (First Name)
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={assignTo}
                      onChange={(e) => setAssignTo(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                               text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      type="text"
                      placeholder="Employee First Name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                               text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      type="text"
                      placeholder="e.g., Design, Development"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Task Description
                </label>
                <div className="relative">
                  <AlignLeft className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-full h-48 resize-none pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg 
                             text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Describe the task in detail..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 
                         text-white font-semibold rounded-lg shadow-lg transition-all"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTask;