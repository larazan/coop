import React from 'react';
import { useSelector } from 'react-redux';
import { useBasketTotals } from '../../../hooks/useBasket';
import { isBasketEmpty, isNotMinBasketValue } from '../../../store/basket/selectors';
import { isCollection as isCollectionSelector } from '../../../store/order/selectors';
import BasketSummary from './BasketSummary';

const BasketSummaryContainer = () => {
  const isEmpty = useSelector(isBasketEmpty);
  const isNotMinValue = useSelector(isNotMinBasketValue);
  const {
    carrierBags,
    deliveryCharge,
    items,
    savings,
    staffDiscount,
    subtotal,
    total,
    voucherDiscount
  } = useBasketTotals();
  const isCollection = useSelector(isCollectionSelector);

  if (isEmpty) {
    return null;
  }

  return (
    <BasketSummary
      carrierBags={carrierBags}
      deliveryCharge={deliveryCharge}
      isCollection={isCollection}
      isNotMinValue={isNotMinValue}
      items={items}
      savings={savings}
      staffDiscount={staffDiscount}
      subtotal={subtotal}
      total={total}
      voucherDiscount={voucherDiscount}
    />
  );
};

export default BasketSummaryContainer;
