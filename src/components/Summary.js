import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Summary = () => {
  const { bookId } = useParams();
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.post(`http://localhost:1000/api/summary/${bookId}`);
        setSummary(response.data.summary);
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };
    if (bookId) fetchSummary();
  }, [bookId]);

  const parseSummary = (text) => {
    const parts = text.split("**").filter(Boolean);
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        return <div key={index} className="mb-3">{part}</div>;
      } else {
        return <h2 key={index} className="my-3">{part}</h2>;
      }
    });
  };

  return (
    <div className="summary-container text-center p-4" style={{ background: 'linear-gradient(135deg, #6b6e73, #414345)', color: '#fff', minHeight: '100vh' }}>
      <div className="container">
        <h2 className="mb-4" style={{ fontWeight: 'bold' }}>Generated Summary</h2>
        <div className="summary-content" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '20px', borderRadius: '10px' }}>
          {parseSummary(summary)}
        </div>
      </div>
    </div>
  );
};

export default Summary;
