import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useCheckoutFunnelCheckout } from '../../hooks/useAnalytics';
import { useFreshPaymentProcess } from '../../hooks/usePayment';
import { isEligibleForCheckout } from '../../store/order/selectors';
import BookOrChangeSlot from '../OrderFulfilment/BookOrChangeSlot';
import PageHeader from '../PageHeader';
import slotProps from '../propTypes/slot';
import './Checkout.scss';
import CheckoutForm from './CheckoutForm';

const Checkout = ({ orderFulfilment, ...formProps }) => {
  useFreshPaymentProcess();
  useCheckoutFunnelCheckout();

  const eligibleForCheckout = useSelector(isEligibleForCheckout);

  return !eligibleForCheckout ? (
    <Redirect to="/basket" />
  ) : (
    <div className="checkout">
      <section data-theme="alternate">
        <div className="container container--alt">
          <PageHeader title="Checkout" backLinkLabel="View basket" hasBackLink />
          <BookOrChangeSlot {...orderFulfilment} />
        </div>
      </section>

      <section className="container" data-theme="light" data-testid="checkout-form">
        <CheckoutForm {...formProps} />
      </section>
    </div>
  );
};

Checkout.propTypes = {
  orderFulfilment: PropTypes.shape({
    reservedSlot: PropTypes.shape(slotProps),
    selectedAddress: PropTypes.instanceOf(Object),
    fulfilmentType: PropTypes.string
  }).isRequired
};

export default Checkout;
