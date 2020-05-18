import { isString } from 'lodash';

export const twoDp = num => Math.round(num * 100) / 100;

export const safeParse = input => {
  if (isString(input)) {
    return twoDp(parseFloat(input));
  }
  return input;
};
