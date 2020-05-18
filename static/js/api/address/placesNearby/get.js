import { getOr, map } from 'lodash/fp';
import { dgGet, fetching, handleDgError } from '../../fetchOptions';
import { dgUrl } from '../../utils/dgUrls';

export const url = ({ latitude, longitude }) => {
  const path = `/v1/dts/places-nearby?latitude=${latitude}&longitude=${longitude}`;
  return dgUrl(path);
};

const transformStoreId = ({ deliveries, pickups }) => {
  const deliveryStoreId = getOr(null, '[0].place_id', deliveries);
  const collectionStoreId = getOr(null, '[0].place_id', pickups);

  return deliveryStoreId || collectionStoreId;
};

const transform = res => {
  const each = ({ place_id: id, distance, formatted_address: formattedAddress, name }) => {
    return {
      id,
      distance,
      formattedAddress,
      name
    };
  };

  const { pickups, deliveries } = res;

  const storeId = transformStoreId({ deliveries, pickups });

  return {
    collections: map(each, pickups),
    deliveries: map(each, deliveries),
    storeId
  };
};

export const get = async coordinates => {
  const operation = dgGet({ url: url(coordinates) });
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
};
