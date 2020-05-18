/* eslint-disable react/jsx-props-no-spreading */
import { isEqual } from 'lodash/fp';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from './authContext';
import { removeUserDetails, setUserDetails } from '../store/checkout/actions';

const UserContext = React.createContext();
UserContext.displayName = 'UserContext';

const noUser = {
  forename: null,
  name: null,
  email: null
};

function UserProvider(props) {
  const dispatch = useDispatch();
  const [user, setLocalUser] = useState(noUser);

  const {
    tokens: { accessToken, idToken }
  } = useAuth();

  useEffect(() => {
    if (!accessToken && !idToken) {
      // remove user details from checkout
      if (!isEqual(user, noUser)) {
        dispatch(removeUserDetails(user));
      }

      setLocalUser(noUser);
    }
  }, [accessToken, dispatch, idToken, user]);

  const setUser = newUser => {
    // set user details to prefill checkout
    if (newUser && !isEqual(newUser, noUser)) {
      dispatch(setUserDetails(newUser));
    }

    setLocalUser(newUser || noUser);
  };

  return <UserContext.Provider value={{ user, setUser }} {...props} />;
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
