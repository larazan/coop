/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Logger } from '../store/logging/logger';

const LoggerContext = React.createContext();
LoggerContext.displayName = 'LoggerContext';

function LoggerProvider(props) {
  const { logger } = props;

  return <LoggerContext.Provider value={logger} {...props} />;
}

LoggerProvider.propTypes = {
  logger: PropTypes.instanceOf(Logger).isRequired
};

function useLogger() {
  const context = React.useContext(LoggerContext);
  if (context === undefined) {
    throw new Error(`useLogger must be used within a LoggerProvider`);
  }
  return context;
}

export { LoggerProvider, useLogger };
