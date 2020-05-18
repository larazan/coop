import React from 'react';
import PropTypes from 'prop-types';
import Notice from '../Notice';

const showYourIdFor = age =>
  `You may be asked to show your ID to prove you are over ${age} when receiving this product.`;

export const restrictionMessages = {
  '1': 'Sorry, you can’t add more than 2 per order.',
  '2': 'You may be asked to show your ID when receiving this product.',
  RESTRICTED_TO_SELL_6: showYourIdFor('6 years old'),
  RESTRICTED_TO_SELL_12: showYourIdFor('12'),
  RESTRICTED_TO_SELL_16: showYourIdFor('16'),
  RESTRICTED_TO_SELL_18: showYourIdFor('18'),
  RESTRICTED_TO_SELL_21: showYourIdFor('21')
};

const getRestrictionMsg = restriction => {
  return restrictionMessages[restriction.code] || restriction.defaultMessage;
};

const ProductRestrictionNotice = ({ restriction }) =>
  restriction && restriction.code !== 'UNRESTRICTED' ? (
    <Notice>{getRestrictionMsg(restriction)}</Notice>
  ) : null;

ProductRestrictionNotice.propTypes = {
  restriction: PropTypes.instanceOf(Object)
};

ProductRestrictionNotice.defaultProps = {
  restriction: null
};

export default ProductRestrictionNotice;
