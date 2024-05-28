import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/getBooks');
        if (response.data && response.data.books && Array.isArray(response.data.books)) {
          setBooks(response.data.books);
        } else {
          console.error('API response is not in the expected format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="container my-4">
      <h1 className="text-center my-4 bg-primary text-white p-3 rounded shadow">Virtual Library</h1>
      <Link to="/add-book" className="btn btn-primary mb-4">Add a Book</Link>
      <div className="row">
        {books.length > 0 ? (
          books.map(book => (
            <div key={book._id} className="col-md-4 mb-4">
              <div className="card h-100">
                <img 
                  src={book.image} 
                  className="card-img-top img-fluid" 
                  alt={book.bookname} 
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{book.bookname}</h5>
                  <p className="card-text"><strong>Author:</strong> {book.author}</p>
                  <p className="card-text"><strong>Price:</strong> ${book.price}</p>
                  <a href={book.reference} target="_blank" rel="noopener noreferrer" className="btn btn-primary mb-2">Buy Here</a>
                  <button 
                    className="btn btn-info mb-2" 
                    data-toggle="modal" 
                    data-target={`#descriptionModal${book._id}`}
                  >
                    View Description
                  </button>
                  <Link to={`/summary/${book._id}`} className="btn btn-secondary mt-auto">View Summary</Link>
                </div>
              </div>

              {/* Modal for Book Description */}
              <div className="modal fade" id={`descriptionModal${book._id}`} tabIndex="-1" role="dialog" aria-labelledby={`descriptionModalLabel${book._id}`} aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id={`descriptionModalLabel${book._id}`}>{book.bookname} - Description</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {book.description}
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No books available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;
