// src/types/task.ts

// Priority ko union type banate hain (enum ke jagah)
export type Priority = "Low" | "Medium" | "High";

// Task interface
export interface Task {
  id: number;
  description: string;
  priority: Priority;
  completed: boolean;
}
