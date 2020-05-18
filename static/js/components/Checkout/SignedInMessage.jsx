import React from 'react';
import { useAuth } from '../../context/authContext';
import { useUser } from '../../context/userContext';
import Confirmation from '../Notification/Confirmation';

export const message = forename =>
  `Hi ${forename}! We've filled in some information by using your Co-op membership account. You can change them for this order if you need to.`;

export const SignedInMessage = () => {
  const { isAuthenticated } = useAuth();
  const { user } = useUser();

  if (isAuthenticated) {
    const { forename } = user;

    return <Confirmation message={message(forename)} />;
  }
  return null;
};
