import { getEnv } from '../../utils/environment';

export const dgUrl = path => {
  const { REACT_APP_DG_URL } = getEnv();
  return `https://${REACT_APP_DG_URL}${path}`;
};
