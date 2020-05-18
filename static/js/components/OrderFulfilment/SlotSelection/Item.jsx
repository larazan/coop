import React, { Fragment } from 'react';
import slotProps from '../../propTypes/slot';
import { formatTime, parseDateTime } from '../../../utils/formatTimeSlot';
import SlotPrice from './SlotPrice';
import { isSlotCostEnabled } from '../../../utils/featureFlag';

const SlotItem = ({ id, startsAt, endsAt, date, deliveryPrice, isSelected, selectSlot }) => (
  <Fragment key={`div-${id}`}>
    <label
      key={`label-${id}`}
      htmlFor={`${id}`}
      className={`form-item${isSelected ? ' active' : ''}`}
    >
      <input
        data-testid="slot"
        key={`input-${id}`}
        name="slot"
        className="form-radio-input"
        type="radio"
        id={id}
        alt={startsAt}
        value={id}
        defaultChecked={isSelected}
        onChange={() => selectSlot(id, date)}
      />
      {formatTime(parseDateTime(date, startsAt))} to {formatTime(parseDateTime(date, endsAt))}
      {isSlotCostEnabled() && <SlotPrice deliveryPrice={deliveryPrice} />}
    </label>
  </Fragment>
);

SlotItem.propTypes = slotProps;

export default SlotItem;
