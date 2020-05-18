import { getEnv } from '../../utils/environment';
import { getLinkWith } from './hateoasLinks';
import { authHeaders } from './headers';
import { getEmailAddress } from './token';
import { toTitleCase } from '../../utils/formatString';

const fetchCustomer = async ({ accessToken, logger }) => {
  try {
    const { REACT_APP_ACCOUNT_CLIENT_ID: clientId } = getEnv();

    const headers = authHeaders({ accessToken, clientId });

    const { href, method } = await getLinkWith({ selector: 'customer.customer', headers });

    const res = await fetch(href, {
      headers,
      method
    });

    return res.ok ? res.json() : null;
  } catch (e) {
    logger.error('get-customer failed', e);
    throw e;
  }
};

export const transform = ({ forename, surname }) => ({
  forename: toTitleCase(forename),
  name: toTitleCase(`${forename} ${surname}`)
});

export const getDetails = async ({ accessToken, idToken, logger }) => {
  const res = await fetchCustomer({ accessToken, logger });
  if (res) {
    const { forename, name } = transform(res);
    return { forename, name, email: getEmailAddress(idToken) };
  }
  return null;
};
