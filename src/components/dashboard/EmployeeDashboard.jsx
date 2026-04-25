import TaskListNumbers from '../others/TaskListNumbers';
import TaskList from '../taskList/TaskList';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const EmployeeDashboard = (props) => {
  if (!props.data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
          <p className="text-white mt-4">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">
          Welcome back, {props.data.firstName}! 👋
        </h1>
        <p className="text-blue-100 mt-2">
          Here's your task summary for today
        </p>
      </div>
      
      <TaskListNumbers data={props.data} />
      <TaskList data={props.data} />
    </motion.div>
  );
};

export default EmployeeDashboard;