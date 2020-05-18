import React from 'react';
import './Loading.scss';
import Skeleton from './Skeleton';
import SkeletonBlock from './SkeletonBlock';
import SkeletonBox from './SkeletonBox';

const Slot = () => (
  <SkeletonBox className="flex">
    <SkeletonBlock className="w1 h1 mr2 circle" />
    <SkeletonBlock className="w-33 h1" />
  </SkeletonBox>
);

const SlotDay = () => (
  <div className="mv1">
    <SkeletonBlock className="w-30 h1 mt4 mb3" />
    <Skeleton className="mv2 br2 overflow-hidden">
      <Slot />
      <Slot />
      <Slot />
    </Skeleton>
  </div>
);

export const LoadingSlots = () => (
  <div>
    <SlotDay />
    <SlotDay />
  </div>
);
