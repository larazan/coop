import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { analyticsCheckoutFunnel } from '../store/analytics/actions';
import { getProducts } from '../store/analytics/operations';
import { productsWithCategoryLabel } from '../store/analytics/shared';
import { getBasketEvaluateValue, getBasketPromotions } from '../store/api/selectors/basket';
import { getConfirmedPrice } from '../store/api/selectors/order';
import { getCategories, noCategoriesLoaded } from '../store/categories/selectors';
import {
  getCompleteBasket,
  getCompleteOffers,
  getCompleteOrderConfirmedPrice
} from '../store/complete/selectors';
import { getBasketItems, hasInfoForAllBasketItems } from '../store/products/selectors';

const funnelStep = {
  BASKET: '1',
  CHECKOUT: '2',
  PAYMENT: '3',
  ORDER_COMPLETE: '4'
};

function useCheckoutFunnel({ step, revenueSelector }) {
  const dispatch = useDispatch();
  const basketProducts = useSelector(getBasketItems());
  const categories = useSelector(getCategories);
  const offers = useSelector(getBasketPromotions);
  const productsLoaded = useSelector(hasInfoForAllBasketItems);
  const noCategories = useSelector(noCategoriesLoaded());
  const revenue = useSelector(revenueSelector);

  const labelledProducts = productsWithCategoryLabel({ products: basketProducts, categories });

  const products = getProducts({ basket: labelledProducts, offers });

  useEffect(() => {
    if (productsLoaded && !noCategories) {
      dispatch(analyticsCheckoutFunnel({ products, step, revenue }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noCategories, productsLoaded]);
}

export const useCheckoutFunnelBasket = () =>
  useCheckoutFunnel({ step: funnelStep.BASKET, revenueSelector: getBasketEvaluateValue });
export const useCheckoutFunnelCheckout = () =>
  useCheckoutFunnel({ step: funnelStep.CHECKOUT, revenueSelector: getBasketEvaluateValue });
export const useCheckoutFunnelPayment = () =>
  useCheckoutFunnel({ step: funnelStep.PAYMENT, revenueSelector: getConfirmedPrice });

export function useCheckoutFunnelComplete() {
  const dispatch = useDispatch();
  const basket = useSelector(getCompleteBasket);
  const offers = useSelector(getCompleteOffers);
  const products = getProducts({ basket, offers });

  const revenue = useSelector(getCompleteOrderConfirmedPrice);

  useEffect(() => {
    dispatch(analyticsCheckoutFunnel({ products, step: funnelStep.ORDER_COMPLETE, revenue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
