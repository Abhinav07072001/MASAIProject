import { ref, push, set, onValue, remove, update } from "firebase/database";
import { db, auth } from "../lib/firebase";

// Listen for real-time updates
export function listenToProjects(callback) {
  const user = auth.currentUser;
  if (!user) return () => {};
  const projectsRef = ref(db, `projects/${user.uid}`);
  const unsub = onValue(projectsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const projects = Object.entries(data).map(([id, p]) => ({ id, ...p }));
    callback(projects);
  });
  return unsub; // to stop listening
}

// Add a project
export async function addProject(project) {
  const user = auth.currentUser;
  const newRef = push(ref(db, `projects/${user.uid}`));
  await set(newRef, {
    ...project,
    createdAt: Date.now(),
  });
}

// Delete a project
export async function deleteProject(projectId) {
  const user = auth.currentUser;
  await remove(ref(db, `projects/${user.uid}/${projectId}`));
}

// Update a project
export async function updateProject(projectId, updates) {
  const user = auth.currentUser;
  await update(ref(db, `projects/${user.uid}/${projectId}`), updates);
}
