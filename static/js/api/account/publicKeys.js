import { getLink } from './hateoasLinks';

export const getPublicKeys = async () => {
  const { href, method } = await getLink('account.publickeys');

  const res = await fetch(href, { method });
  if (res.ok) {
    const body = await res.json();
    return body.keys;
  }

  throw new Error('failed to get public keys');
};
