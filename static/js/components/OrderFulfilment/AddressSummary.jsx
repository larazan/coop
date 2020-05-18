import React from 'react';
import PropTypes from 'prop-types';
import '../InfoBlock.scss';

const AddressSummary = ({ content, onClick, fulfilmentType }) => (
  <button
    type="button"
    className={onClick ? 'infoblock-edit' : 'infoblock'}
    onClick={onClick}
    data-testid="change-address-button"
  >
    <span className="infoblock--content">{content || `Select a ${fulfilmentType} address`}</span>
    {onClick ? <span className="infoblock--cta">Change</span> : null}
  </button>
);

AddressSummary.propTypes = {
  content: PropTypes.string,
  fulfilmentType: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

AddressSummary.defaultProps = {
  content: null,
  onClick: null
};

export default AddressSummary;
