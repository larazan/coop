import React, { useEffect } from 'react';
import { IfFulfilled, IfPending, IfRejected, useAsync } from 'react-async';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { getPathnameOrDefault } from '../../api/account/helpers';
import { signOut } from '../../api/account/signOutFlow';
import { clearTransients } from '../../api/account/storage';
import { useAuth } from '../../context/authContext';
import { useLogger } from '../../hooks/useLogger';
import { setPathnameMessage } from '../../store/messages/actions';
import Button from '../Button';
import Transition from '../Transition';

export const SignOut = () => {
  const logger = useLogger();

  const {
    revokeTokens,
    tokens: { accessToken }
  } = useAuth();

  const state = useAsync({ promiseFn: signOut, accessToken, logger });

  const { isFulfilled } = state;
  const dispatch = useDispatch();
  const pathname = getPathnameOrDefault();

  useEffect(() => {
    if (isFulfilled) {
      revokeTokens();
      clearTransients();

      dispatch(setPathnameMessage(pathname, 'You are now signed out'));
    }
  }, [revokeTokens, dispatch, isFulfilled, pathname]);

  return (
    <>
      <IfPending state={state}>
        <Transition status="working">
          <p>Signing out</p>
        </Transition>
      </IfPending>

      <IfRejected state={state}>
        <Transition status="failed">
          <p>We are having trouble signing you out</p>
          <Button className="btn--primary" onClick={state.reload}>
            Try again
          </Button>
        </Transition>
      </IfRejected>

      <IfFulfilled state={state}>
        <Redirect to={pathname} />
      </IfFulfilled>
    </>
  );
};
