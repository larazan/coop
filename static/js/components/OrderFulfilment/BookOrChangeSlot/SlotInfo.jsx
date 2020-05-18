import isNil from 'lodash/fp/isNil';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { isCollection } from '../../../constants';
import { formatTimeSlot } from '../../../utils/formatTimeSlot';
import slotProps from '../../propTypes/slot';

const addressType = type => (isCollection(type) ? 'Collecting from' : 'Delivering to');
const formattedSlot = slot => (!isNil(slot) ? formatTimeSlot(slot) : null);

const SlotInfo = ({ fulfilmentType, reservedSlot, selectedAddress }) => (
  <div className="order-slot">
    <Link to={`/${fulfilmentType}`} className="infoblock-edit">
      <span className="infoblock--content">
        {selectedAddress
          ? `${addressType(fulfilmentType)} ${selectedAddress.displayName}`
          : 'No delivery address selected'}
      </span>
      <span className="infoblock--content">
        {formattedSlot(reservedSlot) || 'No time slot selected'}
      </span>
      <span className="infoblock--cta">Change</span>
    </Link>
  </div>
);

SlotInfo.propTypes = {
  fulfilmentType: PropTypes.string,
  selectedAddress: PropTypes.shape({
    displayName: PropTypes.string
  }),
  reservedSlot: PropTypes.shape(slotProps)
};

SlotInfo.defaultProps = {
  fulfilmentType: null,
  selectedAddress: null,
  reservedSlot: null
};

export default SlotInfo;
