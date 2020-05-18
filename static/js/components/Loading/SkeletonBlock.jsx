import React from 'react';
import PropTypes from 'prop-types';

const SkeletonBlock = ({ className = '' }) => <div className={`skeleton--block ${className}`} />;

SkeletonBlock.propTypes = {
  className: PropTypes.string
};

SkeletonBlock.defaultProps = {
  className: ''
};

export default SkeletonBlock;
