import React from 'react';
import { NoticeWithIcon } from '../../Notice';
import { getMaxBasketSize } from '../../../utils/environment';

export const BasketRestrictionNotice = () => (
  <NoticeWithIcon>
    <div role="alert" data-testid="max-basket-size-notice">
      <b>Product restrictions due to high demand</b>
      <p>{`You can only add ${getMaxBasketSize()} items to your basket.`}</p>
    </div>
  </NoticeWithIcon>
);

export default BasketRestrictionNotice;
