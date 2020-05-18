import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import ProductCard from '../ProductCard';
import Pagination from './Pagination';
import './ProductList.scss';

const ProductList = ({ products, children, ...proxyProps }) =>
  isEmpty(products) ? null : (
    <>
      <div className="product-list--grid">
        {products.map(product => (
          <ProductCard key={product.id} {...product} {...proxyProps} theme="light" />
        ))}
      </div>
      {children}
    </>
  );
ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  children: PropTypes.element
};
ProductList.defaultProps = {
  children: null
};

export const ProductListHorizontal = props => (
  <div className="product-list--horizontal">
    <div className="product-list--container">
      <ProductList {...props} />
    </div>
  </div>
);
export const ProductListVertical = ({ loadMore, keyForProductCount, ...proxyProps }) => (
  <div className="product-list">
    <div className="product-list--container">
      <ProductList {...proxyProps}>
        {loadMore && (
          <Pagination
            keyForProductCount={keyForProductCount}
            loadMore={loadMore}
            count={proxyProps.productCount}
          />
        )}
      </ProductList>
    </div>
  </div>
);

ProductListVertical.propTypes = {
  loadMore: PropTypes.instanceOf(Object),
  keyForProductCount: PropTypes.string
};

ProductListVertical.defaultProps = {
  keyForProductCount: null,
  loadMore: null
};
