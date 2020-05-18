import { get as _get } from 'lodash/fp';
import { DEFAULT_LANG, DG_TREE_NAME } from '../../../constants';
import { camelCase } from '../../../utils/camelCase';
import { dgGet, fetching, handleDgError } from '../../fetchOptions';
import { extractMaxQuantity } from '../../products/extractMaxQuantity';
import { dgUrl } from '../../utils/dgUrls';
import { encodeParam } from '../../utils/shared';

export const url = ({ q, storeId }) => {
  const searchTerm = encodeParam(q);
  const path = `/v1/search/predictions?store_id=${storeId}&search=${searchTerm}&lang=${DEFAULT_LANG}&tree=${DG_TREE_NAME}`;
  return dgUrl(path);
};

export const transform = res => {
  const categories = _get(['data', 'categories'], res).map(c => ({
    id: c.ext_id,
    name: _get(['name', 'en'], c),
    subcategories: []
  }));

  const products = _get(['data', 'products'], res).map(p => {
    const rawName = _get(['name', 'en'], p);
    const { name } = extractMaxQuantity(rawName);

    return camelCase({
      id: p.master_product_id,
      image_url: _get(['image', 'media_storage_key'], p),
      name,
      price: _get(['price', 'clicks_unit_price'], p)
    });
  });

  const relatedTerms = _get(['data', 'search_phrases'], res).map(p => p.search_phrase);

  return { categories, products, relatedTerms };
};

export const get = async params => {
  const operation = dgGet({ url: url(params) });
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
};
