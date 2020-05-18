import React from 'react';
import Signpost from './Signpost';
import './Loading.scss';

const LoadingCategories = () => (
  <div className="category-list" data-testid="loading-category-list">
    <Signpost />
    <Signpost />
    <Signpost />
    <Signpost />
    <Signpost />
    <Signpost />
    <Signpost />
    <Signpost />
    <Signpost />
  </div>
);

export default LoadingCategories;
