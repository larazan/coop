import { map, partial, toLower } from 'lodash/fp';
import { cmsJsonGet, fetching, handleCmsError } from '../../fetchOptions';
import { addAuth, entriesUrl } from '../urls';
import { transformBanner } from './transformBanner';
import { cleanSearchTerm, getBy } from './utilities';

export const url = ({ searchTerm }) =>
  `${addAuth(entriesUrl())}&content_type=searchTerm&fields.terms[match]=${encodeURIComponent(
    searchTerm
  )}`;

const transform = ({ searchTerm }, res) => {
  const bannerId = getBy(e => {
    const terms = map(toLower, e.fields.terms);
    return terms.includes(searchTerm);
  }, res);

  return bannerId ? transformBanner({ bannerId }, res) : null;
};

export const get = async ({ searchTerm: raw }) => {
  const searchTerm = cleanSearchTerm(raw);

  const operation = cmsJsonGet({ url: url({ searchTerm }) });
  const transformRes = partial(transform, [{ searchTerm }]);

  const res = await fetching({ operation, transform: transformRes, error: handleCmsError });
  return res;
};
