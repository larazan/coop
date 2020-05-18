import { getEnv } from '../../utils/environment';
import { getLink } from './hateoasLinks';
import { url } from './utils';

// FIXME move this, or inject environment specific values?
export const getParamsForAuthorizeCall = ({ challenge, redirectUri }) => {
  const { REACT_APP_ACCOUNT_CLIENT_ID: clientId } = getEnv();

  return {
    clientId,
    redirectUri,
    ...challenge
  };
};

export const withPromptParams = ({
  clientId,
  codeChallenge,
  codeChallengeMethod,
  redirectUri,
  state
}) => ({
  response_type: 'code',

  client_id: clientId,
  redirect_uri: redirectUri,

  // From persisted session
  code_challenge_method: codeChallengeMethod,
  code_challenge: codeChallenge,
  state
});

export const withoutPromptParams = params => ({
  ...withPromptParams(params),
  prompt: 'none'
});

const authorize = async params => {
  const { href } = await getLink('account.authorize');

  return url(href, params);
};

export const authorizeNoPrompt = async params => authorize(withoutPromptParams(params));

export const authorizeWithPrompt = async params => authorize(withPromptParams(params));
