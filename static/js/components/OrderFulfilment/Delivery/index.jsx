import { connect } from 'react-redux';
import BothTypesContainer from '../BothTypes';
import { FULFILMENT_TYPE_DELIVERY } from '../../../constants';
import { getDeliveryStoreId } from '../../../store/addresses/selectors';
import { getDelivery } from '../../../store/slots/selectors';
import AddressLookup from './AddressLookup';

const mapStateToProps = state => ({
  addressLookupComponent: AddressLookup,
  availableSlots: getDelivery(state),
  fulfilmentType: FULFILMENT_TYPE_DELIVERY,
  storeId: getDeliveryStoreId(state) // rename to storeIdSelector and genericise?
});

export default connect(mapStateToProps, null)(BothTypesContainer);
