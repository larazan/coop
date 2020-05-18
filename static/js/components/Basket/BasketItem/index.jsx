import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import formatPrice from '../../../utils/formatPrice';
import { productLink } from '../../../utils/linkFactory';
import ProductImage from '../../ProductImage';
import { OfferDetails } from '../../ProductPromo';
import productProps from '../../propTypes/product';
import QuantityControls from '../../QuantityControls';
import './BasketItem.scss';

const BasketItem = ({ id, gtin, name, images, price, quantity, promotions }) => (
  <div className="basket-item">
    <Link className="basket-item--image" to={productLink(id)}>
      <ProductImage images={images} alt={name} />
    </Link>
    <div className="basket-item--info">
      <div className="basket-item--details">
        <h4 className="basket-item--name">
          <Link to={productLink(id)}>{name}</Link>
        </h4>
        <OfferDetails card promotion={promotions} />
      </div>
      <div className="basket-item--totals">
        <div className="basket-item--price">{formatPrice(price)}</div>
        <QuantityControls id={id} quantity={quantity} gtin={gtin} />
      </div>
    </div>
  </div>
);

BasketItem.propTypes = {
  id: productProps.id.isRequired,
  gtin: productProps.gtin.isRequired,
  name: productProps.name.isRequired,
  images: productProps.images.isRequired,
  price: productProps.price.isRequired,
  quantity: PropTypes.number.isRequired,
  promotions: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default BasketItem;
