import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as LocationIcon } from '../../assets/icons/location-pin.svg';
import './ShopInLocation.scss';

const ShopInLocation = ({ postcode }) => (
  <div className="shop-location--wrapper" data-theme="dark-navy" data-testid="shopping-in-panel">
    <button className="shop-location--button" data-theme="dark-navy" type="button">
      <div className="shop-location">
        <span>
          <LocationIcon width="21" height="21" /> Shopping in{' '}
          <span className="shop-location--highlight">{postcode}</span>
        </span>
      </div>
    </button>
  </div>
);

ShopInLocation.propTypes = {
  postcode: PropTypes.string
};

ShopInLocation.defaultProps = {
  postcode: null
};

export default ShopInLocation;
