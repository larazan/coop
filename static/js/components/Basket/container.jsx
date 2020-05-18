import { isNil } from 'lodash/fp';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Basket from '.';
import { basketSelectors } from '../../store/basket';
import { orderSelectors } from '../../store/order';
import { isEligibleForCheckout } from '../../store/order/selectors';
import { productSelectors } from '../../store/products';

// ! TODO: make sure values aren't closed over and
// ! props are updated when we think they should be
const mapStateToPropsFactory = state => {
  const { isNotMinBasketValue } = basketSelectors;
  const { getOrderFulfilmentSelector } = orderSelectors;
  const basketItems = productSelectors.getBasketItems()(state);
  const orderFulfilment = getOrderFulfilmentSelector()(state);
  const hasNoAddress = isNil(orderFulfilment.selectedAddress);
  const hasNoSlot = isNil(orderFulfilment.reservedSlot);
  const hasNoMinBasketValue = isNotMinBasketValue(state);
  const hasNoOrderFulfilment = hasNoSlot || hasNoAddress;

  const mapStateToProps = {
    orderFulfilment,
    basketItems,
    hasNoMinBasketValue,
    hasNoOrderFulfilment,
    cannotCheckout: !isEligibleForCheckout(state),
    isFetching: state.basket.isFetching
  };

  return mapStateToProps;
};

const mapDispatchToProps = {};

export default connect(mapStateToPropsFactory, mapDispatchToProps)(withRouter(Basket));
