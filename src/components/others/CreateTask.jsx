import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();

  const task = {
  taskTitle,
  taskDescription,
  taskDate,
  category,
  active: true,          // ✅ Make the task visible immediately
  newTask: true,
  failed: false,
  completed: false,
};


    let found = false;

    const updatedUserData = userData.map((emp) => {
      if (emp.firstName === assignTo) {
        found = true;
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
      setErrorMsg('❌ Employee not found. Please check the first name.');
      setSuccessMsg('');
      return;
    }

    setUserData(updatedUserData);
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    const currentLoggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
    if (
      currentLoggedIn?.role === "employee" &&
      currentLoggedIn.data.firstName === assignTo
    ) {
      const updatedEmployee = updatedUserData.find(
        (emp) => emp.firstName === assignTo
      );
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ role: "employee", data: updatedEmployee })
      );
    }

    setTaskTitle('');
    setCategory('');
    setAssignTo('');
    setTaskDate('');
    setTaskDescription('');
    setErrorMsg('');
    setSuccessMsg('✅ Task successfully assigned!');
  };

  return (
    <div className="p-6 mt-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">Create New Task</h2>

      {errorMsg && (
        <div className="text-red-400 mb-4 bg-red-900 p-3 rounded-md border border-red-500">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="text-green-400 mb-4 bg-green-900 p-3 rounded-md border border-green-500">
          {successMsg}
        </div>
      )}

      <form
        onSubmit={submitHandler}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Task Title</label>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full py-2 px-3 rounded bg-gray-700 text-white border border-gray-500 focus:outline-none focus:border-emerald-400"
              type="text"
              placeholder="e.g., Create login page"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Due Date</label>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="w-full py-2 px-3 rounded bg-gray-700 text-white border border-gray-500 focus:outline-none focus:border-emerald-400"
              type="date"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Assign To</label>
            <input
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="w-full py-2 px-3 rounded bg-gray-700 text-white border border-gray-500 focus:outline-none focus:border-emerald-400"
              type="text"
              placeholder="Employee First Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-2 px-3 rounded bg-gray-700 text-white border border-gray-500 focus:outline-none focus:border-emerald-400"
              type="text"
              placeholder="e.g., Design, Development"
            />
          </div>
        </div>

        <div className="flex flex-col h-full justify-between">
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Task Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full h-40 resize-none py-2 px-3 rounded bg-gray-700 text-white border border-gray-500 focus:outline-none focus:border-emerald-400"
              placeholder="Describe the task here..."
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
