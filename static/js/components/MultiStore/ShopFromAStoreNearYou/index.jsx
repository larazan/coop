import PropTypes from 'prop-types';
import React from 'react';
// FIXME should this be moved?
import PostcodeSearch from '../../OrderFulfilment/PostcodeSearch';
import errorProps from '../../propTypes/error';
import './ShopFromAStoreNearYou.scss';

const ShopFromAStoreNearYou = ({ error, isFetching, label, onClickSetPostcode }) => {
  return (
    <div className="shop-from-a-store-near-you-container">
      <PostcodeSearch
        error={error}
        isFetching={isFetching}
        label={label}
        onSubmitPostcode={onClickSetPostcode}
        placeholder="Enter a postcode"
      />
    </div>
  );
};

ShopFromAStoreNearYou.defaultProps = {
  error: null,
  label: 'Shop from a store near you'
};

ShopFromAStoreNearYou.propTypes = {
  error: errorProps,
  isFetching: PropTypes.bool.isRequired,
  label: PropTypes.string,
  onClickSetPostcode: PropTypes.func.isRequired
};

export default ShopFromAStoreNearYou;
