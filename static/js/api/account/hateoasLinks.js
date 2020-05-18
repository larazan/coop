import to from 'await-to-js';
import { getEnv } from '../../utils/environment';
import { query } from './hateoas';

export const getLinkWith = async ({ selector, headers = {} }) => {
  const { REACT_APP_ACCOUNT_URL: href } = getEnv();

  const [, res] = await to(query({ href, selector, headers }));
  if (!res) throw new Error(`hateoas failure: ${selector}`);

  return res;
};

export const getLink = async selector => getLinkWith({ selector });
