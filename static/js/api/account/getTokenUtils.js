import to from 'await-to-js';
import { getEnv } from '../../utils/environment';
import { verifyToken } from './verifyToken';
import { getPublicKeys } from './publicKeys';

export const getParamsForTokenCall = ({ authorizationCode, codeVerifier, redirectUri, state }) => {
  const { REACT_APP_ACCOUNT_CLIENT_ID } = getEnv();

  return {
    client_id: REACT_APP_ACCOUNT_CLIENT_ID,
    code: authorizationCode,
    code_verifier: codeVerifier,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    state
  };
};

export const fetchTokens = async (href, body) => {
  const res = await fetch(href, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  });

  if (res.ok) {
    const { access_token: accessToken, id_token: idToken } = await res.json();

    return { accessToken, idToken };
  }
  throw new Error('failed to fetch tokens');
};

export const fetchAndVerifyTokens = async (href, body) => {
  // get public keys
  const [, publicKeys] = await to(getPublicKeys());
  if (!publicKeys) throw new Error('failed to get public keys');

  // get tokens
  const [, tokens] = await to(fetchTokens(href, body));
  if (!tokens) throw new Error('failed to get tokens');

  const { accessToken, idToken } = tokens;

  // verify access token
  const [, verifiedAccess] = await to(verifyToken(accessToken, publicKeys));
  if (!verifiedAccess) throw new Error('failed to verify access token');

  // verify id token
  const [, verifiedId] = await to(verifyToken(idToken, publicKeys));
  if (!verifiedId) throw new Error('failed to verify id token');

  return tokens;
};
