const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../tasks.json");

function readTasks() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data).tasks;
}

function writeTasks(tasks) {
  fs.writeFileSync(dbPath, JSON.stringify({ tasks }, null, 2));
}

module.exports = { readTasks, writeTasks };
