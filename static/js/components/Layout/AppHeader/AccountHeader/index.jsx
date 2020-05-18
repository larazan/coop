import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import { setLocation } from '../../../../api/account/signInFlow';
import { useAuth } from '../../../../context/authContext';
import { Pathnames } from '../../../App/pathnames';
import ComponentStyles from './AccountHeader.module.scss';

const SignInOrOut = ({ onClick, text }) => (
  <button type="button" className={ComponentStyles.button} role="menuitem" onClick={onClick}>
    {text}
  </button>
);

SignInOrOut.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

const Component = ({ isAuthenticated, onSignIn, onSignOut }) => {
  return (
    <div className={ComponentStyles.container}>
      <div className={`container ${ComponentStyles.wrapper}`}>
        {isAuthenticated ? (
          <SignInOrOut onClick={onSignOut} text="Sign out" />
        ) : (
          <SignInOrOut onClick={onSignIn} text="Sign in" />
        )}
      </div>
    </div>
  );
};

Component.propTypes = {
  isAuthenticated: PropTypes.bool,
  onSignIn: PropTypes.func,
  onSignOut: PropTypes.func
};

Component.defaultProps = {
  isAuthenticated: false,
  onSignIn: () => null,
  onSignOut: () => null
};

const AccountHeader = () => {
  const { push } = useHistory();
  const { isAuthenticated } = useAuth();

  const onSignIn = () => {
    // store current location to return to post-sign-in
    setLocation();

    return push(Pathnames.preSignIn);
  };

  const onSignOut = async () => {
    // store current location to return to post-sign-in
    setLocation();

    return push(Pathnames.signOut);
  };

  return <Component isAuthenticated={isAuthenticated} onSignIn={onSignIn} onSignOut={onSignOut} />;
};

export default AccountHeader;
