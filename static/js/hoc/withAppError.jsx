import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/fp/isEmpty';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { removeMessageById } from '../store/messages/actions';
import AppError from '../components/AppError';
import { getMajorErrorSelector } from '../store/messages/selectors';
import messageType from '../components/propTypes/message';

const mapStateToProps = ({ messages }) => ({
  error: getMajorErrorSelector()({ messages })
});

const mapDispatchToProps = {
  removeMessageById
};

const withAppError = Component => {
  const WrappedComponent = ({ error, ...proxyProps }) =>
    // eslint-disable-next-line react/jsx-props-no-spreading
    isEmpty(error) ? <Component {...proxyProps} /> : <AppError {...error} {...proxyProps} />;

  WrappedComponent.propTypes = {
    error: PropTypes.shape(messageType)
  };

  WrappedComponent.defaultProps = {
    error: undefined
  };
  return WrappedComponent;
};

const composedAppErrorWrapper = compose(connect(mapStateToProps, mapDispatchToProps), withAppError);

export default composedAppErrorWrapper;
