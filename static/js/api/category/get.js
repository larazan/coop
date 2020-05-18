import { filter, get as _get, getOr, keyBy, map, pipe } from 'lodash/fp';
import { dgGet, fetching, handleDgError } from '../fetchOptions';
import { dgUrl } from '../utils/dgUrls';

const VIEW_ALL_X = 'View All ';

export const getUrl = storeId => {
  const path = `/v1/search/categories?tree=coophomedelivery&levels=1,2&page_size=500&store_id=${storeId}`;
  return dgUrl(path);
};

// nb. we could also test for the parent_ext_id being 'coophomedelivery'
//  - but level seems safer 😬
const getParent = category =>
  category.level === 1 ? null : getOr(null, 'parent_ext_id', category);

const categoryName = category => _get(['name', 'en'], category);

const getSubCategoryIds = (category, allCategories) => {
  if (category.level > 1) {
    return [];
  }

  const id = _get('ext_id', category);
  const subcategories = categories => filter(c => c.parent_ext_id === id, categories);

  return pipe(subcategories, map('ext_id'))(allCategories);
};

const reshapeResponse = ({ data: categories }) => {
  return keyBy(
    'id',
    map(
      category => ({
        id: category.ext_id,
        name: categoryName(category),
        order: category.order,
        parent: getParent(category),
        subcategories: getSubCategoryIds(category, categories)
      }),
      categories
    )
  );
};

const removeViewAllX = json => {
  const filtered = filter(
    category => categoryName(category).startsWith(VIEW_ALL_X) === false,
    json.data
  );
  return { data: filtered };
};

export const transform = json => {
  return pipe(removeViewAllX, reshapeResponse)(json);
};

export const get = async storeId => {
  const url = getUrl(storeId);

  const operation = dgGet({ url });
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
};
