import React from 'react';
import PropTypes from 'prop-types';
import formatPrice from '../../utils/formatPrice';
import { MIN_BASKET_VALUE } from '../../constants';
import { ReactComponent as IconInfo } from '../../assets/icons/info.svg';

const BasketMessages = ({ hasNoMinBasketValue, hasNoOrderFulfilment }) =>
  hasNoMinBasketValue || hasNoOrderFulfilment ? (
    <div className="basket--messages">
      {hasNoMinBasketValue ? (
        <p className="basket--messages--item">
          <IconInfo width="24" height="24" />
          <span>Subtotal {formatPrice(MIN_BASKET_VALUE)} minimum spend not met</span>
        </p>
      ) : null}
      {hasNoOrderFulfilment ? (
        <p className="basket--messages--item">
          <IconInfo width="24" height="24" />
          <span>Arrange delivery or collection</span>
        </p>
      ) : null}
    </div>
  ) : null;

BasketMessages.propTypes = {
  hasNoMinBasketValue: PropTypes.bool.isRequired,
  hasNoOrderFulfilment: PropTypes.bool.isRequired
};

export default BasketMessages;
