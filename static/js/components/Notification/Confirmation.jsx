import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as CheckmarkFillSvg } from '../../assets/icons/checkmark-fill.svg';
import ComponentStyles from './Confirmation.module.scss';

const Confirmation = ({ message }) => (
  <div className={ComponentStyles.container}>
    <CheckmarkFillSvg className={ComponentStyles.checkmark} />
    <span>{message}</span>
  </div>
);

Confirmation.propTypes = {
  message: PropTypes.string.isRequired
};

export default Confirmation;
