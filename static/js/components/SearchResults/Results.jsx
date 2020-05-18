import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import CategoryList from '../Category/CategoryList';
import PageHeader from '../PageHeader';
import { ProductListVertical } from '../ProductList';
import { SupplierBannerBySearchTerm } from '../SupplierBanner';
import NoResultsFound from './NoResultsFound';
import { ItemRestrictionAlert } from '../Covid-19';

const Results = ({
  searchTerm,
  loadMoreMatches,
  products,
  productCount,
  categories,
  allCategories
}) => {
  return isEmpty(products) ? (
    <NoResultsFound
      searchTerm={searchTerm}
      categories={(!isEmpty(categories) && categories) || allCategories}
    />
  ) : (
    <div className="search-results" data-testid="search-results">
      {isEmpty(products) ? null : (
        <>
          <ItemRestrictionAlert />
          <div className="container">
            <PageHeader title={`Results for ‘${searchTerm}’`} />
          </div>
          <SupplierBannerBySearchTerm searchTerm={searchTerm} />
          <ProductListVertical
            keyForProductCount={searchTerm}
            loadMore={loadMoreMatches}
            productCount={productCount}
            products={products}
          />
        </>
      )}

      {isEmpty(categories) ? null : (
        <div className="search-results--categories">
          <div className="container">
            <header className="page--header">
              <h2 className="page--title">Related categories</h2>
            </header>
          </div>
          <div className="search-results--items">
            <CategoryList categories={categories} />
          </div>
        </div>
      )}
    </div>
  );
};

Results.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  productCount: PropTypes.number.isRequired,
  categories: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  allCategories: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  loadMoreMatches: PropTypes.instanceOf(Object).isRequired
};

Results.defaultProps = {
  products: [],
  categories: []
};

export default Results;
