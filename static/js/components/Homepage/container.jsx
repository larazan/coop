import values from 'lodash/fp/values';
import { connect } from 'react-redux';
import Homepage from '.';
import { isFetching as isFetchingCategories } from '../../store/categories/selectors';
import { messagesSelectors } from '../../store/messages';
import { orderSelectors } from '../../store/order';
import { getPostcode } from '../../store/shoppingIn/selectors';
import { getOrderStoreId } from '../../store/order/selectors';

// ! TODO: make sure values aren't closed over and
// ! props are updated when we think they should be
const mapStateToPropsFactory = () => {
  const getOrderFulfilment = orderSelectors.getOrderFulfilmentSelector();

  const mapStateToProps = state => ({
    categories: values(state.categories.items).filter(c => c.subcategories.length),
    error: { ...messagesSelectors.getMajorErrorSelector()(state) } || null,
    isFetching: isFetchingCategories(state),
    orderFulfilment: getOrderFulfilment(state),
    postcode: getPostcode(state),
    storeId: getOrderStoreId(state)
  });

  return mapStateToProps;
};

export default connect(mapStateToPropsFactory)(Homepage);
