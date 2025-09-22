import CreateTask from "../others/CreateTask";
import AllTask from "../others/AllTask";

const AdminDashboard = () => {
  return (
    <div className="h-screen w-full p-7">
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;
