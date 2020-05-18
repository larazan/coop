import useInterval from '@use-it/interval';
import React, { useState } from 'react';
import { isExpired } from '../api/account/token';

const oneMinute = 60 * 1000;

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

const noTokens = {
  accessToken: null,
  idToken: null
};

function AuthProvider(props) {
  const [tokens, setTokens] = useState(null);

  const revokeTokens = () => {
    setTokens(null);
  };

  const isAuthenticated = () => {
    if (tokens) {
      const { accessToken } = tokens;
      return !isExpired(accessToken);
    }
    return false;
  };

  // auto-sign-out if the token has expired
  useInterval(() => {
    if (tokens) {
      const { accessToken } = tokens;
      if (isExpired(accessToken)) {
        revokeTokens();
      }
    }
  }, oneMinute);

  const value = {
    isAuthenticated: isAuthenticated(),
    revokeTokens,
    setTokens,
    tokens: tokens || noTokens
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
