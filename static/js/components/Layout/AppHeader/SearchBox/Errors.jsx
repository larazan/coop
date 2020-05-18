import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/fp/isEmpty';

const Errors = ({ errors }) =>
  !isEmpty(errors) ? (
    <ul className="app-search--errors">
      {errors.map(error => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  ) : null;

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string)
};

Errors.defaultProps = {
  errors: []
};

export default Errors;
