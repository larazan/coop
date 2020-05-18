import React, { useEffect } from 'react';
import { IfFulfilled, IfPending, IfRejected, useAsync } from 'react-async';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';
import { getDetails } from '../../api/account/getCustomer';
import { getPathnameOrDefault } from '../../api/account/helpers';
import { postSignIn } from '../../api/account/signInFlow';
import { clearTransients } from '../../api/account/storage';
import { useAuth } from '../../context/authContext';
import { useUser } from '../../context/userContext';
import { useLogger } from '../../hooks/useLogger';
import { setPathnameMessage } from '../../store/messages/actions';
import Button from '../Button';
import Transition from '../Transition';

const fetchTokens = async ({ logger }) => postSignIn({ logger });

const fetchCustomer = async ([accessToken, idToken, logger]) =>
  getDetails({ accessToken, idToken, logger });

const useTokens = () => {
  const logger = useLogger();

  return useAsync({ promiseFn: fetchTokens, logger });
};

const useCustomer = tokenData => {
  const logger = useLogger();

  const state = useAsync({ deferFn: fetchCustomer });
  const { run } = state;

  useEffect(() => {
    if (tokenData) {
      const { accessToken, idToken } = tokenData;

      run(accessToken, idToken, logger);
    }
  }, [logger, run, tokenData]);

  return state;
};

const useNotifyOnSuccess = (tokenData, customerData) => {
  const dispatch = useDispatch();

  const { setTokens } = useAuth();
  const { setUser } = useUser();

  const pathname = getPathnameOrDefault();

  useEffect(() => {
    if (customerData) {
      // store the tokens / user in context
      setTokens(tokenData);
      setUser(customerData);

      // clear any transient data from storage
      clearTransients();

      // send message if signed-in
      dispatch(setPathnameMessage(pathname, 'You are now signed in'));
    }
  }, [customerData, dispatch, pathname, setUser, setTokens, tokenData]);
};

export const PostSignIn = () => {
  const tokenState = useTokens();
  const { data: tokenData, isFulfilled: isTokenFulfilled } = tokenState;

  const customerState = useCustomer(tokenData);
  const { data: customerData } = customerState;

  useNotifyOnSuccess(tokenData, customerData);

  const state = tokenData ? customerState : tokenState;
  const { reload } = state;

  const pathname = getPathnameOrDefault();

  return (
    <>
      <IfPending state={state}>
        <Transition status="working">
          <p>Getting your details</p>
        </Transition>
      </IfPending>

      <IfRejected state={state}>
        <Transition status="failed">
          <p>We are having trouble loading your details</p>
          <Button className="btn--primary" onClick={reload}>
            Try again
          </Button>
        </Transition>
      </IfRejected>

      {/* it's possible for the token call to succeed and return null */}
      {isTokenFulfilled && !tokenData && (
        <IfFulfilled state={tokenState}>
          <Redirect to={pathname} />
        </IfFulfilled>
      )}

      <IfFulfilled state={customerState}>
        <Redirect to={pathname} />
      </IfFulfilled>
    </>
  );
};
