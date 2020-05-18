import PropTypes from 'prop-types';
import React from 'react';
import { formatDistance } from '../../../utils/distance';
import './StoreLocationCard.scss';

const StoreLocationCard = ({ name, distance, formattedAddress, onClick }) => (
  <button className="store-location-card" onClick={onClick} type="button">
    <div className="store-location-card--top">
      <h4 className="store-location-card--name">{name}</h4>
      <span className="store-location-card--distance">{formatDistance(distance)}</span>
    </div>
    <address className="store-location-card--address">{formattedAddress}</address>
  </button>
);

StoreLocationCard.propTypes = {
  name: PropTypes.string.isRequired,
  distance: PropTypes.number.isRequired,
  formattedAddress: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default StoreLocationCard;
