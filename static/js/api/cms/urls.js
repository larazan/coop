import { getEnv } from '../../utils/environment';

const baseUrl = () => {
  const { REACT_APP_CMS_URL } = getEnv();
  return `https://${REACT_APP_CMS_URL}`;
};

export const entriesUrl = entryId => {
  const entry = entryId ? `/${entryId}` : '';
  return `${baseUrl()}/entries${entry}`;
};

export const assetsUrl = () => `${baseUrl()}/assets`;

export const addAuth = url => {
  const { REACT_APP_CMS_KEY } = getEnv();
  return `${url}?access_token=${REACT_APP_CMS_KEY}`;
};
