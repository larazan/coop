/* eslint-disable camelcase */
import { PAGE_SIZE } from '../../../constants';
import { dgPost, fetching, handleDgError } from '../../fetchOptions';
import { dgUrl } from '../../utils/dgUrls';
import { productsOverview } from '../transform';

export const url = () => {
  return dgUrl('/v1/search/products');
};

export function getPagination(nextPage) {
  return { page: nextPage, page_size: PAGE_SIZE };
}

export const formatRequest = payload => {
  return {
    filters: {
      category_path_ids: [payload.parentCategoryId]
    },
    language: 'en',
    meta: {
      pagination: getPagination(payload.nextPage)
    },
    store_id: payload.storeId
  };
};

export async function getByCategory(payload) {
  const body = formatRequest(payload);

  const operation = dgPost({ url: url(), body });
  const transform = productsOverview({ parentCategoryId: payload.parentCategoryId });
  const error = handleDgError;

  const res = await fetching({ operation, error, transform });
  return res;
}
