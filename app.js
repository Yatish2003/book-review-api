const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const cors = require('cors'); // <--- ADD THIS LINE

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Welcome to the Book Review API');
});

app.use(authRoutes);

app.use('/api/books', bookRoutes);
app.use('/api/reviews', reviewRoutes);

module.exports = app;