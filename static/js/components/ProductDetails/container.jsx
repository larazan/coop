/* eslint-disable react/prop-types */
import get from 'lodash/fp/get';
import isEmpty from 'lodash/fp/isEmpty';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppError from '../AppError';
import Product from '.';
import { basketActions } from '../../store/basket';
import { messagesSelectors } from '../../store/messages';
import { loadProductById } from '../../store/products/actions';
import {
  isFetchingDetails,
  isAvailableInCurrentStore,
  getProductById
} from '../../store/products/selectors';
import getBasketItemQuantity from '../../store/products/utils/getBasketItemQuantity';

const getQuantity = (state, product) => {
  if (product) {
    const { gtin } = product;
    return getBasketItemQuantity(state.basket.items, gtin);
  }
  return 0;
};

const mapStateToProps = (state, ownProps) => {
  const id = get(['match', 'params', 'id'], ownProps);
  const product = getProductById(state, id);
  return {
    error: { ...messagesSelectors.getMajorErrorSelector()(state) } || null,
    id,
    isAvailable: isAvailableInCurrentStore(state, id),
    isFetching: isFetchingDetails(state),
    product,
    parentCategoryId: state.categories.selected,
    quantity: getQuantity(state, product)
  };
};

const mapDispatchToProps = dispatch => ({
  loadDataForPage: productId => dispatch(loadProductById(productId)),
  changeBasketItemQuantity: (id, quantity) =>
    dispatch(basketActions.changeBasketQuantity(id, quantity))
});

class ProductPage extends Component {
  componentDidMount() {
    const { id, loadDataForPage } = this.props;

    loadDataForPage(id);
  }

  componentDidUpdate(prevProps) {
    const getProductIdFromRouterProps = get(['match', 'params', 'id']);
    const prevProductId = getProductIdFromRouterProps(prevProps);
    const currentProductId = getProductIdFromRouterProps(this.props);
    const shouldLoadNewProduct = prevProductId !== currentProductId;

    if (shouldLoadNewProduct) {
      const { loadDataForPage } = this.props;
      loadDataForPage(currentProductId);
    }
    return true;
  }

  render() {
    const {
      changeBasketItemQuantity,
      error,
      isAvailable,
      isFetching,
      parentCategoryId,
      product,
      quantity
    } = this.props;

    return isEmpty(error) ? (
      <Product
        changeBasketItemQuantity={changeBasketItemQuantity}
        isAvailable={isAvailable}
        isFetching={isFetching}
        parentCategoryId={parentCategoryId}
        product={product}
        quantity={quantity}
      />
    ) : (
      <AppError {...error} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
