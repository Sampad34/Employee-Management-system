import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { id } = useParams();
  const [userData] = useContext(AuthContext);

  const navigate = useNavigate();

  const employee = userData.find(
    (user) => user.email === decodeURIComponent(id)
  );

  if (!employee) {
    return (
      <div className="p-6 text-white bg-red-600 rounded-xl mt-6 text-center">
        <h2>Employee not found.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 mt-6 bg-gray-800 text-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">
        {employee.firstName} {employee.lastName}
      </h2>
      <p className="text-sm text-gray-300 mb-2">Email: {employee.email}</p>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Task Summary</h3>
        <ul className="space-y-1 text-sm">
          <li>New Tasks: {employee.taskCounts.newTask}</li>
          <li>Active: {employee.taskCounts.active}</li>
          <li>Completed: {employee.taskCounts.completed}</li>
          <li>Failed: {employee.taskCounts.failed}</li>
        </ul>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Tasks</h3>
        {employee.tasks && employee.tasks.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {employee.tasks.map((task, idx) => (
              <li key={idx} className="bg-gray-700 p-3 rounded-lg">
                <h4 className="font-semibold">{task.taskTitle}</h4>
                <p>{task.taskDescription}</p>
                <p className="text-gray-400 text-xs">Due: {task.taskDate}</p>
                <p>
                  Status:{" "}
                  {task.completed
                    ? "Completed"
                    : task.failed
                    ? "Failed"
                    : task.active
                    ? "Active"
                    : "New"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks assigned.</p>
        )}
      </div>
       
       {/* button to go back to dashboard */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default ProfilePage;
