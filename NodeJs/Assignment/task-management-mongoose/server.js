const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());


const taskRoutes = require('./routes/tasks');


// Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/TaskDB';
mongoose.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => {
console.error('❌ Failed to connect to MongoDB', err);
process.exit(1);
});


// Routes
app.use('/api/tasks', taskRoutes);


// Health check
app.get('/', (req, res) => res.json({ status: 'ok', now: new Date() }));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));