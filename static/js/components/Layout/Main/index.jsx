import React from 'react';
import PropTypes from 'prop-types';

const Main = ({ children, identifier }) => (
  <main className={`page ${identifier ? `page--${identifier}` : null}`}>{children}</main>
);

Main.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
    .isRequired,
  identifier: PropTypes.string
};

Main.defaultProps = {
  identifier: null
};

export default Main;
