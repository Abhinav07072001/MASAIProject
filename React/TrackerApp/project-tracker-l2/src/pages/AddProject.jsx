import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProject } from "../services/projects";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProject({ title, description });
    navigate("/dashboard");
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Add Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
          required
        />
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}
