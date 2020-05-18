import jwt from 'jsonwebtoken';
import { getEnv } from '../../utils/environment';
import { getLink } from './hateoasLinks';
import { authHeaders, postHeaders } from './headers';

export const signOut = async ({ accessToken, logger }) => {
  logger.debug('sign-out');

  try {
    const { REACT_APP_ACCOUNT_CLIENT_ID: clientId } = getEnv();

    const { href, method } = await getLink('account.sign-out');

    const headers = postHeaders(authHeaders({ accessToken, clientId }));

    const body = JSON.stringify({
      sessionId: jwt.decode(accessToken).session_id
    });

    return fetch(href, {
      body,
      credentials: 'include',
      headers,
      method
    });
  } catch (e) {
    logger.error('sign-out failed', e);
    throw e;
  }
};
