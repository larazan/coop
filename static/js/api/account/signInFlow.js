import { authorizeNoPrompt, authorizeWithPrompt, getParamsForAuthorizeCall } from './authorize';
import { createChallenge } from './challenge';
import { getRedirectUri } from './config';
import { exchangeCodeForTokens } from './getTokens';
import { getParamsForTokenCall } from './getTokenUtils';
import { getPkceSecrets, setPathname, setPkceSecrets } from './storage';
import { getQueryParams } from './utils';

const LOGIN_REQUIRED = 'LOGIN_REQUIRED';

export const setLocation = () => {
  const { pathname } = window.location;
  setPathname(pathname);
};

const signIn = async authorize => {
  const challenge = createChallenge();
  setPkceSecrets(challenge);

  const redirectUri = getRedirectUri();
  const params = getParamsForAuthorizeCall({ challenge, redirectUri });

  return authorize(params);
};

export const autoSignIn = async ([logger]) => {
  logger.debug('auto-sign-in');

  try {
    setLocation();

    const url = await signIn(authorizeNoPrompt);
    window.location.assign(url);
  } catch (e) {
    logger.error('auto-sign-in failed', e);
    throw e;
  }
};

// TODO use-async provides an abort-signal we could pass to fetch, so
//  this could be async ({ logger }, { signal }) => {
export const startSignIn = async ({ logger }) => {
  logger.debug('sign-in');

  try {
    const url = await signIn(authorizeWithPrompt);
    window.location.replace(url);
  } catch (e) {
    logger.error('sign-in failed', e);
    throw e;
  }
};

const verifyState = ({ state: requestState }, responseState) => {
  if (requestState !== responseState) {
    throw new Error('PKCE state violation');
  }
};

const handleError = async (error, description) => {
  if (error !== LOGIN_REQUIRED) {
    const message = `error ${error}, ${description}`;
    throw new Error(message);
  }
};

const handleCode = async (code, { codeVerifier, state }) => {
  const redirectUri = getRedirectUri();

  const params = getParamsForTokenCall({
    authorizationCode: code,
    codeVerifier,
    redirectUri,
    state
  });

  return exchangeCodeForTokens(params);
};

// TODO use-async provides an abort-signal we could pass to fetch, so
//  this could be async ({ logger }, { signal }) => {
export const postSignIn = async ({ logger }) => {
  logger.debug('post-sign-in');

  try {
    const { code, error, error_description: description, state } = getQueryParams();

    const pkceSecrets = getPkceSecrets();

    verifyState(pkceSecrets, state);

    if (error) {
      await handleError(error, description);
    } else if (code) {
      const tokens = await handleCode(code, pkceSecrets);
      return tokens;
    }
  } catch (e) {
    logger.error('post-sign-in failed', e);
    throw e;
  }
  return null;
};
