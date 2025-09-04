import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listenToTasks, addTask, toggleTask, deleteTask } from "../services/tasks";

export default function ProjectDetails() {
  const { id } = useParams(); // projectId
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    const unsub = listenToTasks(id, setTasks);
    return () => unsub();
  }, [id]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTask(id, { title, priority });
    setTitle("");
    setPriority("low");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Project Tasks</h1>

      {/* Add Task */}
      <form onSubmit={handleAdd} className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => toggleTask(id, task.id, e.target.checked)}
                className="mr-3"
              />
              <span
                className={`${
                  task.completed ? "line-through text-gray-400" : ""
                } font-medium`}
              >
                {task.title}
              </span>
              <span
                className={`ml-3 px-2 py-1 text-xs rounded ${
                  task.priority === "high"
                    ? "bg-red-100 text-red-600"
                    : task.priority === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {task.priority}
              </span>
            </div>
            <button
              onClick={() => deleteTask(id, task.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
