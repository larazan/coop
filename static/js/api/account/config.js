// nb. pathname previously agreed for all environments with identity
const REDIRECT_PATHNAME = 'post-sign-in';

export const getRedirectUri = () => {
  const { origin } = window.location;
  return new URL(REDIRECT_PATHNAME, origin).toString();
};
