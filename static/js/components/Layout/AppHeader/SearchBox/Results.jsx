import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/fp/isEmpty';
import { Link } from 'react-router-dom';
import formatPrice from '../../../../utils/formatPrice';
import { categoryLink, productLink } from '../../../../utils/linkFactory';

const Results = ({
  searchTerm,
  products,
  categories,
  relatedTerms,
  isFetching,
  closeSuggestions,
  ...otherProps
}) => {
  // If it's fetching do nothing, since you'll be evaluating without any data
  // TODO: Find a more graceful way to do this check (if possible!)
  if (isFetching) {
    return null;
  }

  const noResultsFound =
    !isFetching &&
    !(searchTerm === '') &&
    isEmpty(products) &&
    isEmpty(categories) &&
    isEmpty(relatedTerms);

  // TODO: this could be returned from the API as an error rather than being
  // calculated as a derived value
  const noResultsFoundMsg = noResultsFound ? (
    <li key="search-error" className="app-search--results--error">
      Sorry, but we could not find any products matching your search terms.
    </li>
  ) : null;

  const prodList = !isEmpty(products)
    ? products.map(({ id, name, imageUrl, price }) => (
        <Link
          to={productLink(id)}
          className="app-search--results--product"
          key={id}
          tabIndex={0}
          onClick={closeSuggestions}
        >
          <span className="product-img">
            <img src={imageUrl} alt={name} width="24" height="24" />
          </span>
          <span className="product-label">{name}</span>
          <span className="product-price">{formatPrice(price)}</span>
        </Link>
      ))
    : null;

  const catList = !isEmpty(categories)
    ? categories.map(({ id, name }) => (
        <Link
          to={categoryLink(id)}
          className="app-search--results--item"
          key={id}
          tabIndex={0}
          onClick={closeSuggestions}
        >{`View all ${name}`}</Link>
      ))
    : null;

  // FIXME: removing this functionality temporarily
  // https://trello.com/c/vjlWyowM/346-related-search-terms-dont-work
  const relatedList = !isEmpty(relatedTerms) // eslint-disable-line no-unused-vars
    ? relatedTerms.map(t => (
        <Link
          className="app-search--results--item"
          key={t}
          to={`/search?term=${encodeURI(t)}`}
          tabIndex={0}
          onClick={closeSuggestions}
        >
          <span>{t}</span>
        </Link>
      ))
    : null;

  const viewAllLink =
    noResultsFound || searchTerm === '' ? null : (
      <Link
        to={`/search?term=${encodeURI(searchTerm)}`}
        tabIndex={0}
        className="app-search--results--item"
        key={searchTerm}
        onClick={closeSuggestions}
      >
        View all results
      </Link>
    );

  return isFetching
    ? null
    : !noResultsFound && (
        <div className="app-search--results">
          <div
            className="app-search--results-wrapper"
            data-testid="search-suggestions"
            {...otherProps}
          >
            {[noResultsFoundMsg, prodList, catList, viewAllLink]}
          </div>
        </div>
      );
};

Results.propTypes = {
  searchTerm: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  relatedTerms: PropTypes.arrayOf(PropTypes.string.isRequired),
  isFetching: PropTypes.bool.isRequired,
  bind: PropTypes.instanceOf(Object)
};

Results.defaultProps = {
  searchTerm: '',
  products: [],
  categories: [],
  relatedTerms: [],
  bind: null
};

export default Results;
