import { connect } from 'react-redux';
import BothTypesContainer from '../BothTypes';
import { FULFILMENT_TYPE_COLLECTION } from '../../../constants';
import { getStoreId } from '../../../store/order/selectors';
import { getCollection } from '../../../store/slots/selectors';
import { SelectStoreContainer } from './SelectStore';

const mapStateToProps = state => ({
  addressLookupComponent: SelectStoreContainer,
  availableSlots: getCollection(state),
  fulfilmentType: FULFILMENT_TYPE_COLLECTION,
  storeId: getStoreId(state)
});

export default connect(mapStateToProps, null)(BothTypesContainer);
