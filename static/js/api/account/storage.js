import store from '../../utils/store';

const Keys = {
  autoSignIn: 'ecom:auto-sign-in',
  context: 'ecom:context',
  pathname: 'ecom:pathname',
  pixieSecrets: 'ecom:pixie-secrets'
};

export const isSignInAttempted = () => store.session(Keys.autoSignIn) === true;
export const setSignInAttempted = () => store.session(Keys.autoSignIn, true);

export const getPathname = () => store.session(Keys.pathname);
export const setPathname = pathname => store.session(Keys.pathname, pathname);

export const setPkceSecrets = ({ codeVerifier, state }) =>
  store.session(Keys.pixieSecrets, { codeVerifier, state });

export const getPkceSecrets = () => {
  const { codeVerifier, state } = store.session(Keys.pixieSecrets);

  return {
    codeVerifier,
    state
  };
};

export const setContext = ({ tokens, user }) => store.session(Keys.context, { tokens, user });

export const getContext = () => {
  const context = store.session(Keys.context);
  store.session.remove(Keys.context);
  return context;
};

export const clearTransients = () => {
  store.session.remove(Keys.pathname);
  store.session.remove(Keys.pixieSecrets);
};
