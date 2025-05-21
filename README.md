A RESTful API for a basic book review system built with Node.js, Express, MongoDB, and JWT-based authentication.

🚀 Features

User signup and login with JWT auth

Add and fetch books with filters and pagination

Post and manage reviews (1 per user per book)

Search books by title or author

🔧 Tech Stack

Node.js + Express.js

MongoDB + Mongoose

JWT for authentication

dotenv for configuration


📦 Setup Instructions

Clone the repo:
git clone https://github.com/Yatish2003/book-review-api.git
cd book-review-api


Install dependencies:
npm install



 Example API Requests
 Signup:
 curl -X POST http://localhost:5000/signup -H "Content-Type: application/json" -d '{"username": "john", "password": "123456"}'

Login:
 curl -X POST http://localhost:5000/login -H "Content-Type: application/json" -d '{"username": "john", "password": "123456"}'


 Add Book:
 curl -X POST http://localhost:5000/books -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"title": "Book Title", "author": "Author", "genre": "Genre"}'

 Get All Books:
 curl http://localhost:5000/books?page=1&limit=5&author=John&genre=Fiction

 Search Books:
 curl http://localhost:5000/books/search?query=harry

 Submit Review:
 curl -X POST http://localhost:5000/books/<bookId>/reviews -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"rating": 5, "comment": "Great book!"}'