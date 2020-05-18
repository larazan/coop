import PropTypes from 'prop-types';
import React from 'react';
import { useAciPaymentForm } from '../../hooks/usePayment';

function loadCheckoutWidget(checkoutUrl) {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = checkoutUrl;
  script.async = true;
  document.body.appendChild(script);
}

const PaymentForm = ({ actionUrl, checkoutUrl, orderTotal }) => {
  useAciPaymentForm(checkoutUrl, loadCheckoutWidget, orderTotal);

  return <form action={actionUrl} className="paymentWidgets" data-brands="VISA MASTER" />;
};

PaymentForm.propTypes = {
  actionUrl: PropTypes.string.isRequired,
  orderTotal: PropTypes.string.isRequired,
  checkoutUrl: PropTypes.string.isRequired
};

export default PaymentForm;
