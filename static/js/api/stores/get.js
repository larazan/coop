import { dgGet, fetching, handleDgError } from '../fetchOptions';
import { dgUrl } from '../utils/dgUrls';

export const url = storeId => dgUrl(`/v1/places/${storeId}`);

export const transform = ({ data: store }) => {
  const { master_id: id, ext_id: extId, name, postcode } = store;

  return {
    id,
    extId,
    name,
    postcode
  };
};

export const get = async ({ storeId }) => {
  const operation = dgGet({ url: url(storeId) });
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
};
