import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  FULFILMENT_TYPE_COLLECTION as collection,
  FULFILMENT_TYPE_DELIVERY as delivery
} from '../../constants';
import {
  getError,
  getPostcode,
  getPostcodeCoordinates,
  isFetching as isFetchingAddresses
} from '../../store/addresses/selectors';
import {
  confirmSlot as confirmAction,
  refreshSlots as refreshAction
} from '../../store/slots/actions';
import { switchToCollection, switchToDelivery } from '../../store/order/actions';
import { getOrderAddress, getOrderSlotId } from '../../store/order/selectors';
import {
  isFetching as isFetchingSlotsSelector,
  isOtherTypeAvailable
} from '../../store/slots/selectors';
import Section from '../Layout/Section';
import './OrderFulfilment.scss';
import SlotSelection from './SlotSelection';
import slotProps from '../propTypes/slot';

/* eslint-disable react/prop-types */
export const BothTypesComponent = ({
  addressLookupComponent: LookupComponent,
  availableSlots,
  confirmSlot,
  coordinates,
  fulfilmentType,
  error,
  isFetching,
  isFetchingSlots,
  postcode,
  refreshSlots,
  reservedSlot,
  selectedAddress,
  storeId,
  switchTypeProps
}) => {
  const [changeAddress, setChangeAddress] = useState(false);
  const history = useHistory();

  return (
    <Section fillParentContainer theme="default">
      <div className="order-fulfilment">
        <div data-testid="order-fulfilment">
          {!selectedAddress || changeAddress ? (
            <LookupComponent
              error={error}
              isFetching={isFetching}
              postcode={postcode}
              selectedAddress={selectedAddress}
              setChangeAddress={setChangeAddress}
              storeId={storeId}
            />
          ) : (
            <SlotSelection
              availableSlots={availableSlots}
              confirmSlot={confirmSlot}
              coordinates={coordinates}
              fulfilmentType={fulfilmentType}
              history={history} // ! TODO: is there a better way to pass this?
              isFetchingSlots={isFetchingSlots}
              refreshSlots={refreshSlots}
              reservedSlot={reservedSlot}
              selectedAddress={selectedAddress}
              setChangeAddress={setChangeAddress}
              switchTypeProps={switchTypeProps}
            />
          )}
        </div>
      </div>
    </Section>
  );
};
/* eslint-enable react/prop-types */

// This component gathers props used in collection AND delivery journeys
// Props are passed on to child components and it's a bit verbose, but prop spreading was a nightmare
const BothTypesContainer = ({
  availableSlots,
  addressLookupComponent,
  fulfilmentType,
  storeId
}) => {
  const availableSlotsForOtherType = useSelector(isOtherTypeAvailable(fulfilmentType));
  const error = useSelector(getError);
  const isFetching = useSelector(isFetchingAddresses);
  const isFetchingSlots = useSelector(isFetchingSlotsSelector);
  const reservedSlot = useSelector(getOrderSlotId);
  const selectedAddress = useSelector(getOrderAddress);
  const coordinates = useSelector(getPostcodeCoordinates);
  const postcode = useSelector(getPostcode);
  const history = useHistory();
  const dispatch = useDispatch();

  const confirmSlot = (id, date) => dispatch(confirmAction(id, date));

  const refreshSlots = () => dispatch(refreshAction({ storeId, coordinates }));

  const getSwitchTypeProps = type => {
    const lookup = {
      [collection]: { action: switchToDelivery, label: delivery, url: delivery },
      [delivery]: { action: switchToCollection, label: `free ${collection}`, url: collection }
    };

    const { action, label, url } = lookup[type];

    return {
      availableSlotsForOtherType,
      switchTypeFn: () => {
        dispatch(action());
        history.replace(url);
      },
      switchTypeLabel: label
    };
  };

  return (
    <BothTypesComponent
      availableSlots={availableSlots}
      addressLookupComponent={addressLookupComponent}
      confirmSlot={confirmSlot}
      coordinates={coordinates}
      fulfilmentType={fulfilmentType}
      error={error}
      isFetching={isFetching}
      isFetchingSlots={isFetchingSlots}
      postcode={postcode}
      refreshSlots={refreshSlots}
      reservedSlot={reservedSlot}
      selectedAddress={selectedAddress}
      storeId={storeId}
      switchTypeProps={getSwitchTypeProps(fulfilmentType)}
    />
  );
};

BothTypesContainer.propTypes = {
  availableSlots: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape(slotProps))),
  addressLookupComponent: PropTypes.instanceOf(Object).isRequired,
  fulfilmentType: PropTypes.string,
  storeId: PropTypes.string
};

BothTypesContainer.defaultProps = {
  availableSlots: null,
  fulfilmentType: null,
  storeId: null
};

export default BothTypesContainer;
