import { capitalize } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import PageHeader from '../../PageHeader';
import AddressSummary from '../AddressSummary';
import SlotPicker from './SlotPicker';
import './SlotSelection.scss';

// eslint-disable-next-line react/prop-types
const SwitchButton = ({ switchTypeFn, switchTypeLabel }) => {
  return (
    <button type="button" onClick={switchTypeFn} className="infoblock-click">
      Arrange a {switchTypeLabel} instead
    </button>
  );
};

const SlotSelection = ({
  confirmSlot,
  fulfilmentType,
  reservedSlot,
  selectedAddress,
  setChangeAddress,
  switchTypeProps,
  ...props
}) => {
  const { availableSlotsForOtherType, switchTypeFn, switchTypeLabel } = switchTypeProps;

  return (
    <>
      <PageHeader title={`Arrange a ${fulfilmentType}`} />
      <div className="slot-selection">
        <div className="slot-selection--address">
          <h2 className="section-title">{capitalize(fulfilmentType)} address</h2>
          <AddressSummary
            content={selectedAddress.displayName}
            onClick={() => setChangeAddress(true)}
            fulfilmentType={fulfilmentType}
          />
        </div>

        {availableSlotsForOtherType && (
          <div className="slot-selection--switch">
            <SwitchButton switchTypeFn={switchTypeFn} switchTypeLabel={switchTypeLabel} />
          </div>
        )}

        <h2 className="section-title">Time slot</h2>
        <SlotPicker
          confirmSlot={confirmSlot}
          fulfilmentType={fulfilmentType}
          reservedSlot={reservedSlot}
          {...props}
        />
      </div>
    </>
  );
};

SlotSelection.propTypes = {
  confirmSlot: PropTypes.func.isRequired,
  fulfilmentType: PropTypes.string,
  reservedSlot: PropTypes.string,
  selectedAddress: PropTypes.instanceOf(Object),
  setChangeAddress: PropTypes.func.isRequired,
  switchTypeProps: PropTypes.shape({
    availableSlotsForOtherType: PropTypes.bool.isRequired,
    switchTypeFn: PropTypes.func.isRequired,
    switchTypeLabel: PropTypes.string.isRequired
  }).isRequired
};

SlotSelection.defaultProps = {
  fulfilmentType: null,
  reservedSlot: null,
  selectedAddress: null
};

export default SlotSelection;
