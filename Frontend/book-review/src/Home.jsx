import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom'; 
const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [limit] = useState(10); 
  const [authorFilter, setAuthorFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [hasMore, setHasMore] = useState(true); 

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHasMore(true); 

    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page);
      queryParams.append('limit', limit);
      if (authorFilter) queryParams.append('author', authorFilter);
      if (genreFilter) queryParams.append('genre', genreFilter);

      const response = await fetch(`http://localhost:5000/books?${queryParams.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch books.');
      }

      const data = await response.json();
      setBooks(prevBooks => {
        if (page === 1) return data;
        return [...prevBooks, ...data];
      });
      if (data.length < limit) {
        setHasMore(false);
      }

    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message || 'An unexpected error occurred while fetching books.');
    } finally {
      setLoading(false);
    }
  }, [page, limit, authorFilter, genreFilter]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleApplyFilters = () => {
    setBooks([]); 
    setPage(1);
  };

  return (
    <div className="container mt-4">
      <h2>Available Books</h2>
      <div className="mb-4 p-3 bg-light rounded">
        <h4>Filter Books</h4>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="authorFilter" className="form-label">Author:</label>
            <input
              type="text"
              className="form-control"
              id="authorFilter"
              value={authorFilter}
              onChange={(e) => setAuthorFilter(e.target.value)}
              placeholder="Filter by author"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="genreFilter" className="form-label">Genre:</label>
            <input
              type="text"
              className="form-control"
              id="genreFilter"
              value={genreFilter}
              onChange={(e) => setGenreFilter(e.target.value)}
              placeholder="Filter by genre"
            />
          </div>
          <div className="col-md-4 d-flex align-items-end">
            <button className="btn btn-primary w-100" onClick={handleApplyFilters}>Apply Filters</button>
          </div>
        </div>
      </div>

      {loading && <div className="text-center mt-3">Loading books...</div>}
      {error && <div className="alert alert-danger mt-3" role="alert">{error}</div>}

      {!loading && !error && books.length === 0 && (
        <div className="alert alert-info mt-3">No books found matching your criteria.</div>
      )}

      {!loading && !error && books.length > 0 && (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {books.map((book) => (
            <div className="col" key={book._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
                  <p className="card-text"><small className="text-body-secondary">Genre: {book.genre}</small></p>
                  <Link to={`/books/${book._id}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && hasMore && books.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-secondary" onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;