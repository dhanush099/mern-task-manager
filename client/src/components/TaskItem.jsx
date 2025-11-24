// client/src/components/TaskItem.jsx
import React from "react";

const TaskItem = ({
  task,
  onDelete,
  onUpdate,
  onToggleComplete,
  setIsEditing,
}) => {
  // Toggle completion status
  const handleToggle = () => {
    onToggleComplete(task._id, !task.completed);
  };

  return (
    <div
      className={`flex justify-between items-center p-4 my-2 border-l-4 rounded shadow-md ${
        task.completed
          ? "bg-green-100 border-green-500"
          : "bg-white border-blue-500"
      }`}
    >
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="mr-3 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
        />
        <span
          className={`text-lg font-medium ${
            task.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {task.title}
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 rounded-full text-xs transition duration-150"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full text-xs transition duration-150"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
