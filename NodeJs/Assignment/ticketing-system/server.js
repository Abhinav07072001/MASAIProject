const express = require("express");
const app = express();
const ticketRoutes = require("./routes/ticketRoutes");

app.use(express.json());

// Routes
app.use("/tickets", ticketRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "404 Not Found" });
});

// Start Server
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
