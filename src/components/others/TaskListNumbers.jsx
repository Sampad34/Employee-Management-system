// Task summary component (displays task counts by type)
const TaskListNumbers = ({ data }) => {
  return (
    <div className="w-full mt-8 px-4">
      {/* Flex container for summary cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {/* New Task Card */}
        <div className="flex-1 basis-[250px] max-w-[300px] rounded-xl bg-blue-400 hover:bg-blue-600 transition-all duration-100 shadow-lg p-6 text-white text-center">
          <h2 className="text-4xl font-extrabold">{data.taskCounts.newTask}</h2>
          <h3 className="text-lg mt-2 font-medium">New Tasks</h3>
        </div>

        {/* Completed Task Card */}
        <div className="flex-1 basis-[250px] max-w-[300px] rounded-xl bg-green-400 hover:bg-green-600 transition-all duration-100 shadow-lg p-6 text-white text-center">
          <h2 className="text-4xl font-extrabold">{data.taskCounts.completed}</h2>
          <h3 className="text-lg mt-2 font-medium">Completed Tasks</h3>
        </div>

        {/* Active Task Card */}
        <div className="flex-1 basis-[250px] max-w-[300px] rounded-xl bg-yellow-400 hover:bg-yellow-600 transition-all duration-100 shadow-lg p-6 text-gray-900 text-center">
          <h2 className="text-4xl font-extrabold">{data.taskCounts.active}</h2>
          <h3 className="text-lg mt-2 font-medium">Active Tasks</h3>
        </div>

        {/* Failed Task Card */}
        <div className="flex-1 basis-[250px] max-w-[300px] rounded-xl bg-red-400 hover:bg-red-600 transition-all duration-100 shadow-lg p-6 text-white text-center">
          <h2 className="text-4xl font-extrabold">{data.taskCounts.failed}</h2>
          <h3 className="text-lg mt-2 font-medium">Failed Tasks</h3>
        </div>
      </div>
    </div>
  );
};

export default TaskListNumbers;
