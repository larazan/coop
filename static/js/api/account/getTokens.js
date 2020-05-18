import { fetchAndVerifyTokens } from './getTokenUtils';
import { getLink } from './hateoasLinks';

export const exchangeCodeForTokens = async params => {
  const { href } = await getLink('account.token');

  const body = new URLSearchParams(params).toString();

  return fetchAndVerifyTokens(href, body);
};
