import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Main from '../Layout/Main';
import LoadingCategories from '../Loading/Categories';
import LoadingProductList from '../Loading/ProductList';
import Results from './Results';
import SearchDefault from './SearchDefault';
import './SearchResults.scss';

class SearchResults extends Component {
  componentDidMount() {
    const { location, searchTerm, searchAction, productSearch } = this.props;
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('term');

    const directPageView = isEmpty(searchTerm) && !isEmpty(searchQuery);
    if (directPageView) {
      searchAction(searchQuery);
    }

    if (!isEmpty(searchQuery)) {
      productSearch(searchQuery);
    }
  }

  componentDidUpdate(prevProps) {
    const { productSearch, searchTerm, storeId } = this.props;
    const searchTermChanged = prevProps.searchTerm !== searchTerm;
    const storeChanged = prevProps.storeId !== storeId;

    if (!isEmpty(searchTerm) && (searchTermChanged || storeChanged)) {
      productSearch(searchTerm);
    }
  }

  render() {
    const {
      allCategories,
      categories,
      isFetching,
      loadMoreMatches,
      productCount,
      products,
      searchTerm
    } = this.props;

    return isFetching ? (
      <Main>
        <LoadingProductList />
        <LoadingCategories />
      </Main>
    ) : (
      <>
        {searchTerm ? (
          <Results
            searchTerm={searchTerm}
            loadMoreMatches={loadMoreMatches}
            products={products}
            productCount={productCount}
            categories={categories}
            allCategories={allCategories}
          />
        ) : (
          <SearchDefault />
        )}
      </>
    );
  }
}

SearchResults.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  categories: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  isFetching: PropTypes.bool.isRequired,
  loadMoreMatches: PropTypes.instanceOf(Object).isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  productCount: PropTypes.number,
  products: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  productSearch: PropTypes.func.isRequired,
  searchAction: PropTypes.func.isRequired,
  searchTerm: PropTypes.string,
  storeId: PropTypes.string.isRequired
};

SearchResults.defaultProps = {
  searchTerm: '',
  products: [],
  productCount: 0,
  categories: []
};

export default SearchResults;
