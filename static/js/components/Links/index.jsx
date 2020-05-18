import React from 'react';
import PropTypes from 'prop-types';

export const LinkInNewTab = ({ to, text }) => (
  <a href={to} target="_blank" rel="noopener noreferrer">
    {text}
  </a>
);

LinkInNewTab.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};
