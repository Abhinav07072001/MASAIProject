const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/task.routes');


dotenv.config();
const app = express();
app.use(express.json());


// Connect DB
connectDB();


// Routes
app.use('/api', taskRoutes);


// Health
app.get('/', (req, res) => res.json({ ok: true }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));