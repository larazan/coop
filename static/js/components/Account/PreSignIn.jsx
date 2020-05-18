import React from 'react';
import { IfFulfilled, IfPending, IfRejected, useAsync } from 'react-async';
import { startSignIn } from '../../api/account/signInFlow';
import { useLogger } from '../../hooks/useLogger';
import Button from '../Button';
import Transition from '../Transition';

export const PreSignIn = () => {
  const logger = useLogger();
  const state = useAsync({ promiseFn: startSignIn, logger });

  return (
    <>
      <IfPending state={state}>
        <Transition status="working" />
      </IfPending>

      <IfRejected state={state}>
        <Transition status="failed">
          <p>We are having trouble loading sign in</p>
          <Button className="btn--primary" onClick={state.reload}>
            Try again
          </Button>
        </Transition>
      </IfRejected>

      {/* keep showing spinner whilst browser completes redirect */}
      <IfFulfilled state={state}>
        <Transition status="working" />
      </IfFulfilled>
    </>
  );
};
