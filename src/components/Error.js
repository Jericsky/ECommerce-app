import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="alert alert-danger" role="alert">
          <h1 className="display-1">404</h1>
          <p className="lead">Oops! Page not found.</p>
          <hr />
          <p className="mb-0">The page you are looking for might have been removed or is temporarily unavailable.</p>
          <Link to={'/'} className="btn btn-primary mt-3">Go to Home</Link>
        </div>
      </div>
    </div>
  );
}
