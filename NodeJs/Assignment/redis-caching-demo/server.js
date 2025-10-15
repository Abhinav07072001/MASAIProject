const express = require("express");
const Redis = require("ioredis");
const bodyParser = require("body-parser");
const db = require("./data");

const app = express();
const redis = new Redis(); // default localhost:6379

app.use(bodyParser.json());

const CACHE_KEY = "items:all";

// GET /items — fetch all items (with caching)
app.get("/items", async (req, res) => {
  try {
    // 1️⃣ Try to fetch from Redis
    const cachedData = await redis.get(CACHE_KEY);

    if (cachedData) {
      console.log("🟢 Cache hit - data from Redis");
      return res.json(JSON.parse(cachedData));
    }

    console.log("🔴 Cache miss - fetching from database");
    const items = db.getItems();

    // 2️⃣ Store data in Redis with TTL (60 seconds)
    await redis.set(CACHE_KEY, JSON.stringify(items), "EX", 60);

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST /items — add a new item and invalidate cache
app.post("/items", async (req, res) => {
  try {
    const { name } = req.body;
    const newItem = { id: Date.now(), name };
    db.addItem(newItem);

    console.log("🧹 Cache invalidated after POST");
    await redis.del(CACHE_KEY); // invalidate cache

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// PUT /items/:id — update item and invalidate cache
app.put("/items/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    db.updateItem(id, updatedData);

    console.log("🧹 Cache invalidated after PUT");
    await redis.del(CACHE_KEY); // invalidate cache

    res.json({ message: "Item updated" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// DELETE /items/:id — delete item and invalidate cache
app.delete("/items/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    db.deleteItem(id);

    console.log("🧹 Cache invalidated after DELETE");
    await redis.del(CACHE_KEY); // invalidate cache

    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
