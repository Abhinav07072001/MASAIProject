const express = require("express");
const app = express();
const adminRoutes = require("./routes/adminRoutes");
const readerRoutes = require("./routes/readerRoutes");
const loggerMiddleware = require("./middlewares/loggerMiddleware");

app.use(express.json());
app.use(loggerMiddleware);

app.use("/admin", adminRoutes);
app.use("/reader", readerRoutes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
