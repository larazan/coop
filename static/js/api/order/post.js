/* eslint-disable camelcase */
import get from 'lodash/fp/get';
import { PLASTIC_BAG_EAN } from '../../constants';
import { safeParse, twoDp } from '../../utils/money';
import { dgPost, fetching, handleDgError } from '../fetchOptions';
import { extractValues } from '../utils/coopBasketApi';
import { dgUrl } from '../utils/dgUrls';

const bagCost = items => {
  const baggage = items.find(item => item.ean === PLASTIC_BAG_EAN);
  if (baggage) {
    return baggage.quantity * baggage.retailPrice;
  }
  return 0;
};

export const getItemsTotal = products => {
  return products.reduce((acc, value) => acc + value.row_price.price, 0);
};

export const getDeliveryCharge = ({ type, delivery_slot: { delivery_price } }) =>
  type === 'home-delivery' ? delivery_price : 0;

const getCheckoutId = urlStr => {
  const url = new URL(urlStr);
  return new URLSearchParams(url.search).get('checkoutId');
};

/**
 * We can't use the `created_at` timestamp returned to us by DG as
 * it isn't reliably parsable across JS engines/compilers. Using Date.now()
 * should be accurate enough for now.
 */
function getCreatedAt() {
  return new Date();
}

export const getStaffDiscount = rewards => (rewards ? rewards.staffDiscount : 0);

export const getTotalBreakdown = ({
  carrierBags,
  deliveryCharge,
  discount,
  items,
  staffDiscount,
  total,
  voucherDiscount
}) => ({
  carrierBags,
  deliveryCharge,
  items,
  savings: twoDp(discount - staffDiscount),
  staffDiscount,
  subtotal: twoDp(items - discount),
  total, // nb. already includes carrierBags
  voucherDiscount
});

export const transform = ({ data }) => {
  const basket = get(['external_data', 'coop', 'basket'], data);
  const { discount, staffDiscount, total, voucherDiscount } = extractValues(basket);

  const checkoutUrl = get(['payment', 'checkout_url'], data);
  const checkoutId = getCheckoutId(checkoutUrl);

  const address = get(['parts', '0', 'delivery_method', 'service', 'address', 'address'], data);

  // safely parse these values as we sometimes see them as exponent strings 😬
  const confirmedPrice = safeParse(get(['parts', '0', 'price', 'total_price_vat'], data));

  const items = getItemsTotal(get(['parts', '0', 'products'], data));
  const deliveryCharge = getDeliveryCharge(get(['parts', '0', 'delivery_method', 'service'], data));

  const totalBreakdown = getTotalBreakdown({
    carrierBags: bagCost(basket.items),
    deliveryCharge,
    discount,
    items,
    staffDiscount,
    total: safeParse(total),
    voucherDiscount
  });

  return {
    orderNumber: data.id,
    visibleId: data.visible_id,
    createdAt: getCreatedAt(),
    confirmedPrice,
    checkoutUrl,
    checkoutId,
    customerEmail: get(['customer_address', 'email'], data),
    address,
    totalBreakdown
  };
};

export const post = async ({ order }) => {
  const url = dgUrl('/v1/customers/555/orders');

  const operation = dgPost({ url, body: order });
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
};
