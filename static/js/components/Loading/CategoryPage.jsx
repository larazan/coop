import React from 'react';
import SkeletonBlock from './SkeletonBlock';
import Signpost from './Signpost';
import './Loading.scss';

const ProductCard = () => (
  <div className="pv1">
    <SkeletonBlock className="img mt2 mb3" />
    <SkeletonBlock className="w-100 h1 mv2" />
    <SkeletonBlock className="w-80 h1 mv2" />
    <SkeletonBlock className="w-25 h1 mv3" />
    <SkeletonBlock className="w-100 h2 mv3" />
  </div>
);

const LoadingCategoryPage = () => (
  <div data-testid="loading-category-page" className="container container--padded">
    <header className="pv2">
      <SkeletonBlock className="w-50 w-25-m h1 mv3" />
      <SkeletonBlock className="w-80 w-50-m h2 mt3 mb2" />
    </header>
    <div className="category-list">
      <Signpost />
      <Signpost />
      <Signpost />
      <Signpost />
    </div>
    <div className="default-grid pv3">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </div>
);

export const LoadingMoreProducts = () => (
  <div className="default-grid pv3">
    <ProductCard />
    <ProductCard />
    <ProductCard />
    <ProductCard />
  </div>
);

export default LoadingCategoryPage;
