import useInterval from '@use-it/interval';
import isNil from 'lodash/isNil';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  FULFILMENT_TYPE_COLLECTION,
  FULFILMENT_TYPE_DELIVERY,
  QUICK_SLOT_REFRESH_INTERVAL_IN_MINUTES
} from '../../../constants';
import { minutesToMilliseconds } from '../../../utils/time';
import coordinatesPropTypes from '../../propTypes/coordinates';
import slotPropTypes from '../../propTypes/slot';
import { NextAvailableSlotButton } from './NextAvailableSlot';
import './QuickSlotPicker.scss';

const fifteenMinutes = minutesToMilliseconds(QUICK_SLOT_REFRESH_INTERVAL_IN_MINUTES);

const refreshSlots = ({ postcode, storeId, coordinates, onRefreshSlots }) => {
  if (postcode) {
    onRefreshSlots({ storeId, coordinates });
  }
};

const linkPath = slot => {
  if (slot) {
    const { id, date } = slot;
    return `/delivery/${date}/${id}`;
  }
  return '#';
};

const getStoreId = ({ collectionStore, deliveryStore }) => {
  const collectionStoreId = collectionStore ? collectionStore.id : null;
  const deliveryStoreId = deliveryStore ? deliveryStore.id : null;

  return deliveryStoreId || collectionStoreId;
};

const QuickSlotPicker = ({
  isFetching,
  collectionStore,
  coordinates,
  deliveryStore,
  nextCollectionSlot,
  nextDeliverySlot,
  onClickCollection,
  onRefreshSlots,
  postcode
}) => {
  const storeId = getStoreId({ collectionStore, deliveryStore });

  const history = useHistory();

  // initial refresh on component load
  useEffect(() => {
    refreshSlots({ coordinates, onRefreshSlots, postcode, storeId });
  }, [coordinates, onRefreshSlots, postcode, storeId]);

  // subsequent refresh(es) on an interval
  useInterval(() => {
    refreshSlots({ coordinates, onRefreshSlots, postcode, storeId });
  }, fifteenMinutes);

  if (collectionStore && deliveryStore) {
    // nb. if we see this message we'll need to add slot refreshing for both
    //  collection and delivery stores (currently only for delivery)
    // eslint-disable-next-line no-console
    console.assert(
      collectionStore.id === deliveryStore.id,
      'stores do not match - will need to refresh slots for each store'
    );
  }

  if (postcode) {
    // TODO can we write a lens for this? Or types in general?
    const collectionStoreName = collectionStore ? collectionStore.name : null;

    return (
      <section className="quick-slot-picker">
        <div className="container container--padded">
          <h2 className="quick-slot-picker__title">Book next available slot</h2>

          <div data-testid="next-delivery-slot">
            <h3 className="quick-slot-picker__subtitle">Delivery</h3>
            <NextAvailableSlotButton
              isFetching={isFetching}
              action={() => history.push(linkPath(nextDeliverySlot))}
              fulfilmentType={FULFILMENT_TYPE_DELIVERY}
              nextAvailableSlot={nextDeliverySlot}
              testId="nextDelivery"
            />
            {isNil(nextDeliverySlot) ? null : (
              <p className="quick-slot-picker__link">
                <Link to="/delivery">Arrange a different delivery</Link>
              </p>
            )}
          </div>

          <div data-testid="next-collection-slot">
            <h3 className="quick-slot-picker__subtitle">Collection</h3>
            <NextAvailableSlotButton
              isFetching={isFetching}
              action={() =>
                onClickCollection({
                  store: collectionStore,
                  slot: nextCollectionSlot
                })
              }
              fulfilmentType={FULFILMENT_TYPE_COLLECTION}
              nextAvailableSlot={nextCollectionSlot}
              storeLocation={collectionStoreName}
              testId="nextCollection"
            />
            {isNil(nextCollectionSlot) ? null : (
              <p className="quick-slot-picker__link">
                <Link to="/collection">Arrange a different collection</Link>
              </p>
            )}
          </div>
        </div>
      </section>
    );
  }
  return null;
};

QuickSlotPicker.propTypes = {
  isFetching: PropTypes.bool,
  collectionStore: PropTypes.instanceOf(Object),
  coordinates: PropTypes.shape(coordinatesPropTypes),
  deliveryStore: PropTypes.instanceOf(Object),
  nextCollectionSlot: PropTypes.shape(slotPropTypes),
  nextDeliverySlot: PropTypes.shape(slotPropTypes),
  onClickCollection: PropTypes.func.isRequired,
  onRefreshSlots: PropTypes.func.isRequired,
  postcode: PropTypes.string
};

QuickSlotPicker.defaultProps = {
  // FIXME remove this default
  isFetching: false,
  collectionStore: null,
  coordinates: null,
  deliveryStore: null,
  nextCollectionSlot: null,
  nextDeliverySlot: null,
  postcode: null
};

export default QuickSlotPicker;
