import { find, flow, getOr, orderBy, toLower, trim } from 'lodash/fp';

export const cleanSearchTerm = searchTerm => toLower(trim(searchTerm));

export const getBy = (findBy, res) => {
  const { items } = res;

  return flow(
    orderBy(['sys.updatedAt'], ['desc']),
    find(findBy),
    getOr(null, 'fields.banner.sys.id')
  )(items);
};
