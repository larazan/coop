import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import AppHeader from '.';
import { basketSelectors } from '../../../store/basket';
import { categoriesActions } from '../../../store/categories';
import {
  isFetching as isFetchingCategories,
  noCategoriesLoaded,
  rootCategories
} from '../../../store/categories/selectors';
import { getStoreId, getOrderStoreId } from '../../../store/order/selectors';
import { searchActions } from '../../../store/search';
import {
  getCategoryMatches,
  getPredictions,
  isFetching as isFetchingSearch
} from '../../../store/search/selectors';
import { getPostcode } from '../../../store/shoppingIn/selectors';

// ! TODO: make sure values aren't closed over and
// ! props are updated when we think they should be
const mapStateToPropsFactory = state => {
  const basketTotal = basketSelectors.formattedBasketTotal()(state);
  const selector = getCategoryMatches();
  const { categories: searchCategories } = selector(state);

  const mapStateToProps = {
    basketTotal,
    menu: {
      categories: rootCategories(state),
      isFetchingCategories: isFetchingCategories(state),
      needsCategories: noCategoriesLoaded()(state)
    },
    search: {
      products: getPredictions(state),
      categories: searchCategories,
      relatedTerms: state.search.relatedTerms,
      searchTerm: state.search.term || '',
      isFetching: isFetchingSearch(state),
      errors: state.search.errors
    },
    postcode: getPostcode(state),
    storeId: getStoreId(state),
    showShoppingInPanel: !!(getPostcode(state) && !getOrderStoreId(state))
  };

  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  loadCategories: storeId => dispatch(categoriesActions.loadCategories(storeId)),
  searchAction: term => dispatch(searchActions.search(term)),
  clearSearch: () => dispatch(searchActions.clearSearch())
});

const mergeProps = (stateProps, { searchAction, clearSearch, ...dispatchProps }) => ({
  ...stateProps,
  ...dispatchProps,
  search: { ...stateProps.search, searchAction, clearSearch }
});

export default connect(
  mapStateToPropsFactory,
  mapDispatchToProps,
  mergeProps
)(withRouter(AppHeader));
