import jwt from 'jsonwebtoken';
import { get } from 'lodash/fp';
import { formatKey } from './verifyTokenUtils';

export const decodeToken = token => {
  return jwt.decode(token, { complete: true });
};

export const getPublicKey = (token, publicKeys) => {
  const keyId = get('header.kid', token);

  if (!keyId) {
    throw new Error('kid not found');
  }

  const publicKey = publicKeys.find(x => x.kid === keyId);

  if (!publicKey) {
    throw new Error(`public key matching kid ${keyId} not found`);
  }

  return publicKey;
};

export const verifyWithPemEncodedKey = (token, publicKey) => {
  const { n: modulus, e: exponent } = publicKey;

  return jwt.verify(token, formatKey(modulus, exponent));
};

export const verifyToken = async (token, publicKeys) => {
  try {
    // get kid from token
    const decoded = decodeToken(token);

    // check token.kid matches one of the public keys
    const publicKey = getPublicKey(decoded, publicKeys);

    // verify token with key
    return verifyWithPemEncodedKey(token, publicKey);
  } catch (error) {
    throw new Error('failed to verify token');
  }
};
