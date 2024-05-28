import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [book, setBook] = useState({
    author: '',
    description: '',
    bookname: '',
    image: '',
    reference: '',
    price: ''
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1000/api/v1/add', book);
      setBook({ author: '', description: '', bookname: '', image: '', reference: '', price: '' });
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a Book</h2>
      <form onSubmit={handleSubmit} className="p-4" style={{ background: '#f8f9fa', borderRadius: '8px' }}>
        <div className="form-group mb-3">
          <label htmlFor="author">Author</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <textarea name="description" value={book.description} onChange={handleChange} className="form-control" rows="4" required></textarea>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="bookname">Book Name</label>
          <input type="text" name="bookname" value={book.bookname} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="image">Image URL</label>
          <input type="text" name="image" value={book.image} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="reference">Reference URL</label>
          <input type="text" name="reference" value={book.reference} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Price</label>
          <input type="number" name="price" value={book.price} onChange={handleChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;
