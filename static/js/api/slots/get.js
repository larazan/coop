/* eslint-disable camelcase */
import { flow, getOr, map, reduce, sortBy } from 'lodash/fp';
import {
  FULFILMENT_TYPE_COLLECTION,
  FULFILMENT_TYPE_DELIVERY,
  isCollection,
  STORE_RADIUS_IN_METRES as range
} from '../../constants';
import { dgGet, fetching, handleDgError } from '../fetchOptions';
import { dgUrl } from '../utils/dgUrls';

export const url = ({ storeId, coordinates: { latitude, longitude } }) => {
  const path = `/v1/dts/slots-nearby?store_guid=${storeId}&latitude=${latitude}&longitude=${longitude}&range=${range}`;
  return dgUrl(path);
};

const keyForSlots = type => (isCollection(type) ? 'pickup_points' : 'home_deliveries');

const toSlot = (date, { id, starts_at, ends_at, delivery_price }) => ({
  id: String(id),
  startsAt: starts_at,
  endsAt: ends_at,
  deliveryPrice: delivery_price,
  date
});

export const reshapeResponse = (fulfilmentType, res) => {
  const rawSlots = getOr([], [keyForSlots(fulfilmentType), '0', 'slots'], res);

  const keyByDateAndFormat = (acc, { delivery_date: date, slots }) => {
    return {
      ...acc,
      [date]: flow(
        map(slot => toSlot(date, slot)),
        sortBy('startsAt') // slots can appear in a random order, so sort by start time ASC here
      )(slots)
    };
  };

  return reduce(keyByDateAndFormat, {}, rawSlots);
};

export const transform = res => {
  const collection = reshapeResponse(FULFILMENT_TYPE_COLLECTION, res);
  const delivery = reshapeResponse(FULFILMENT_TYPE_DELIVERY, res);

  return {
    collection,
    delivery
  };
};

export const get = async coordinates => {
  const operation = dgGet({ url: url(coordinates) });
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
};
