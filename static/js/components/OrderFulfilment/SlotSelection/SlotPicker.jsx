import { parseISO } from 'date-fns';
import { isEmpty, isNil } from 'lodash/fp';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import getSlotById from '../../../store/slots/utils/getSlotById';
import { formatDay } from '../../../utils/formatTimeSlot';
import CloseButton from '../../Button/Close';
import '../../InfoBlock.scss';
import { LoadingSlots } from '../../Loading/Slots';
import coordinatesPropTypes from '../../propTypes/coordinates';
import slotProps from '../../propTypes/slot';
import { NoSlotsAvailableMsg } from '../NoSlotsAvailableMsg';
import SlotItem from './Item';
import './SlotPicker.scss';

class SlotPicker extends Component {
  constructor(props) {
    super(props);

    const { reservedSlot } = this.props;

    this.state = {
      selected: reservedSlot
    };

    this.selectSlot = this.selectSlot.bind(this);
  }

  componentDidMount() {
    const { storeId, coordinates, refreshSlots } = this.props;
    refreshSlots({ storeId, coordinates });
  }

  selectSlot(id) {
    this.setState({ selected: id });
  }

  render() {
    const { isFetchingSlots } = this.props;

    if (isFetchingSlots) {
      return <LoadingSlots />;
    }

    const { availableSlots, confirmSlot, fulfilmentType, history } = this.props;

    const { selected } = this.state;

    const isSlotSelected = !isNil(selected);
    return isEmpty(availableSlots) ? (
      <NoSlotsAvailableMsg />
    ) : (
      <div className="slot-picker" data-testid="slot-picker">
        {Object.entries(availableSlots).map(([day, slotsForDay]) => {
          return (
            <Fragment key={`div-${day}`}>
              <h3 className="section-title" key={`title-${day}`}>
                {formatDay(parseISO(day))}
              </h3>
              <div className="slot-picker--list" key={`list-${day}`}>
                {slotsForDay.map(slot => (
                  <SlotItem
                    key={slot.id}
                    {...slot}
                    isSelected={selected === slot.id}
                    selectSlot={this.selectSlot}
                  />
                ))}
              </div>
            </Fragment>
          );
        })}
        {isSlotSelected ? (
          <div className="slot-picker--confirm">
            <CloseButton
              className="btn btn--full btn--primary"
              onClick={() => {
                const { id, date } = getSlotById(selected, availableSlots);
                confirmSlot(id, date);
                history.goBack();
              }}
            >
              {`Confirm ${fulfilmentType}`}
            </CloseButton>
          </div>
        ) : null}
      </div>
    );
  }
}

SlotPicker.propTypes = {
  availableSlots: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.shape(slotProps))),
  coordinates: PropTypes.shape(coordinatesPropTypes),
  confirmSlot: PropTypes.func.isRequired,
  fulfilmentType: PropTypes.string.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  isFetchingSlots: PropTypes.bool.isRequired,
  refreshSlots: PropTypes.func.isRequired,
  reservedSlot: PropTypes.string,
  storeId: PropTypes.string
};

SlotPicker.defaultProps = {
  availableSlots: null,
  coordinates: null,
  reservedSlot: null,
  storeId: null
};

export default SlotPicker;
