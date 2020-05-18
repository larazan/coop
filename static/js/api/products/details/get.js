/* eslint-disable camelcase */
import { dgGet, fetching, handleDgError } from '../../fetchOptions';
import { dgUrl } from '../../utils/dgUrls';
import { details } from '../transform';

export const url = ({ storeId, productId }) => dgUrl(`/v1/places/${storeId}/products/${productId}`);

export const get = async ({ storeId, productId }) => {
  const operation = dgGet({ url: url({ storeId, productId }) });
  const transform = details;
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
};
