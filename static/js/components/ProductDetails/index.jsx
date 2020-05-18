import { get, isEmpty } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import formatPrice from '../../utils/formatPrice';
import Back from '../Button/Back';
import CategoryList from '../Category/CategoryList';
import LoadingProduct from '../Loading/Product';
import ProductImage from '../ProductImage';
import { ProductListHorizontal } from '../ProductList';
import PromoBanner from '../ProductPromo';
import productProps, { defaultProps } from '../propTypes/product';
import QuantityControls from '../QuantityControls';
import InfoBlock from './InfoBlock';
import Ingredients from './Ingredients';
import NutritionalInformation from './NutritionalInformation';
import './Product.scss';
import ProductRestrictionNotice from './ProductRestrictionNotice';
import ProductDisclaimer from '../ProductDisclaimer';
import { ItemRestrictionAlert } from '../Covid-19';

const getAllergenStatementWithBold = rawString => {
  const original = rawString;
  const start = rawString.toLowerCase().indexOf('bold');

  if (start === -1) {
    return original;
  }

  const end = start + 4;
  const formatted = [];

  formatted.push(original.slice(0, start));
  formatted.push(<b key={end}>{original.slice(start, end)}</b>);
  formatted.push(original.slice(end));

  return formatted;
};

const ProductDetails = ({
  isAvailable,
  isFetching,
  product,
  quantity,
  changeBasketItemQuantity
}) => {
  const categoryContainingProduct = get(['parentCategories', '0'], product);

  if (isFetching) {
    return <LoadingProduct />;
  }

  if (!isFetching && product) {
    return (
      <div data-testid="product-details">
        <ItemRestrictionAlert />
        <article className="container product-view">
          <header className="product-view--header">
            {product.parentCategories ? (
              <div className="product-view--controls">
                <Back location={`/category/${categoryContainingProduct}`} label="Back" />
              </div>
            ) : null}
            <p className="product-view--brand">{product.brand}</p>
            <h1 className="product-view--name">{product.name}</h1>
          </header>

          <div className="product-view--summary">
            <section className="product-view--essentials">
              {!isEmpty(product.tags) ? (
                <div className="product-view--tags">
                  {product.tags.map(t => (
                    <span className={`pill pill-${t.type}`} key={t.label}>
                      {t.label}
                    </span>
                  ))}
                </div>
              ) : null}
            </section>
            <section className="product-view--essentials">
              <PromoBanner promotion={product.promotions} />
            </section>
            <ProductImage
              images={product.images}
              withBackground
              alt={product.name}
              className="db w-100"
            />

            <section className="product-view--description">
              <p>{product.description}</p>
            </section>

            {product.promoText !== '' ? (
              <section className="product-view--promo">
                <p>{product.promoText}</p>
              </section>
            ) : null}

            <section className="product-view--pricing">
              <span className="product-view--price">{formatPrice(product.price)}</span>
              <span className="product-view--price-per-unit">{product.comparisonPriceText}</span>
            </section>

            <section className="product-view--cta">
              {isAvailable ? (
                <QuantityControls id={product.id} quantity={quantity} gtin={product.gtin} />
              ) : (
                <button disabled type="submit" className="btn btn--full">
                  Product unavailable
                </button>
              )}
            </section>
          </div>

          <section className="product-view--info">
            <ProductRestrictionNotice restriction={product.restriction} />

            <h2>Product information</h2>
            <Ingredients ingredients={product.ingredients} subtitle={product.allergenSubtitle} />

            {product.allergens ? (
              <section className="product-view--notice">
                <div className="product-view--notice-contents">
                  <h4 className="notice--title">Allergens</h4>
                  <p className="notice--content inline-array">
                    <span className="inline-array--label">
                      {getAllergenStatementWithBold(product.allergens)}
                    </span>
                  </p>
                </div>
              </section>
            ) : null}

            <InfoBlock header="Dietary information" value={product.dietaryInfo} />

            <InfoBlock header="Alcohol by volume" value={product.alcoholByVolume} />

            <NutritionalInformation nutritionInfo={product.nutritionInfo} />

            <InfoBlock header="Country of origin" value={product.country} />

            <InfoBlock header="Preparation and usage" value={product.usageInfo} />

            <InfoBlock header="Storage information" value={product.storageInfo} />

            <InfoBlock header="Packaging" value={product.packaging} />

            <InfoBlock header="Safety information" value={product.safetyInfo} />

            <InfoBlock header="Other information" value={product.otherInfo} />

            {product.size ? (
              <InfoBlock header="Weight" value={`${product.size} ${product.sizeUnit}`} />
            ) : null}

            <InfoBlock header="Manufacturer" value={product.manufacturer} />

            <ProductDisclaimer promotions={product.promotions} />
          </section>
        </article>
        {isEmpty(product.relatedProducts) && isEmpty(product.relatedCategories) ? null : (
          <aside className="wrapper--dark">
            <div className="container container--padded">
              {isEmpty(product.relatedProducts) ? null : (
                <section className="product-view--related-products">
                  <h2>Similar products</h2>
                  <ProductListHorizontal
                    products={product.relatedProducts}
                    changeBasketItemQuantity={changeBasketItemQuantity}
                  />
                </section>
              )}

              {isEmpty(product.relatedCategories) ? null : (
                <section className="product-view--related-categories">
                  <h2>Explore more</h2>
                  <CategoryList categories={product.relatedCategories} />
                </section>
              )}
            </div>
          </aside>
        )}
      </div>
    );
  }

  return <LoadingProduct />;
};

ProductDetails.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  product: PropTypes.shape(productProps),
  quantity: productProps.quantity.isRequired,
  changeBasketItemQuantity: PropTypes.func.isRequired
};

ProductDetails.defaultProps = {
  ...defaultProps
};

export default ProductDetails;
