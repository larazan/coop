import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './Pill.scss';

const Pill = ({ label, url, size, colour }) => (
  <Link to={url} className={`pill pill--${size} pill--${colour}`}>
    {label}
  </Link>
);

Pill.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'large']).isRequired,
  colour: PropTypes.oneOf(['primary', 'secondary', 'default'])
};

Pill.defaultProps = {
  colour: 'default'
};

export default Pill;
