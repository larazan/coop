import React from 'react';
import SkeletonBlock from './SkeletonBlock';

const SignpostMock = () => (
  <div className="pv1">
    <SkeletonBlock className="w-80 h1 mv2" />
    <SkeletonBlock className="w-60 h1 mv2" />
  </div>
);

export default SignpostMock;
