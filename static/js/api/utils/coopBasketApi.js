import { get, getOr } from 'lodash/fp';

function voucherDiscount(res) {
  const voucher = getOr(0, ['voucher'], res);
  if (voucher) {
    return voucher.value;
  }
  return 0;
}

export function extractValues(res) {
  const basketId = get(['id'], res);
  const discount = get(['cart_discount'], res);
  const membershipNumber = get(['memberCardNumber'], res) || '';
  const staffDiscount = get(['rewards', 'staffDiscount'], res);
  const total = get(['cart_value'], res);

  return {
    basketId,
    discount,
    membershipNumber,
    staffDiscount,
    total,
    voucherDiscount: voucherDiscount(res)
  };
}
