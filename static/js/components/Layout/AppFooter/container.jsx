import { connect } from 'react-redux';
import AppFooter from '.';
import { orderSelectors } from '../../../store/order';
import { getOrderStoreId } from '../../../store/order/selectors';
import { getPostcode } from '../../../store/shoppingIn/selectors';

// ! TODO: make sure values aren't closed over and
// ! props are updated when we think they should be
const mapStateToPropsFactory = () => {
  const getOrderFulfilment = orderSelectors.getOrderFulfilmentSelector();

  const mapStateToProps = state => ({
    orderFulfilment: getOrderFulfilment(state),
    postcode: getPostcode(state),
    orderStoreId: getOrderStoreId(state)
  });

  return mapStateToProps;
};

export default connect(mapStateToPropsFactory)(AppFooter);
