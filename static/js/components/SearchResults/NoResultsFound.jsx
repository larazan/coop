import React from 'react';
import PropTypes from 'prop-types';
import categoryProps from '../propTypes/category';
import CategoryList from '../Category/CategoryList';

const NoResultsFound = ({ searchTerm, categories }) => (
  <div className="search-results search-results--no-results">
    <div className="container">
      <header className="page--header">
        <h2 className="page--title">No products found for ‘{searchTerm}’</h2>
      </header>
      <p>Try a different search term or browse products by category instead:</p>
    </div>
    <div className="search-results--items">
      <CategoryList categories={categories} />
    </div>
  </div>
);

NoResultsFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape(categoryProps)).isRequired
};

export default NoResultsFound;
