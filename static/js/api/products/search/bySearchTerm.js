import { getPagination, url } from './byCategory';
import { dgPost, fetching, handleDgError } from '../../fetchOptions';
import { productsOverview } from '../transform';

export function formatRequest({ searchTerm, nextPage, storeId }) {
  return {
    language: 'en',
    tree: 'coophomedelivery',
    store_id: storeId,
    match_phrase: { phrase: searchTerm, language: 'en' },
    meta: {
      pagination: getPagination(nextPage)
    }
  };
}

export async function getBySearchTerm(payload) {
  const body = formatRequest(payload);

  const operation = dgPost({ url: url(), body });
  const transform = productsOverview({ searchTerm: payload.searchTerm });
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
}
