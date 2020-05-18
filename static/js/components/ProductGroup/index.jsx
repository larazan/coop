import React from 'react';
import PropTypes from 'prop-types';
import categoryProps from '../propTypes/category';
import { ProductListHorizontal } from '../ProductList';
import CategoryLinks from '../Category/CategoryLinks';
import './ProductGroup.scss';

const ProductGroup = ({ title, theme, categories, ...productProps }) => (
  <section data-theme={theme}>
    <div className="product-group">
      <h2 className="product-group--title">{title}</h2>
      <ProductListHorizontal {...productProps} />
      <CategoryLinks categories={categories} theme={theme} />
    </div>
  </section>
);

ProductGroup.propTypes = {
  title: PropTypes.string.isRequired,
  theme: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.shape(categoryProps))
};

ProductGroup.defaultProps = {
  theme: 'default',
  categories: null
};

export default ProductGroup;
