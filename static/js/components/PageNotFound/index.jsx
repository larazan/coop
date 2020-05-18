import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.scss';

const PageNotFound = ({ location }) => (
  <>
    <div data-testid="page-error" className="page-error">
      <h1 className="page-error--title">Page Not Found</h1>
      <p>{location.pathname}</p>
      <div className="page-error--content">
        <p>We’re sorry, but we could not find the page you were looking for.</p>
      </div>
      <div className="page-error--footer">
        <Link to="/" className="btn btn--primary" data-testid="homepage-link">
          Back to homepage
        </Link>
      </div>
    </div>
  </>
);

PageNotFound.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired
};

export default PageNotFound;
