import React, { useState } from "react";

// ✅ Define type for form data
type FeedbackData = {
  name: string;
  email: string;
  rating: number | "";
  feedback: string;
};

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Number(value) : value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.rating || !formData.feedback) {
      alert("Please fill out all fields!");
      return;
    }

    setSubmitted(true);

    // Clear form
    setFormData({
      name: "",
      email: "",
      rating: "",
      feedback: "",
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Customer Feedback Form</h2>

          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
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
              value={formData.email}
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
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </label>
          <br /><br />

          <label>
            Feedback:
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
            />
          </label>
          <br /><br />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Thank you for your feedback! 🎉</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Rating:</strong> {formData.rating}</p>
          <p><strong>Feedback:</strong> {formData.feedback}</p>
          <button onClick={() => setSubmitted(false)}>Submit Again</button>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
