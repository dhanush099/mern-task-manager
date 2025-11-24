// client/src/components/TaskForm.jsx
import React, { useState, useEffect } from "react";

const TaskForm = ({ onSave, initialTask, isEditing, setIsEditing }) => {
  const initialState = initialTask || { title: "", description: "" };
  const [taskData, setTaskData] = useState(initialState);

  // Update state when initialTask prop changes (for editing)
  useEffect(() => {
    setTaskData(initialState);
  }, [initialTask]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData.title.trim()) return;

    onSave(taskData);
    setTaskData({ title: "", description: "" }); // Reset form after saving
    if (isEditing) setIsEditing(false); // Close edit view
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-inner mb-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        {isEditing ? "Edit Task" : "Add New Task"}
      </h2>

      <div className="mb-4">
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="Task Title (Required)"
          required
          className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          placeholder="Task Description (Optional)"
          rows="3"
          className="w-full p-3 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>
      <div className="flex justify-end space-x-3">
        {isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-150"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={`font-bold py-2 px-4 rounded transition duration-150 ${
            isEditing
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {isEditing ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
