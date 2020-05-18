import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Checkout from '.';
import { evaluateMemberDiscount, removeMemberDiscount } from '../../store/basket/actions';
import { isFetching } from '../../store/basket/selectors';
import { storeCarrierBags, storeCheckoutDetails } from '../../store/checkout/actions';
import { getCheckoutDetails } from '../../store/checkout/selectors';
import { orderActions } from '../../store/order';
import {
  basketItemsFormattedForOrder,
  getOrderFulfilmentSelector,
  getOrderSlotSelector,
  isCollection
} from '../../store/order/selectors';

// ! TODO: make sure values aren't closed over and
// ! props are updated when we think they should be
const mapStateToPropsFactory = state => {
  const getOrderSlot = getOrderSlotSelector();
  const productsForOrder = basketItemsFormattedForOrder();
  const getOrderFulfilment = getOrderFulfilmentSelector();

  const mapStateToProps = ({ basket, order, products, slots }) => ({
    isFetching: isFetching({ basket }),
    isCollection: isCollection(state),
    slot: getOrderSlot({ order, slots }),
    deliveryAddress: order.deliveryAddress,
    productsForOrder: productsForOrder({ basket, products }),
    orderFulfilment: getOrderFulfilment({ basket, order, slots }),
    checkoutDetails: getCheckoutDetails(state)
  });

  return mapStateToProps;
};

const mapDispatchToProps = (dispatch, { history }) => ({
  placeOrder: (slot, products, fieldValues) => {
    dispatch(storeCheckoutDetails(fieldValues));
    dispatch(orderActions.placeOrder(slot, products));
    history.push('/payment');
  },
  storeCarrierBags: required => dispatch(storeCarrierBags(required)),
  evaluateMemberDiscount: membershipNumber =>
    dispatch(evaluateMemberDiscount({ membershipNumber })),
  removeMemberDiscount: () => dispatch(removeMemberDiscount())
});

export default connect(mapStateToPropsFactory, mapDispatchToProps)(withRouter(Checkout));
