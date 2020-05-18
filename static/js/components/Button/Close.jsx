import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const CloseButton = withRouter(({ children, className, history, onClick = history.goBack }) => (
  <button className={`${className}`} onClick={onClick} type="button">
    {children}
  </button>
));

CloseButton.defaultProps = {
  onClick() {}
};

CloseButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

CloseButton.defaultProps = {
  className: '',
  onClick: null
};

export default CloseButton;
