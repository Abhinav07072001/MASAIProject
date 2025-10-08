const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.routes');
const profileRoutes = require('./routes/profile.routes');

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/one_to_one_db')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
