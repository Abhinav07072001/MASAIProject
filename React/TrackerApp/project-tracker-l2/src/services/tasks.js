import { ref, push, set, remove, update, onValue } from "firebase/database";
import { db, auth } from "../lib/firebase";

// Listen for tasks in a project
export function listenToTasks(projectId, callback) {
  const user = auth.currentUser;
  if (!user) return () => {};
  const tasksRef = ref(db, `projects/${user.uid}/${projectId}/tasks`);
  const unsub = onValue(tasksRef, (snapshot) => {
    const data = snapshot.val() || {};
    const tasks = Object.entries(data).map(([id, t]) => ({ id, ...t }));
    callback(tasks);
  });
  return unsub;
}

// Add task
export async function addTask(projectId, task) {
  const user = auth.currentUser;
  const newRef = push(ref(db, `projects/${user.uid}/${projectId}/tasks`));
  await set(newRef, {
    ...task,
    completed: false,
    createdAt: Date.now(),
  });
}

// Toggle complete
export async function toggleTask(projectId, taskId, completed) {
  const user = auth.currentUser;
  await update(ref(db, `projects/${user.uid}/${projectId}/tasks/${taskId}`), {
    completed,
  });
}

// Update task (e.g., title/priority)
export async function updateTask(projectId, taskId, updates) {
  const user = auth.currentUser;
  await update(ref(db, `projects/${user.uid}/${projectId}/tasks/${taskId}`), updates);
}

// Delete task
export async function deleteTask(projectId, taskId) {
  const user = auth.currentUser;
  await remove(ref(db, `projects/${user.uid}/${projectId}/tasks/${taskId}`));
}
