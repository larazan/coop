import { isNil } from 'lodash/fp';

/**
 *
 * @param {String} promoStr A string describing the current promotional offer.
 * Must match the format "DESCRIPTION OF OFFER (Offer Valid Until 01/02/2019)."
 * Digital Goodie products either have a valid promotions string, an empty string,
 * or a value of `undefined`.
 */
export default function formatPromo(promoStr) {
  if (isNil(promoStr)) {
    return [];
  }

  const expiryDateRegex = /\(Offer Valid Until \d{2}\/\d{2}\/\d{4}\)/;
  if (isNil(promoStr.match(expiryDateRegex))) {
    return [promoStr];
  }

  const dateRegex = /\d{2}\/\d{2}\/\d{4}/;

  try {
    // prettier-ignore
    const description = promoStr
      .split('(')[0]
      .toLowerCase()
      .trim();

    const sentenceCase = description.charAt(0).toUpperCase() + description.slice(1);

    return [sentenceCase, `Valid until ${promoStr.match(dateRegex)[0]}`];
  } catch (error) {
    console.error("Promo string doesn't match agreed format");
    return [promoStr];
  }
}
