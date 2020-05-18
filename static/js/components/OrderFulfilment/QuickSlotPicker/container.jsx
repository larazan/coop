import { connect } from 'react-redux';
import QuickSlotPicker from '.';
import { selectCollectionStore, switchToCollection } from '../../../store/order/actions';
import {
  getCollectionStore,
  getCoordinates,
  getDeliveryStore,
  getPostcode
} from '../../../store/shoppingIn/selectors';
import { confirmSlot, refreshSlots } from '../../../store/slots/actions';
import { getNextCollection, getNextDelivery, isFetching } from '../../../store/slots/selectors';

// ! FIXME: order.storeId should take precedence over collectionStore and deliveryStore slots
const mapStateToProps = state => ({
  isFetching: isFetching(state),
  collectionStore: getCollectionStore(state),
  coordinates: getCoordinates(state),
  deliveryStore: getDeliveryStore(state),
  nextCollectionSlot: getNextCollection(state),
  nextDeliverySlot: getNextDelivery(state),
  postcode: getPostcode(state)
});

const mapDispatchToProps = dispatch => ({
  onClickCollection: ({ store, slot: { id, date } }) => {
    // TODO can we reduce this into a single dispatch? Or otherwise simplify?
    dispatch(switchToCollection());
    dispatch(selectCollectionStore(store));
    dispatch(confirmSlot(id, date));
  },
  onRefreshSlots: ({ storeId, coordinates }) => dispatch(refreshSlots({ storeId, coordinates }))
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickSlotPicker);
