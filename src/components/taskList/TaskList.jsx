import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

// Main component to display all tasks assigned to an employee
const TaskList = ({ data }) => {
  const handleStatusChange = (task, status) => {
    console.log(task, status); // placeholder for future state update
  };

  return (
    <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.tasks.map((task, id) => (
        <>
          {task.newTask && (
            <div key={`new-${id}`}>
              <NewTask data={task} />
            </div>
          )}

          {task.active && (
            <div key={`active-${id}`}>
              <AcceptTask
                data={task}
                onComplete={(task) => handleStatusChange(task, "completed")}
                onFail={(task) => handleStatusChange(task, "failed")}
              />
            </div>
          )}

          {task.completed && (
            <div key={`done-${id}`}>
              <CompleteTask data={task} />
            </div>
          )}

          {task.failed && (
            <div key={`fail-${id}`}>
              <FailedTask data={task} />
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default TaskList;
