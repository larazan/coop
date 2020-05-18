import { getEnv } from '../../../utils/environment';
import { fetching, handleAutoaddressError, jsonGet } from '../../fetchOptions';
import { autoAddressCodes } from '../constants';
import { encodePostcode } from '../shared';

export const autoaddressUrl = postcode => {
  const { REACT_APP_AA_API_KEY } = getEnv();

  const formatted = encodePostcode(postcode);
  return `https://api.autoaddress.ie/2.0/getGBPostcodeData?postcode=${formatted}&key=${REACT_APP_AA_API_KEY}`;
};

export const transform = ({ result, spatialInfo }) => {
  const { code } = result;
  if (code === autoAddressCodes.postcodeAppended) {
    const {
      wgs84: { location }
    } = spatialInfo;
    return location;
  }
  return null;
};

export const get = async postcode => {
  const url = autoaddressUrl(postcode);

  const operation = jsonGet({ url });
  const error = handleAutoaddressError;

  const res = await fetching({ operation, transform, error });
  return res;
};
