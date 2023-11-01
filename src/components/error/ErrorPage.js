import React from 'react';
import { Link } from 'react-router-dom';

import './ErrorPage.scss';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-header">Oops!</h1>
      <p className="error-msg">Something went wrong.</p>
      <Link to="/" className="error-link">
        <i className="icon-home">Go back to home page.</i>
      </Link>
    </div>
  );
};

export default ErrorPage;
