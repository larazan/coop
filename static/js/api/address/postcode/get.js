import getOr from 'lodash/fp/getOr';
import { getEnv } from '../../../utils/environment';
import { toTitleCase } from '../../../utils/formatAddress';
import { fetching, handleAutoaddressError, jsonGet } from '../../fetchOptions';
import { autoAddressCodes } from '../constants';
import { encodePostcode, extractAddressParts } from '../shared';

export const autoaddressUrl = postcode => {
  const { REACT_APP_AA_API_KEY } = getEnv();

  const formatted = encodePostcode(postcode);
  return `https://api.autoaddress.ie/2.0/findaddress?address=${formatted}&key=${REACT_APP_AA_API_KEY}&language=en&country=gb&limit=-1&addressElements=true`;
};

export const transform = ({
  result,
  links,
  options,
  postcode,
  postalAddress,
  postalAddressElements
}) => {
  const getLink = optLinks => getOr('', '[0].href', optLinks);

  const getAddresses = () => {
    const { code } = result;

    if (code === autoAddressCodes.postcodeAppended) {
      const parts = extractAddressParts(postalAddressElements);
      return [
        {
          displayName: toTitleCase(`${postalAddress.join(', ')}, ${postcode}`),
          link: getLink(links),
          ...parts
        }
      ];
    }
    return options.map(option => ({
      displayName: toTitleCase(option.displayName),
      link: getLink(option.links)
    }));
  };

  return {
    postcode,
    options: getAddresses()
  };
};

export const get = async q => {
  const url = autoaddressUrl(q);

  const operation = jsonGet({ url });
  const error = handleAutoaddressError;

  const res = await fetching({ operation, transform, error });
  return res;
};
