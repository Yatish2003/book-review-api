
const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  const existing = await Review.findOne({ user: req.user.id, book: req.params.id });
  if (existing) return res.status(400).json({ error: 'Review already exists' });

  const review = await Review.create({ ...req.body, user: req.user.id, book: req.params.id });
  await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } });
  res.status(201).json(review);
};

exports.updateReview = async (req, res) => {
  const review = await Review.findOne({ _id: req.params.id, user: req.user.id });
  if (!review) return res.status(404).json({ error: 'Review not found' });

  Object.assign(review, req.body);
  await review.save();
  res.json(review);
};

exports.deleteReview = async (req, res) => {
  const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!review) return res.status(404).json({ error: 'Review not found' });
  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
  res.json({ message: 'Review deleted' });
};

