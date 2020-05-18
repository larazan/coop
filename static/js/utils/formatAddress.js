import {
  capitalize,
  concat,
  dropRight,
  flow,
  join,
  last,
  replace,
  split,
  toLower
} from 'lodash/fp';

export const toTitleCase = address => {
  const parts = split(', ', address);

  const streets = flow(
    dropRight(1), // === postcode
    join(', '),
    toLower,
    replace(/\w+/g, capitalize)
  )(parts);

  return flow(
    last, // === postcode
    concat(streets),
    join(', ')
  )(parts);
};
