// data.js
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017"; // local MongoDB URL
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("salesDB");
    const sales = db.collection("sales");

    // Clear old data
    await sales.deleteMany({});

    // Insert dataset
    await sales.insertMany([
      { saleId: 1, product: "Laptop", category: "Electronics", amount: 800, date: "2024-01-10", region: "North" },
      { saleId: 2, product: "Mobile", category: "Electronics", amount: 500, date: "2024-02-15", region: "South" },
      { saleId: 3, product: "Shoes", category: "Fashion", amount: 200, date: "2024-01-20", region: "North" },
      { saleId: 4, product: "TV", category: "Electronics", amount: 1000, date: "2024-03-05", region: "West" },
      { saleId: 5, product: "T-shirt", category: "Fashion", amount: 50, date: "2024-02-25", region: "East" },
      { saleId: 6, product: "Headphones", category: "Electronics", amount: 150, date: "2024-04-01", region: "South" },
      { saleId: 7, product: "Watch", category: "Fashion", amount: 300, date: "2024-03-15", region: "North" },
      { saleId: 8, product: "Laptop", category: "Electronics", amount: 850, date: "2024-02-12", region: "West" },
      { saleId: 9, product: "Shoes", category: "Fashion", amount: 250, date: "2024-04-18", region: "South" }
    ]);

    console.log("✅ Data inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting data:", err);
  } finally {
    await client.close();
  }
}

run();
