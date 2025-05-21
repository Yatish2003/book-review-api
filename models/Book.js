// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});

module.exports = mongoose.model('Book', bookSchema);


// {
//     "_id": ObjectId,
//     "title": String,
//     "author": String,
//     "genre": String,
//     "reviews": [ObjectId]
//   }