import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { listenToProjects, deleteProject } from "../services/projects";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsub = listenToProjects(setProjects);
    return () => unsub();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">{user?.email}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Add Project Button */}
      <Link
        to="/projects/new"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-600 transition"
      >
        + Add Project
      </Link>

      {/* Project List */}
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet. Start by adding one!</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white shadow rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
              <p className="text-sm text-gray-600 mb-4">
                {p.description || "No description"}
              </p>

              {/* Actions */}
              <div className="flex justify-between items-center">
                <Link
                  to={`/projects/${p.id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View
                </Link>
                <div className="flex gap-4">
                  {/* Edit Button */}
                  <Link
                    to={`/projects/${p.id}/edit`}
                    className="text-yellow-600 font-medium hover:underline"
                  >
                    Edit
                  </Link>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="text-red-600 font-medium hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
