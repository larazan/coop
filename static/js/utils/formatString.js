import { capitalize, replace } from 'lodash/fp';

export const toTitleCase = str => replace(/\w+/g, capitalize, str);
