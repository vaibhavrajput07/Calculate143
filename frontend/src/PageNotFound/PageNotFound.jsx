import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css'; 

function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <div className="page-not-found-content">
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <Link to="/" className="go-home-btn">Go Home</Link>
      </div>
    </div>
  );
}

export default PageNotFound;
