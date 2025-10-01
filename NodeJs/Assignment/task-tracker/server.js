const express = require("express");
const app = express();
const taskRoutes = require("./routes/taskRoutes");

app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Task Tracker API running on port ${PORT}`));
