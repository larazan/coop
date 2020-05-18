/* eslint-disable react/prop-types */
import { get } from 'lodash/fp';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Category from '.';
import { basketActions } from '../../store/basket';
import { isFetching, categoryById } from '../../store/categories/selectors';
import { getStoreId } from '../../store/order/selectors';
import { productActions, productSelectors } from '../../store/products';
import { loadMoreProducts } from '../../store/products/actions';
import { isFetchingList as isFetchingProducts } from '../../store/products/selectors';

const getProducts = productSelectors.productsOfCurrentCategory();

const mapStateToProps = (state, ownProps) => {
  const categoryId = get(['match', 'params', 'id'], ownProps);
  return {
    isFetching: isFetching(state) || isFetchingProducts(state),
    categoriesLoaded: state.categories.hasInitialLoad,
    category: categoryById(state, categoryId),
    categoryId,
    products: getProducts(state),
    productCount: productSelectors.productCount(getProducts)(state),
    storeId: getStoreId(state)
  };
};

const mapDispatchToProps = {
  loadInitialProducts: productActions.loadInitialProducts,
  changeBasketItemQuantity: basketActions.changeBasketQuantity
};

class CategoryPage extends Component {
  componentDidMount() {
    const { categoryId, loadInitialProducts } = this.props;

    loadInitialProducts({ parentCategoryId: categoryId });
  }

  componentDidUpdate(prevProps) {
    const { categoryId, loadInitialProducts, storeId } = this.props;
    const categoryChanged = prevProps.categoryId !== categoryId;
    const storeChanged = prevProps.storeId !== storeId;

    if (categoryChanged || storeChanged) {
      loadInitialProducts({ parentCategoryId: categoryId });
    }
  }

  render() {
    const { error, category, categoryId, ...proxyProps } = this.props;

    const loadMore = loadMoreProducts({ parentCategoryId: categoryId });

    return <Category category={category} {...proxyProps} loadMore={loadMore} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
