import React, { useState } from "react";
import type { Task, Priority } from "./types/task";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Low");
  const [filter, setFilter] = useState<"All" | "Completed" | "Incomplete">(
    "All"
  );

  // Add new task
  const addTask = () => {
    if (description.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      description,
      priority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setDescription("");
    setPriority("Low");
  };

  // Toggle completion
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📝 Task Manager</h1>

      {/* Add Task */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Enter task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "16px" }}>
        <label>Filter: </label>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "All" | "Completed" | "Incomplete")
          }
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>

      {/* Task List */}
      <TaskList tasks={filteredTasks} toggleTask={toggleTask} />
    </div>
  );
};

export default App;
