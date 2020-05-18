import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({ children, className }) => (
  <div className={`skeleton ${className}`}>{children}</div>
);

Skeleton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.string
};

Skeleton.defaultProps = {
  className: ''
};

export default Skeleton;
