import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '@coopdigital/component-signpost/dist/signpost.css';

const Signpost = ({ to, label }) => (
  <Link to={to} className="coop-c-signpost">
    <h3 className="coop-c-signpost__title">{label}</h3>
  </Link>
);

Signpost.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default Signpost;
