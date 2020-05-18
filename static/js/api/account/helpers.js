// TODO rename this file as soon as you have a minute to think

import { Pathnames } from '../../components/App/pathnames';
import { getPathname } from './storage';

export const getPathnameOrDefault = () => {
  const pathname = getPathname();
  if (!pathname) {
    // eslint-disable-next-line no-console
    console.error('get-pathname: using default');
    return Pathnames.home;
  }
  return pathname;
};
