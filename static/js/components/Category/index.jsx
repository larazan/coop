import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import LayoutContainer from '../Layout/LayoutContainer';
import Main from '../Layout/Main';
import LoadingCategoryPage from '../Loading/CategoryPage';
import LoadingProductList from '../Loading/ProductList';
import PageHeader from '../PageHeader';
import { ProductListVertical } from '../ProductList';
import categoryProps from '../propTypes/category';
import productProps from '../propTypes/product';
import { SupplierBannerByCategory } from '../SupplierBanner';
import './Category.scss';
import CategoryList from './CategoryList';
import NoProductsFound from './NoProductsFound';
import { ItemRestrictionAlert } from '../Covid-19';

// FIME: do we need to provide prop types for helper components like this?
// eslint-disable-next-line react/prop-types
export const ProductDisplay = ({ isFetching, products, categoryId, ...proxyProps }) => {
  if (isFetching) {
    return <LoadingProductList />;
  }
  if (!isFetching && isEmpty(products)) {
    return <NoProductsFound />;
  }

  return (
    <ProductListVertical keyForProductCount={categoryId} products={products} {...proxyProps} />
  );
};

const CategoryView = ({ isFetching, categoriesLoaded, category, products, ...props }) => {
  if (!categoriesLoaded) {
    return (
      <Main identifier="category">
        <LoadingCategoryPage />
      </Main>
    );
  }

  if (categoriesLoaded && !category) {
    return <Redirect to="/404" />;
  }

  const { subcategories } = category;
  return (
    <Main identifier="category">
      <ItemRestrictionAlert />
      <LayoutContainer>
        <PageHeader title={category.name} hasBackLink backLinkLabel="View homepage" />
      </LayoutContainer>
      {isEmpty(subcategories) ? null : <CategoryList categories={subcategories} />}
      <SupplierBannerByCategory categoryId={category.id} />
      <ProductDisplay
        categoryId={category.id}
        isFetching={isFetching}
        products={products}
        {...props}
      />
    </Main>
  );
};

CategoryView.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  categoriesLoaded: PropTypes.bool.isRequired,
  category: PropTypes.shape(categoryProps),
  subcategories: PropTypes.arrayOf(PropTypes.shape(categoryProps)),
  products: PropTypes.arrayOf(PropTypes.shape(productProps))
};

CategoryView.defaultProps = {
  products: [],
  category: null,
  subcategories: []
};

export default CategoryView;
