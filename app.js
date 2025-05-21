const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Book Review API');
  });
app.use('/signup', authRoutes);
app.use('/login', authRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);

module.exports = app;