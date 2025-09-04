import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditProject() {
  const { id } = useParams(); // get project ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // fetch existing project data
  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await axios.get(
          `https://your-firebase-url/projects/${id}.json`
        );
        setFormData(res.data || { title: "", description: "" });
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    }
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://your-firebase-url/projects/${id}.json`,
        formData
      );
      navigate("/");
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Project Title"
          className="w-full px-3 py-2 border rounded-lg"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="w-full px-3 py-2 border rounded-lg"
          rows="4"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
