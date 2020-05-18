// note:
//  for this component to work it requires the react router routes
//  to be wrapped in <LastLocationProvider> so we can detect a change of
//  location and clear messages for a route when we have moved away from it
//
//  see: https://github.com/hinok/react-router-last-location

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import { removePathnameMessage } from '../../store/messages/actions';
import { getMessageByPathname } from '../../store/messages/selectors';
import Confirmation from '../Notification/Confirmation';

export const PathnameMessage = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const lastLocation = useLastLocation();

  // clear message for previous pathname
  useEffect(() => {
    if (lastLocation) {
      const { pathname: lastPathname } = lastLocation;

      if (lastPathname !== pathname) {
        dispatch(removePathnameMessage(lastPathname));
      }
    }
  }, [dispatch, lastLocation, pathname]);

  // display message for current pathname
  const message = useSelector(getMessageByPathname(pathname));
  return message ? (
    <div className="container container--padded-magic">
      <Confirmation message={message} />
    </div>
  ) : null;
};
