import React from "react";
import type { Task } from "../types/task";


interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask }) => {
  return (
    <li style={{ margin: "8px 0", listStyle: "none" }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          marginLeft: "8px",
        }}
      >
        {task.description} - <strong>{task.priority}</strong>
      </span>
    </li>
  );
};

export default TaskItem;
