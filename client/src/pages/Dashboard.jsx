// client/src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import api, { getConfig } from "../utils/api";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch Tasks from API
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", getConfig());
      setTasks(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add New Task
  const handleSave = async (taskData) => {
    try {
      if (isEditing && currentTask) {
        // UPDATE Task
        const res = await api.put(
          `/tasks/${currentTask._id}`,
          taskData,
          getConfig()
        );
        setTasks(tasks.map((t) => (t._id === currentTask._id ? res.data : t)));
      } else {
        // ADD New Task
        const res = await api.post("/tasks", taskData, getConfig());
        setTasks([res.data, ...tasks]); // Add new task to the top
      }
      // Reset editing state
      setIsEditing(false);
      setCurrentTask(null);
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // Delete Task
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`, getConfig());
        setTasks(tasks.filter((task) => task._id !== id));
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  // Toggle Task Completion
  const handleToggleComplete = async (id, completedStatus) => {
    try {
      const res = await api.put(
        `/tasks/${id}`,
        { completed: completedStatus },
        getConfig()
      );
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  // Set task for editing
  const startEdit = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
  };

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading Tasks...</div>;
  }

  const tasksToDisplay = isEditing
    ? tasks.filter((t) => t._id !== currentTask._id)
    : tasks;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        My Task Dashboard
      </h1>

      {/* Task Form (Add or Edit Mode) */}
      <div className="mb-8">
        {isEditing ? (
          <TaskForm
            onSave={handleSave}
            initialTask={currentTask}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : (
          <TaskForm onSave={handleSave} isEditing={false} />
        )}
      </div>

      {/* Task List */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Your Tasks ({tasks.length})
      </h2>
      <div className="space-y-4">
        {tasksToDisplay.length > 0 ? (
          tasksToDisplay.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
              setIsEditing={() => startEdit(task)}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">
            You have no tasks! Start adding some above.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
