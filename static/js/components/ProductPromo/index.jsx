import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash/fp';
import { ReactComponent as SquircleSvg } from '../../assets/offer-squircle.svg';
import { ICON_SIZE_SMALL } from '../../constants';
import './PromoBanner.scss';

export const Squircle = () => (
  <span className="product-promo--squircle">
    <SquircleSvg height={ICON_SIZE_SMALL.height} width={ICON_SIZE_SMALL.width} />
  </span>
);

// eslint-disable-next-line react/prop-types
export const OfferDetails = ({ promotion }) => {
  const [description, expiry] = promotion;

  return (
    <div className="product-promo--details">
      <span className="product-promo--name">{description}</span>
      <span className="product-promo--expiry">{expiry || null}</span>
    </div>
  );
};

const PromoBanner = ({ promotion, card }) => {
  if (isEmpty(promotion) || isEmpty(promotion[0])) {
    return null;
  }

  return (
    <div className={`product-promo${card ? '--card' : ''}`}>
      <Squircle />
      <OfferDetails promotion={promotion} />
    </div>
  );
};
PromoBanner.propTypes = {
  promotion: PropTypes.arrayOf(PropTypes.string),
  card: PropTypes.bool
};
PromoBanner.defaultProps = {
  promotion: [''],
  card: false
};

export default PromoBanner;
