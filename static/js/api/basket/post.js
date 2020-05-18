import { get, getOr, identity, isEmpty, map, pickBy } from 'lodash/fp';
import { DEFAULT_BASKET_ID } from '../../../constants';
import { dgPost, fetching, handleDgError } from '../../fetchOptions';
import { extractValues } from '../../utils/coopBasketApi';
import { dgUrl } from '../../utils/dgUrls';

function formatRequiredFields({ basketItems, membershipNumber, slot, storeExternalId }) {
  const items = map(({ sku, id, masterProductId, price, quantity }) => {
    return {
      allow_replace: false,
      picked: false,
      quantity,
      clicks_unit_price: price,
      bricks_unit_price: price,
      total_bricks_price: price,
      total_clicks_price: price,
      product: {
        id,
        sku,
        master_product_id: masterProductId
      }
    };
  }, basketItems);

  // ! FIXME: this field became optional but the function name
  // ! is still formatRequiredFields
  const optional = pickBy(identity, {
    member_card_number: membershipNumber
  });

  return {
    items,
    place_ext_id: storeExternalId,
    delivery_charge_total: slot ? slot.deliveryPrice : 0,
    ...optional
  };
}

export const formatRequest = ({
  basketId: id,
  basketItems,
  membershipNumber,
  slot,
  storeExternalId
}) => {
  const required = formatRequiredFields({ basketItems, membershipNumber, slot, storeExternalId });

  if (id === DEFAULT_BASKET_ID) {
    return required;
  }

  return {
    ...required,
    external_data: {
      coop: {
        basket: {
          id,
          retainAppliedVoucher: true
        }
      }
    }
  };
};

export const formatRequestApplyVoucher = ({
  basketItems,
  membershipNumber,
  slot,
  storeExternalId,
  voucherCode
}) => {
  const required = formatRequiredFields({ basketItems, membershipNumber, slot, storeExternalId });

  if (isEmpty(voucherCode)) {
    return required;
  }

  return {
    ...required,
    external_data: {
      coop: {
        basket: {
          voucherCode
        }
      }
    }
  };
};

export const formatRequestRemoveVoucher = ({
  basketId: id,
  basketItems,
  membershipNumber,
  slot,
  storeExternalId
}) => {
  return {
    ...formatRequiredFields({ basketItems, membershipNumber, slot, storeExternalId }),
    external_data: {
      coop: {
        basket: {
          id
        }
      }
    }
  };
};

export const reshapeRequiredFields = ({ data }) => {
  const {
    basketId,
    discount,
    membershipNumber,
    staffDiscount,
    total,
    voucherDiscount
  } = extractValues(data);

  return {
    checkout: {
      membershipNumber
    },
    evaluate: data,
    order: {
      basketId,
      discount,
      staffDiscount,
      subtotal: total + discount,
      total,
      voucherDiscount
    }
  };
};

export const reshapeResponse = () => ({ data }) => {
  const coopBasketResponse = get('external_data', data);

  return reshapeRequiredFields({ data: coopBasketResponse });
};

const getVoucherInfo = ({ data, voucherCode }) => {
  const voucherStatusCode = getOr(0, ['external_data', 'voucher', 'statusCode'], data);

  if (voucherStatusCode !== 0) {
    return {
      errorVoucher: get(['external_data', 'voucher', 'statusText'], data),
      voucherCode: null
    };
  }
  return { errorVoucher: null, voucherCode };
};

export const reshapeResponseApplyVoucher = ({ voucherCode }) => ({ data }) => {
  const coopBasketResponse = get('external_data', data);
  const required = reshapeRequiredFields({ data: coopBasketResponse });

  return {
    ...required,
    order: {
      ...required.order,
      ...getVoucherInfo({ data, voucherCode })
    }
  };
};

export const reshapeResponseRemoveVoucher = () => ({ data }) => {
  const coopBasketResponse = get('external_data', data);
  const required = reshapeRequiredFields({ data: coopBasketResponse });

  return {
    ...required,
    order: {
      ...required.order,
      voucherCode: null
    }
  };
};

async function post(data, bodyFormatter, responseFormatter) {
  const url = dgUrl('/v1/shopping-lists/evaluate');
  const body = bodyFormatter(data);

  const operation = dgPost({ url, body });
  const transform = responseFormatter(data);
  const error = handleDgError;

  const res = await fetching({ operation, transform, error });
  return res;
}

export const evaluate = async data => post(data, formatRequest, reshapeResponse);

export const evaluateApplyVoucher = async data =>
  post(data, formatRequestApplyVoucher, reshapeResponseApplyVoucher);

export const evaluateRemoveVoucher = async data =>
  post(data, formatRequestRemoveVoucher, reshapeResponseRemoveVoucher);
