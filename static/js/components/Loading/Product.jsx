import React from 'react';
import Skeleton from './Skeleton';
import SkeletonBlock from './SkeletonBlock';
import './Loading.scss';
import Main from '../Layout/Main';

const LoadingProduct = () => (
  <Main identifier="product">
    <div className="container">
      <Skeleton className="pa2">
        <SkeletonBlock className="w-50 h1 mv3" />
        <SkeletonBlock className="w-100 h2 mt3 mb2" />
        <SkeletonBlock className="w-80 h2 mt2 mb3" />
        <SkeletonBlock className="w-25 h1 mt3 mb2" />
        <SkeletonBlock className="w-50 h1 mt2 mb3" />
        <SkeletonBlock className="img mt2 mb3" />
        <SkeletonBlock className="w-100 h1 mv2" />
        <SkeletonBlock className="w-80 h1 mv2" />
        <SkeletonBlock className="w-80 h1 mv3" />
        <SkeletonBlock className="w-100 h3 mv4" />
      </Skeleton>
    </div>
  </Main>
);

export default LoadingProduct;
