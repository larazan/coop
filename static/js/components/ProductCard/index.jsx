import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Squircle } from '../../assets/offer-squircle.svg';
import { ICON_SIZE_MEDIUM } from '../../constants';
import { productLink } from '../../utils/linkFactory';
import ProductImage from '../ProductImage';
import PromoBanner from '../ProductPromo';
import productProps from '../propTypes/product';
import QuantityControls from '../QuantityControls';
import './ProductCard.scss';

function productHasPromotions(promotions) {
  return promotions && promotions[0] !== '';
}

const ProductCard = ({
  id,
  brand,
  brandImageUrl,
  displayPrice,
  gtin,
  images,
  name,
  promotions,
  quantity,
  size,
  sizeUnit,
  theme
}) => {
  return (
    <article className="product-card" data-testid="product-card" data-theme={theme}>
      <header className="product-card--header">
        {productHasPromotions(promotions) ? (
          <Squircle
            className="product-card--offer-badge"
            alt="Offer badge mid"
            height={ICON_SIZE_MEDIUM.height}
            width={ICON_SIZE_MEDIUM.width}
          />
        ) : null}
        <Link data-testid="product-card--link" to={productLink(id)} className="product-card--link">
          <ProductImage images={images} className="product-card--img" alt={name} />
          {brandImageUrl ? null : <h1 className="product-card--name">{name}</h1>}
        </Link>
      </header>

      <footer className="product-card--bottom">
        <PromoBanner promotion={promotions} card />

        <div className="product-card--info">
          <div className="product-card--info-block">
            {brandImageUrl ? <h1 className="product-card--name">{name}</h1> : null}
            <div className="product-card--info--size">
              {size} {sizeUnit}
            </div>
            <div className="product-card--info--price">{displayPrice}</div>
          </div>
          {brandImageUrl ? (
            <div className="product-card--info-block">
              <img src={brandImageUrl} alt={brand} className="product-card--brand-img" />
            </div>
          ) : null}
        </div>

        <QuantityControls id={id} gtin={gtin} quantity={quantity} />
      </footer>
    </article>
  );
};

ProductCard.defaultProps = {
  size: '',
  sizeUnit: '',
  promotions: [''],
  brand: null,
  brandImageUrl: null,
  theme: 'light'
};

ProductCard.propTypes = {
  id: productProps.name.isRequired,
  brand: productProps.brand,
  brandImageUrl: productProps.brandImageUrl,
  displayPrice: productProps.displayPrice.isRequired,
  gtin: productProps.gtin.isRequired,
  images: productProps.images.isRequired,
  name: productProps.name.isRequired,
  promotions: productProps.promotions,
  quantity: productProps.quantity.isRequired,
  size: productProps.size,
  sizeUnit: productProps.sizeUnit,
  theme: PropTypes.string
};

export default ProductCard;
