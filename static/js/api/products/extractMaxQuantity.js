import { getDefaultProductMaxQuantity } from '../../utils/environment';

export const extractMaxQuantity = (name = '') => {
  const qtyRegex = /\[(\d{1,2})\](.*)/;
  const match = name.match(qtyRegex);

  if (match) {
    // [3]Quorn 15 Crispy Nuggets 300g
    // match[1] = 3, match[2] = Quorn 15 Crispy Nuggets
    return { maxQuantity: parseInt(match[1], 10), name: match[2] };
  }

  return { maxQuantity: getDefaultProductMaxQuantity(), name };
};
