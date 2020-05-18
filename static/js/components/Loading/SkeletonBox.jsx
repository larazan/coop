import React from 'react';
import PropTypes from 'prop-types';

const SkeletonBox = ({ className, children }) => (
  <div className={`skeleton--box ${className}`}>{children}</div>
);

SkeletonBox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

SkeletonBox.defaultProps = {
  className: '',
  children: null
};

export default SkeletonBox;
