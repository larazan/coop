import { partial } from 'lodash/fp';
import { cmsJsonGet, fetching, handleCmsError } from '../../fetchOptions';
import { addAuth, entriesUrl } from '../urls';
import { transformBanner } from './transformBanner';
import { getBy } from './utilities';

export const url = ({ page }) => `${addAuth(entriesUrl())}&content_type=page&fields.type=${page}`;

const transform = ({ page }, res) => {
  const bannerId = getBy(e => e.fields.type === page, res);

  return bannerId ? transformBanner({ bannerId }, res) : null;
};

export const get = async ({ page }) => {
  const operation = cmsJsonGet({ url: url({ page }) });
  const transformRes = partial(transform, [{ page }]);

  const res = await fetching({
    error: handleCmsError,
    operation,
    transform: transformRes
  });
  return res;
};
