import { ListChecks, CheckCircle, Clock, AlertCircle } from "lucide-react";

const TaskListNumbers = ({ data }) => {
  const taskCounts = data.taskCounts || {
    newTask: 0,
    completed: 0,
    active: 0,
    failed: 0
  };

  const cards = [
    {
      title: "New Tasks",
      count: taskCounts.newTask,
      color: "from-blue-500 to-blue-600",
      icon: ListChecks,
      textColor: "text-blue-400"
    },
    {
      title: "Completed Tasks",
      count: taskCounts.completed,
      color: "from-green-500 to-green-600",
      icon: CheckCircle,
      textColor: "text-green-400"
    },
    {
      title: "Active Tasks",
      count: taskCounts.active,
      color: "from-yellow-500 to-orange-500",
      icon: Clock,
      textColor: "text-yellow-400"
    },
    {
      title: "Failed Tasks",
      count: taskCounts.failed,
      color: "from-red-500 to-red-600",
      icon: AlertCircle,
      textColor: "text-red-400"
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${card.color} rounded-2xl shadow-lg p-6 text-white 
                       transform hover:scale-105 transition-all duration-300 cursor-pointer`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-90">{card.title}</p>
                <p className="text-4xl font-bold mt-2">{card.count}</p>
              </div>
              <card.icon className="w-12 h-12 opacity-50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListNumbers;