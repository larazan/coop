import useInterval from '@use-it/interval';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { usePaymentStatusPolling } from '../../hooks/usePayment';
import {
  hasFailedPayment,
  isPaymentSuccessful,
  shouldCheckPaymentStatus
} from '../../store/api/selectors/payment';
import { ERROR_RESOLUTIONS } from '../../store/messages/errors';
import { AppErrorContent } from '../AppError';
import Spinner from '../Loading/Spinner';
import './Payment.scss';

export const intervals = {
  THREE: 3000,
  FIFTEEN: 15000
};

export const messages = [
  'Payment processing, please wait...',
  'We are still processing your payment, this may take up to 30 seconds.',
  'Sorry, we are still working on getting your payment processed.',
  "Sorry, it's taking longer than expected."
];

export const DO_NOT_CLOSE = 'Please do not close or refresh this page.';

const Failed = () => (
  <AppErrorContent
    title="Sorry, something went wrong"
    content="Please contact your bank for more details or try using a different card."
    resolution={{
      label: 'Back to checkout',
      type: ERROR_RESOLUTIONS.LINK,
      url: '/checkout'
    }}
  />
);

const PaymentProcessing = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(intervals.THREE);
  const shouldCheck = useSelector(shouldCheckPaymentStatus);
  const paymentSuccessful = useSelector(isPaymentSuccessful);
  const paymentFailed = useSelector(hasFailedPayment);

  usePaymentStatusPolling();

  // FIXME: extract?
  // update holding message every X seconds
  useInterval(() => {
    if (shouldCheck) {
      if (count < messages.length - 1) {
        setCount(currentCount => currentCount + 1);
      }
      if (delay === intervals.THREE) {
        setDelay(intervals.FIFTEEN);
      }
    }
  }, delay);

  const Pending = () => (
    <div className="payment">
      <h1>Payment</h1>
      <div className="payment-processing">
        <Spinner stroke="#122947" height="70" width="70" />
        <div className="payment-processing--message">{messages[count]}</div>
        {count > 0 ? <div className="payment-processing--message">{DO_NOT_CLOSE}</div> : null}
      </div>
    </div>
  );

  if (paymentSuccessful) {
    return <Redirect to="/order-complete" />;
  }

  if (paymentFailed) {
    return <Failed />;
  }

  if (!shouldCheck) {
    return <Redirect to="/basket" />;
  }

  return <Pending />;
};

export default PaymentProcessing;
