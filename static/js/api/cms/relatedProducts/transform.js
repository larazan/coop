import { flow, get, map } from 'lodash/fp';

export const transform = gtin => res => {
  const related = flow(
    get('includes.Entry'),
    map(x => x.fields.gtin)
  )(res);

  return { [gtin]: related };
};
