/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import SearchResults from '.';
import { rootCategories } from '../../store/categories/selectors';
import { productSelectors } from '../../store/products';
import {
  loadMoreSearchMatches,
  loadProductsMatchingSearchTerm
} from '../../store/products/actions';
import { isFetchingList as isFetchingProducts } from '../../store/products/selectors';
import { searchActions } from '../../store/search';
import { getCategoryMatches, isFetching as isFetchingSearch } from '../../store/search/selectors';
import { getStoreId } from '../../store/order/selectors';

// ! TODO: make sure values aren't closed over and
// ! props are updated when we think they should be
const mapStateToPropsFactory = (state, ownProps) => {
  const searchCategories = getCategoryMatches();
  const productMatches = productSelectors.productsMatchingSearchTerm();
  const { categories: suggestedCategories } = searchCategories(state);
  const { location } = ownProps.history;

  const mapStateToProps = {
    allCategories: rootCategories(state),
    categories: suggestedCategories,
    errors: state.search.errors,
    isFetching: isFetchingSearch(state) || isFetchingProducts(state),
    location,
    productCount: productSelectors.productCount(productMatches)(state),
    products: productMatches(state),
    searchTerm: state.search.term,
    storeId: getStoreId(state)
  };

  return mapStateToProps;
};

const loadProducts = searchTerm => loadProductsMatchingSearchTerm({ searchTerm });
const mapDispatchToProps = dispatch => ({
  searchAction: term => dispatch(searchActions.search(term)),
  productSearch: term => dispatch(loadProducts(term))
});

const SearchResultsPage = props => {
  const { searchTerm } = props;
  const loadMoreMatches = loadMoreSearchMatches({ searchTerm });
  return <SearchResults loadMoreMatches={loadMoreMatches} {...props} />;
};

export default connect(mapStateToPropsFactory, mapDispatchToProps)(SearchResultsPage);
