const express = require("express");
const app = express();

// Import routes
const apiRoutes = require("./routes/api");

app.use(express.json());

// Use routes
app.use("/api", apiRoutes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
