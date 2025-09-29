const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// Utility functions to read/write db.json
function readDB() {
    const data = fs.readFileSync("db.json", "utf-8");
    return JSON.parse(data);
}

function writeDB(data) {
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
}

// --------------------Routes--------------------------------
// Test Route
app.get("/", (req, res) => {
    res.send("Crud api is running");
});

// Post Route
app.post("/dishes", (req, res) => {
    const db = readDB();
    db.dishes.push(req.body);
    writeDB(db);
    res.status(201).json(req.body);
});

// Read all dishes
app.get("/dishes", (req, res) => {
    const db = readDB();
    res.json(db.dishes);
});

// ---------------- Updated Search Route ----------------
app.get("/dishes/get", (req, res) => {
    const db = readDB();
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ message: "Please provide a name query" });
    }

    // Debug logs
    console.log("DB dishes:", db.dishes);
    console.log("Searching for:", name);

    // Trim spaces and make lowercase for robust search
    const results = db.dishes.filter(d =>
        d.name.toLowerCase().trim().includes(name.toLowerCase().trim())
    );

    if (results.length > 0) {
        res.json(results);
    } else {
        res.json({ message: "No dish found" });
    }
});

// Get one dish only
app.get("/dishes/:id", (req, res) => {
    const db = readDB();
    const id = Number(req.params.id);
    const dish = db.dishes.find(d => d.id === id);
    if (dish) {
        res.json(dish);
    } else {
        res.status(404).json({ message: "Dish not found" });
    }
});

// Update dish Put
app.put("/dishes/:id", (req, res) => {
    const db = readDB();
    const id = Number(req.params.id);
    const index = db.dishes.findIndex(d => d.id === id);
    if (index !== -1) {
        db.dishes[index] = { ...db.dishes[index], ...req.body };
        writeDB(db);
        res.json(db.dishes[index]);
    } else {
        res.status(404).json({ message: "dish not found" });
    }
});

// Delete Dish
app.delete("/dishes/:id", (req, res) => {
    const db = readDB();
    const id = Number(req.params.id);
    const index = db.dishes.findIndex(d => d.id === id);
    if (index !== -1) {
        const deleted = db.dishes.splice(index, 1);
        writeDB(db);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ message: "Dish not Found" });
    }
});

// Handle undefined request
app.use((req, res) => {
    res.status(404).json({ message: "404 not found" });
});

app.listen(4000, () => {
    console.log("server is working fine on port 4000");
});
