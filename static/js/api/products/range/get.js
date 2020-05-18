import { map } from 'lodash/fp';
import { dgGet, fetching, handleDgError } from '../../fetchOptions';
import { dgUrl } from '../../utils/dgUrls';

export const url = storeId => {
  const maxProductsInRange = 50000;
  return dgUrl(`/v1/places/${storeId}/assortments?page_size=${maxProductsInRange}`);
};

export const transform = ({ data }) => {
  return map('master_product_id', data);
};

export const get = async ({ storeId }) => {
  const operation = dgGet({ url: url(storeId) });
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
};
