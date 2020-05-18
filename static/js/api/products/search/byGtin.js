import { dgPost, fetching, handleDgError } from '../../fetchOptions';
import { dgUrl } from '../../utils/dgUrls';
import { productsOverview } from '../transform';

export const url = () => {
  return dgUrl('/v1/search/products');
};

export function formatRequest({ gtins, storeId }) {
  return {
    language: 'en',
    tree: 'coophomedelivery',
    store_id: storeId,
    gtin: gtins
  };
}

export async function getByGtin(payload) {
  const body = formatRequest(payload);

  const operation = dgPost({ url: url(), body });
  const error = handleDgError;

  const res = await fetching({ operation, transform: productsOverview(), error });
  return res;
}
