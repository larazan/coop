import PropTypes from 'prop-types';
import React from 'react';
import { formatPriceShortIfPossible } from '../../../../utils/formatPrice';
import './SlotPrice.scss';

const SlotPrice = ({ deliveryPrice }) => (
  <span className="slot-price--container">
    <span className="slot-price">
      {/* TODO remove duplication on using 'Free' for a zero delivery price */}
      {deliveryPrice === 0 ? 'Free' : formatPriceShortIfPossible(deliveryPrice)}
    </span>
  </span>
);

SlotPrice.propTypes = {
  deliveryPrice: PropTypes.number.isRequired
};

export default SlotPrice;
