import { createHash, randomBytes } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

const base64URLEncode = buffer =>
  // prettier-ignore
  buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');

const sha256 = buffer => createHash('sha256').update(buffer).digest();

/**
 * Generate challenge
 */
export const createChallenge = () => {
  const codeVerifier = base64URLEncode(randomBytes(32));
  const codeChallenge = base64URLEncode(sha256(codeVerifier));

  return {
    codeChallengeMethod: 'S256',
    codeChallenge,
    codeVerifier,
    state: uuidv4()
  };
};
