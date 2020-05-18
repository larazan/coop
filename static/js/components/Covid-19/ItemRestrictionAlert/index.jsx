import React from 'react';
import AlertCard from '../../AlertCard';
import { getMaxBasketSize } from '../../../utils/environment';

export const ItemRestrictionAlert = () => (
  <AlertCard title="Demand for deliveries is really&nbsp;high" theme="lemon">
    <p>{`Some products have limits and you can only order a maximum of ${getMaxBasketSize()} items in total.`}</p>
  </AlertCard>
);

export default ItemRestrictionAlert;
