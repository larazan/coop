import { cmsJsonGet, fetching, handleCmsError } from '../../fetchOptions';
import { addAuth, entriesUrl } from '../urls';
import { transform } from './transform';

export const url = gtin => `${addAuth(entriesUrl())}&content_type=product&fields.gtin=${gtin}`;

export const get = async gtin => {
  const operation = cmsJsonGet({ url: url(gtin) });

  const res = await fetching({
    error: handleCmsError,
    operation,
    transform: transform(gtin)
  });
  return res;
};
