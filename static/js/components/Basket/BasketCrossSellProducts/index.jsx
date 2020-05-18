import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listTypes } from '../../../api/cms/productsLists/constants';
import { getBasketItemGtins } from '../../../store/basket/selectors';
import { getCrossSellGtins } from '../../../store/basket/selectors.shared';
import { relatedProductsGetCrossSell } from '../../../store/cms/actions';
import { productsMatchingGtins } from '../../../store/products/selectors';
import ProductGroup from '../../ProductGroup';
import './BasketCrossSellProducts.scss';

const BasketCrossSellProducts = () => {
  const dispatch = useDispatch();
  const basketItems = useSelector(getBasketItemGtins);
  const crossSellGtins = useSelector(getCrossSellGtins);
  const products = useSelector(productsMatchingGtins(crossSellGtins));

  useEffect(() => {
    // load default cross-sell GTINs from CMS
    dispatch(relatedProductsGetCrossSell(listTypes.basket));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (basketItems.length === 0 || products.length === 0) {
    return null;
  }

  return (
    <div className="did-you-forget">
      <ProductGroup theme="linen" title="Did you forget" products={products} />
    </div>
  );
};

export default BasketCrossSellProducts;
