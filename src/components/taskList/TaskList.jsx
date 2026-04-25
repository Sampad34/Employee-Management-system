import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import { useState } from "react";

const TaskList = ({ data }) => {
  const [userData, setUserData] = useState(data);
  const [tasks, setTasks] = useState(data.tasks || []);

  const handleStatusChange = (taskToUpdate, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.taskTitle === taskToUpdate.taskTitle && task.taskDate === taskToUpdate.taskDate) {
        return {
          ...task,
          newTask: newStatus === "new" ? true : false,
          active: newStatus === "active" ? true : false,
          completed: newStatus === "completed" ? true : false,
          failed: newStatus === "failed" ? true : false
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    
    // Update the task counts
    const newCount = updatedTasks.filter(t => t.newTask).length;
    const activeCount = updatedTasks.filter(t => t.active && !t.newTask && !t.completed && !t.failed).length;
    const completedCount = updatedTasks.filter(t => t.completed).length;
    const failedCount = updatedTasks.filter(t => t.failed).length;
    
    const updatedUserData = {
      ...userData,
      tasks: updatedTasks,
      taskCounts: {
        newTask: newCount,
        active: activeCount,
        completed: completedCount,
        failed: failedCount
      }
    };
    
    setUserData(updatedUserData);
    
    // Update localStorage
    const allEmployees = JSON.parse(localStorage.getItem("userData") || "[]");
    const updatedAll = allEmployees.map(emp => 
      emp.email === userData.email ? updatedUserData : emp
    );
    localStorage.setItem("userData", JSON.stringify(updatedAll));
    
    // Update logged in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser?.data?.email === userData.email) {
      localStorage.setItem("loggedInUser", JSON.stringify({ ...loggedInUser, data: updatedUserData }));
    }
  };

  const getFilteredTasks = (type) => {
    return tasks.filter(task => {
      if (type === "new") return task.newTask;
      if (type === "active") return task.active && !task.newTask && !task.completed && !task.failed;
      if (type === "completed") return task.completed;
      if (type === "failed") return task.failed;
      return false;
    });
  };

  const newTasks = getFilteredTasks("new");
  const activeTasks = getFilteredTasks("active");
  const completedTasks = getFilteredTasks("completed");
  const failedTasks = getFilteredTasks("failed");

  if (!tasks || tasks.length === 0) {
    return (
      <div className="w-full mt-10 p-12 text-center bg-gray-800/30 rounded-2xl">
        <p className="text-gray-400 text-lg">No tasks assigned yet</p>
        <p className="text-gray-500 text-sm mt-2">Tasks assigned to you will appear here</p>
      </div>
    );
  }

  return (
    <div className="w-full mt-10">
      {/* Task Sections */}
      {newTasks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">New Tasks ({newTasks.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {newTasks.map((task, id) => (
              <NewTask key={`new-${id}`} data={task} />
            ))}
          </div>
        </div>
      )}

      {activeTasks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-yellow-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">Active Tasks ({activeTasks.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeTasks.map((task, id) => (
              <AcceptTask
                key={`active-${id}`}
                data={task}
                onComplete={(task) => handleStatusChange(task, "completed")}
                onFail={(task) => handleStatusChange(task, "failed")}
              />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-green-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">Completed Tasks ({completedTasks.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {completedTasks.map((task, id) => (
              <CompleteTask key={`done-${id}`} data={task} />
            ))}
          </div>
        </div>
      )}

      {failedTasks.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-1 h-8 bg-red-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-white">Failed Tasks ({failedTasks.length})</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {failedTasks.map((task, id) => (
              <FailedTask key={`fail-${id}`} data={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;