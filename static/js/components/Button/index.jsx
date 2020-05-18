import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, disabled, onClick, testid }) => (
  <button
    className={`btn ${className}`}
    onClick={onClick}
    type="submit"
    disabled={disabled}
    data-testid={testid}
  >
    {children}
  </button>
);

Button.defaultProps = {
  onClick() {}
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  testid: PropTypes.string
};

Button.defaultProps = {
  disabled: false,
  testid: 'btn-default',
  className: '',
  onClick: null
};

export default Button;
