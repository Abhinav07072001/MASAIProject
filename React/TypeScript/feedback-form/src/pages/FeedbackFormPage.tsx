import React from "react";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../context/FeedbackContext";

const FeedbackFormPage: React.FC = () => {
  const { feedback, setFeedback } = useFeedback();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.name || !feedback.email || !feedback.rating || !feedback.feedback) {
      alert("Please fill all fields before continuing!");
      return;
    }

    navigate("/summary"); // ✅ Navigate only if valid
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <h2>Customer Feedback Form</h2>

        <label>
          Name:
          <input
            type="text"
            name="name"
            value={feedback.name}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={feedback.email}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Rating (1–5):
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={feedback.rating}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Feedback:
          <textarea
            name="feedback"
            value={feedback.feedback}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <button type="submit">Go to Summary ➡️</button>
      </form>
    </div>
  );
};

export default FeedbackFormPage;
