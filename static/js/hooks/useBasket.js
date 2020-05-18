import { difference, get, isEmpty, map } from 'lodash/fp';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CARRIER_BAGS_CHARGE } from '../constants';
import { loadBasketProducts } from '../store/basket/actions';
import { getBasketItemGtins, orderTotals } from '../store/basket/selectors';
import { getCarrierBags } from '../store/checkout/selectors';
import { getOrderSlotSelector } from '../store/order/selectors';
import { twoDp } from '../utils/money';

const productsGtinSelector = state => map(get('gtin'), state.products.items);

function missingProducts(basketGtins, productsGtins) {
  return difference(basketGtins, productsGtins);
}

export function useBasketProductsLoader() {
  const dispatch = useDispatch();
  const basketGtins = useSelector(getBasketItemGtins);
  const productsGtins = useSelector(productsGtinSelector);
  const missingGtins = missingProducts(basketGtins, productsGtins);

  useEffect(() => {
    if (!isEmpty(missingGtins)) {
      dispatch(loadBasketProducts(missingGtins));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

export const getDeliveryCharge = slot => (slot ? slot.deliveryPrice : null);

export function useBasketTotals() {
  const { items, savings, staffDiscount, subtotal, total, voucherDiscount } = useSelector(
    orderTotals
  );
  const getOrderSlot = getOrderSlotSelector();
  const slot = useSelector(getOrderSlot);
  const carrierBags = useSelector(getCarrierBags) ? CARRIER_BAGS_CHARGE : 0;

  return {
    carrierBags,
    deliveryCharge: getDeliveryCharge(slot),
    items,
    savings,
    staffDiscount,
    subtotal,
    total: twoDp(total + carrierBags),
    voucherDiscount
  };
}
