import React from 'react';
import PropTypes from 'prop-types';

const LayoutContainer = ({ children }) => (
  <div className="container container--padded">{children}</div>
);

LayoutContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
};

export default LayoutContainer;
