import { compose, filter, isNumber, map } from 'lodash/fp';
import PropTypes from 'prop-types';
import React from 'react';
import formatPrice from '../../../utils/formatPrice';
import InformationTable from '../../InformationTable';
import './BasketSummary.scss';

function formatTotalsForDisplay(totals) {
  const dropZeroValues = unformatted => filter(t => t.value && t.value !== 0, unformatted);
  const format = unformatted =>
    map(t => ({ ...t, value: isNumber(t.value) ? formatPrice(t.value) : t.value }), unformatted);

  return compose(format, dropZeroValues)(totals);
}

export const formatDeliveryCharge = charge => {
  if (charge === null) {
    return null;
  }
  // TODO remove duplication on using 'Free' for a zero delivery price
  return charge === 0 ? 'Free' : charge;
};

const negateValue = value => (value ? -1 * value : value);

const BasketSummary = ({
  carrierBags,
  deliveryCharge,
  isCollection,
  isNotMinValue, // nb. this only applies pre-order complete hence the default
  items,
  savings,
  staffDiscount,
  subtotal,
  total,
  voucherDiscount
}) => {
  const HIGHLIGHT_CLS = 'infoblock-table--highlight';
  const BOLD_CLS = 'infoblock-table--bold';

  const breakdown = formatTotalsForDisplay([
    { key: 'Items', value: items },
    {
      key: 'Colleague member discount',
      value: negateValue(staffDiscount),
      additionalCls: HIGHLIGHT_CLS
    },
    {
      key: 'Promotion discount',
      value: negateValue(voucherDiscount),
      additionalCls: HIGHLIGHT_CLS
    },
    { key: 'Savings', value: negateValue(savings), additionalCls: HIGHLIGHT_CLS },
    {
      key: 'Subtotal',
      value: subtotal,
      additionalCls: BOLD_CLS,
      warning: isNotMinValue
    },
    { key: 'Delivery', value: isCollection ? null : formatDeliveryCharge(deliveryCharge) },
    { key: 'Carrier bags', value: carrierBags },
    { key: 'Total', value: total, additionalCls: BOLD_CLS }
  ]);

  return (
    <div data-testid="basket-summary" className="basket--summary">
      <InformationTable content={breakdown} />
    </div>
  );
};

BasketSummary.defaultProps = {
  deliveryCharge: null,
  isNotMinValue: false
};

BasketSummary.propTypes = {
  carrierBags: PropTypes.number.isRequired,
  deliveryCharge: PropTypes.number,
  isCollection: PropTypes.bool.isRequired,
  isNotMinValue: PropTypes.bool,
  items: PropTypes.number.isRequired,
  savings: PropTypes.number.isRequired,
  staffDiscount: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  voucherDiscount: PropTypes.number.isRequired
};

export default BasketSummary;
