import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import ContentHeader from '../Layout/ContentHeader';
import './AppError.scss';
import Resolution from './Resolution';

export const AppErrorContent = ({ title, content, ...resolutionProps }) => (
  <div className="error-page" data-testid="app-error">
    <header className="error-page--header">
      <h1 className="error-page--title">{title}</h1>
      <div className="error-page--message">{content}</div>
      {isEmpty(resolutionProps.resolution) ? null : (
        <div className="error-page--action">
          <Resolution {...resolutionProps} />
        </div>
      )}
    </header>
  </div>
);

AppErrorContent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.elementType, PropTypes.string]).isRequired
};

const AppError = ({ className, ...props }) => (
  <div className={className}>
    <ContentHeader />
    <AppErrorContent {...props} />
  </div>
);

AppError.propTypes = {
  className: PropTypes.string
};

AppError.defaultProps = {
  className: undefined
};

export default AppError;
