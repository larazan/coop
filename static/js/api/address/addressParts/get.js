import { getOr } from 'lodash/fp';
import { toTitleCase } from '../../../utils/formatAddress';
import { fetching, handleAutoaddressError, jsonGet } from '../../fetchOptions';
import { autoAddressCodes } from '../constants';
import { extractAddressParts } from '../shared';

const addPostcodeIfRequired = (address, postcode) =>
  address.endsWith(postcode) ? address : `${address}, ${postcode}`;

export const transform = ({ result, ...res }) => {
  const { code } = result;

  const getAddress = () => {
    const { postcode, postalAddress, postalAddressElements } = res;

    if (code === autoAddressCodes.postcodeAppended) {
      const address = addPostcodeIfRequired(postalAddress.join(', '), postcode);

      return {
        displayName: toTitleCase(address),
        postcode,
        ...extractAddressParts(postalAddressElements)
      };
    }

    // FIXME some error handling. Would this ever be reached in the real world?
    return null;
  };

  const getOptions = () => {
    const { options } = res;

    if (code === autoAddressCodes.incompleteAddressEntered) {
      return options.map(({ displayName, links }) => ({
        displayName: toTitleCase(displayName),
        link: getOr('', '[0].href', links)
      }));
    }

    return null;
  };

  return {
    address: getAddress(),
    options: getOptions()
  };
};

export const get = async link => {
  const operation = jsonGet({ url: link });
  const error = handleAutoaddressError;

  const res = await fetching({ operation, transform, error });
  return res;
};
