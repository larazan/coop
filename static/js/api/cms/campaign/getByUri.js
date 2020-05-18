import { addAuth, entriesUrl } from '../urls';
import { cmsJsonGet, fetching, handleCmsError } from '../../fetchOptions';
import transform from './transform';

const cmsUrl = uri => `${addAuth(entriesUrl())}&content_type=campaign&fields.uri=${uri}&include=2`;

export const get = async ({ uri }) => {
  const url = cmsUrl(uri);

  const res = await fetching({
    error: handleCmsError,
    transform,
    operation: cmsJsonGet({ url })
  });

  return res;
};

export default get;
