import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from "../components/AuthContext";

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(false); 

  const { user } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null); 
    setSuccess(false); 

    // if (!user || !user.token) {
    //   setError("You must be logged in to add a book.");
    //   return;
    // }

    const newBook = { title, author, genre };

    try {
      const response = await fetch('http://localhost:5000/api/books', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`, 
        },
        body: JSON.stringify(newBook),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add book.');
      }

      setSuccess(true);
      setTitle('');
      setAuthor('');
      setGenre('');
     
      setTimeout(() => {
        navigate('/'); 
      }, 2000); 
    } catch (err) {
      console.error('Error adding book:', err);
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {success && <div className="alert alert-success" role="alert">Book added successfully! Redirecting...</div>}

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author:</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Genre:</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;