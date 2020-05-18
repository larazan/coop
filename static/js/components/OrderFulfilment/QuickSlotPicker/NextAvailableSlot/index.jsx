import isNil from 'lodash/fp/isNil';
import PropTypes from 'prop-types';
import React from 'react';
import { formatTimeSlot } from '../../../../utils/formatTimeSlot';
import slotPropTypes from '../../../propTypes/slot';
import './NextAvailableSlot.scss';
import { NoSlotsAvailableMsg } from '../../NoSlotsAvailableMsg';

const formatSlot = slot => (!isNil(slot) ? formatTimeSlot(slot) : null);

// eslint-disable-next-line react/prop-types
const ButtonType = ({ action, testId, children }) => (
  <>
    <button type="button" className="next-slot" onClick={action} data-testid={testId}>
      {children}
    </button>
  </>
);

const NextAvailableSlot = ({
  isFetching,
  action,
  fulfilmentType,
  nextAvailableSlot,
  storeLocation,
  testId,
  wrapper: Wrapper
}) => {
  if (isFetching) {
    return (
      <Wrapper action={action} testId={testId}>
        <p>Loading...</p>
      </Wrapper>
    );
  }

  const formattedSlot = formatSlot(nextAvailableSlot);
  return formattedSlot ? (
    <Wrapper action={action} testId={testId}>
      <span className={`next-slot--content ${fulfilmentType}`}>{formattedSlot}</span>
      {storeLocation ? (
        <span className="next-slot--label">
          Store: <span className="fw5">{storeLocation}</span>
        </span>
      ) : null}
    </Wrapper>
  ) : (
    <NoSlotsAvailableMsg />
  );
};

export const NextAvailableSlotButton = props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <NextAvailableSlot {...props} wrapper={ButtonType} />
);

NextAvailableSlot.propTypes = {
  isFetching: PropTypes.bool,
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  fulfilmentType: PropTypes.string.isRequired,
  nextAvailableSlot: PropTypes.shape(slotPropTypes),
  storeLocation: PropTypes.string,
  testId: PropTypes.string,
  wrapper: PropTypes.func.isRequired
};

NextAvailableSlot.defaultProps = {
  isFetching: false,
  nextAvailableSlot: null,
  storeLocation: null,
  testId: null
};

export default NextAvailableSlot;
