const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/book_rental_system')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
