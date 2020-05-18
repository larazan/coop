import { partial } from 'lodash/fp';
import { cmsJsonGet, fetching, handleCmsError } from '../../fetchOptions';
import { addAuth, entriesUrl } from '../urls';
import { transformBanner } from './transformBanner';
import { getBy } from './utilities';

export const url = ({ categoryId }) =>
  `${addAuth(entriesUrl())}&content_type=category&fields.categoryId=${categoryId}`;

const transform = ({ categoryId }, res) => {
  const bannerId = getBy(e => e.fields.categoryId === categoryId, res);

  return bannerId ? transformBanner({ bannerId }, res) : null;
};

export const get = async ({ categoryId }) => {
  const operation = cmsJsonGet({ url: url({ categoryId }) });
  const transformRes = partial(transform, [{ categoryId }]);

  const res = await fetching({
    error: handleCmsError,
    operation,
    transform: transformRes
  });
  return res;
};
