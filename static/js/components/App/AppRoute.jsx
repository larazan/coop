/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Route } from 'react-router-dom';
import withAppError from '../../hoc/withAppError';
import { useDoorbellFeedback } from '../../hooks/useDoorbell';
import AppFooter from '../Layout/AppFooter/container';
import AppHeader from '../Layout/AppHeader/container';
import Messages from '../Notification';

const AppRoute = ({
  component: Component,
  feedback: feedbackEnabled,
  header: Header,
  hasFooter,
  footerProps,
  ...rest
}) => {
  useDoorbellFeedback(feedbackEnabled);

  return (
    <Route
      {...rest}
      render={props => {
        return (
          <>
            {Header ? <Header /> : <AppHeader />}
            <Messages />
            <Component {...props} />
            {hasFooter ? <AppFooter {...footerProps} /> : null}
          </>
        );
      }}
    />
  );
};

AppRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  feedback: PropTypes.bool,
  footerProps: PropTypes.instanceOf(Object),
  hasFooter: PropTypes.bool,
  header: PropTypes.elementType
};

AppRoute.defaultProps = {
  feedback: true,
  footerProps: null,
  hasFooter: true,
  header: null
};

export default withAppError(AppRoute);
