const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Book Review API');
});

// Mount authRoutes without a path prefix
app.use(authRoutes);

// Other routes
app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

module.exports = app;
