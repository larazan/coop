/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useAsync } from 'react-async';
import { autoSignIn } from '../api/account/signInFlow';
import { isSignInAttempted, setSignInAttempted } from '../api/account/storage';
import ContentHeader from '../components/Layout/ContentHeader';
import Transition from '../components/Transition';
import { isAccountEnabled } from '../utils/featureFlag';
import { useLogger } from './loggerContext';

const AutoSignInContext = React.createContext();
AutoSignInContext.displayName = 'AutoSignInContext';

function AutoSignInProvider(props) {
  const logger = useLogger();
  const { isFulfilled, isPending, isLoading, run } = useAsync({ deferFn: autoSignIn });

  // attempt auto-sign-in once per-session, when the app mounts
  useEffect(() => {
    if (isAccountEnabled() && !isSignInAttempted()) {
      // prevent a subsequent call to auto-sign-in
      setSignInAttempted();

      run(logger);
    }
  }, [logger, run]);

  // TODO retry on rejected?! for a count? or just bail on this one-shot?

  // nb. show the spinner if anything but rejected
  if (isPending || isLoading || isFulfilled) {
    return (
      <>
        <ContentHeader withoutLink />
        <Transition status="working">
          <p>Loading</p>
        </Transition>
      </>
    );
  }

  return <AutoSignInContext.Provider {...props} />;
}

export { AutoSignInProvider };
