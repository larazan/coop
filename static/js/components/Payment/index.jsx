import PropTypes from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { ReactComponent as CardIconMastercard } from '../../assets/icons/cc-mastercard.svg';
import { ReactComponent as CardIconVisa } from '../../assets/icons/cc-visa.svg';
import { useCheckoutFunnelPayment } from '../../hooks/useAnalytics';
import BackBtn from '../Button/Back';
import './Payment.scss';
import PaymentForm from './PaymentForm';

const Payment = ({
  canAccessPaymentPage,
  isFetching,
  failedDueToSlotExpiry,
  checkoutUrl,
  orderTotal
}) => {
  useCheckoutFunnelPayment();

  if (isFetching) {
    return (
      <div className="payment">
        <p>Loading...</p>
      </div>
    );
  }

  if (failedDueToSlotExpiry) {
    return <Redirect to="/checkout" />;
  }

  if (!canAccessPaymentPage) {
    return <Redirect to="/basket" />;
  }

  return (
    <div className="payment">
      <header className="payment-header">
        <BackBtn location="/checkout" label="View order summary" />
        <h1 className="page-title">Payment</h1>
      </header>
      <section className="payment-details">
        <div className="payment-details--brands">
          <h2 className="payment-details--subtitle">Pay by card</h2>
          <ul className="card-brands">
            <li>
              <CardIconVisa width="40" className="card-brands-icon" />
            </li>
            <li>
              <CardIconMastercard width="40" className="card-brands-icon" />
            </li>
          </ul>
        </div>
        <PaymentForm
          actionUrl={`${window.location.protocol}//${window.location.host}/payment-status`}
          checkoutUrl={checkoutUrl}
          orderTotal={orderTotal}
        />
      </section>
    </div>
  );
};

Payment.defaultProps = {
  checkoutUrl: null
};

Payment.propTypes = {
  canAccessPaymentPage: PropTypes.bool.isRequired,
  checkoutUrl: PropTypes.string,
  failedDueToSlotExpiry: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  orderTotal: PropTypes.string.isRequired
};

export default Payment;
