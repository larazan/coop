import { useEffect } from 'react';
import { useAuth } from './authContext';
import { useUser } from './userContext';
import { setContext, getContext } from '../api/account/storage';

export const ContextPersistence = () => {
  const { isAuthenticated, setTokens, tokens } = useAuth();
  const { user, setUser } = useUser();

  useEffect(() => {
    const serialize = () => {
      if (isAuthenticated) {
        setContext({ tokens, user });
      }
    };

    const deserialize = () => {
      const { readyState } = document;
      if (readyState === 'interactive') {
        const context = getContext();
        if (context) {
          const { tokens: ctxTokens, user: ctxUser } = context;
          if (ctxTokens && ctxUser) {
            setTokens(ctxTokens);
            setUser(ctxUser);
          }
        }
      }
    };

    window.addEventListener('beforeunload', serialize);
    document.addEventListener('readystatechange', deserialize);

    return () => {
      window.removeEventListener('beforeunload', serialize);
      document.removeEventListener('readystatechange', deserialize);
    };
  }, [isAuthenticated, setUser, setTokens, tokens, user]);

  return null;
};
