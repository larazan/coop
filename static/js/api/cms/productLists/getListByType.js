import { partial } from 'lodash/fp';
import { cmsJsonGet, fetching, handleCmsError } from '../../fetchOptions';
import { addAuth, entriesUrl } from '../urls';
import { transformProductsListByType } from './transformProductsList';

export const url = type => `${addAuth(entriesUrl())}&content_type=productsList&fields.type=${type}`;

export const get = async type => {
  const operation = cmsJsonGet({ url: url(type) });
  const transformRes = partial(transformProductsListByType, [type]);

  const res = await fetching({
    error: handleCmsError,
    operation,
    transform: transformRes
  });
  return res;
};
