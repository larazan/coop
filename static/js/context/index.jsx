import PropTypes from 'prop-types';
import React from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';
import createStore from '../store';
import { buildLogger } from '../store/logger';
import { AuthProvider } from './authContext';
import { AutoSignInProvider } from './autoSignInContext';
import { ContextPersistence } from './contextPersistence';
import { LoggerProvider } from './loggerContext';
import { UserProvider } from './userContext';

const store = createStore();

// nb. create-store also builds a logger but we're finding it tricky
//  to pass one at this time due to the default param and it's reuse
//  hence we're building another logger here for expediency
const logger = buildLogger();

function AppProviders({ children }) {
  return (
    <ReactReduxProvider store={store}>
      <LoggerProvider logger={logger}>
        <AutoSignInProvider>
          <AuthProvider>
            <UserProvider>
              <ContextPersistence />
              {children}
            </UserProvider>
          </AuthProvider>
        </AutoSignInProvider>
      </LoggerProvider>
    </ReactReduxProvider>
  );
}

AppProviders.propTypes = {
  children: PropTypes.node.isRequired
};

export { AppProviders };
