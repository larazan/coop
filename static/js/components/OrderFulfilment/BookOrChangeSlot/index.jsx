import isNil from 'lodash/fp/isNil';
import PropTypes from 'prop-types';
import React from 'react';
import '../../InfoBlock.scss';
import slot from '../../propTypes/slot';
import './BookOrChangeSlot.scss';
import BookSlotButtons from './BookSlotButtons';
import SlotInfo from './SlotInfo';

const BookOrChangeSlot = ({ fulfilmentType, selectedAddress, reservedSlot }) => {
  return isNil(fulfilmentType) ? (
    <BookSlotButtons />
  ) : (
    <SlotInfo
      fulfilmentType={fulfilmentType}
      reservedSlot={reservedSlot}
      selectedAddress={selectedAddress}
    />
  );
};

BookOrChangeSlot.propTypes = {
  fulfilmentType: PropTypes.string,
  selectedAddress: PropTypes.shape({
    displayName: PropTypes.string
  }),
  reservedSlot: PropTypes.shape(slot)
};

BookOrChangeSlot.defaultProps = {
  fulfilmentType: null,
  selectedAddress: null,
  reservedSlot: null
};

export default BookOrChangeSlot;
