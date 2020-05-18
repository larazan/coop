import React from 'react';
import { PropTypes } from 'prop-types';
import ProductImage from '../ProductImage';
import './ProductSummaryCard.scss';

const ProductSummaryCard = ({ displayPrice, images, name, quantity, size, sizeUnit }) => (
  <div className="product-summary-card">
    <div className="product-summary-card__media">
      <ProductImage images={images} alt={name} />
    </div>
    <div className="product-summary-card__info">
      <h4 className="product-summary-card__name">{name}</h4>
      <p className="product-summary-card__label">
        {size} {sizeUnit}
      </p>
      <p className="product-summary-card__totals">
        <span className="product-summary-card__price">{displayPrice}</span>
        {quantity ? (
          <span className="product-summary-card__quantity">&times;{quantity}</span>
        ) : null}
      </p>
    </div>
  </div>
);

ProductSummaryCard.propTypes = {
  displayPrice: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  size: PropTypes.number,
  sizeUnit: PropTypes.string
};

ProductSummaryCard.defaultProps = {
  size: null,
  sizeUnit: null
};

export default ProductSummaryCard;
