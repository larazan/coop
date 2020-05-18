import { difference, map, partial, property } from 'lodash/fp';
import { dgPost, fetching, handleDgError } from '../../fetchOptions';
import { url } from '../search/byCategory';
import { productsOverview } from '../transform';

export function formatRequest({ gtins, storeId }) {
  return {
    language: 'en',
    tree: 'coophomedelivery',
    store_id: storeId,
    gtin: gtins
  };
}

export function reshape(requestGtins, dgResponse) {
  const { products } = productsOverview()(dgResponse);
  const available = map(property('gtin'), products);
  const unavailable = difference([].concat(requestGtins), available);

  return {
    available: products,
    unavailable
  };
}

export async function checkAvailability(payload) {
  function transform(res) {
    return partial(reshape, [payload.gtins])(res);
  }
  const body = formatRequest(payload);

  const operation = dgPost({ url: url(), body });
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
}
