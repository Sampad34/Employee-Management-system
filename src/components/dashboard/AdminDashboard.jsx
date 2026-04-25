import CreateTask from "../others/CreateTask";
import AllTask from "../others/AllTask";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-emerald-100 mt-2">Manage tasks and monitor employee progress</p>
      </div>
      
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;