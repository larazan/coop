/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onBeforeSubmitCard } from '../components/Payment/formHandlers';
import { shouldCheckPaymentStatus } from '../store/api/selectors/payment';
import {
  finalizeOrder,
  resetPaymentState,
  slotExpiredBeforePayment,
  submitPaymentForm
} from '../store/payment/actions';

export function usePaymentStatusPolling() {
  const dispatch = useDispatch();
  const shouldCheck = useSelector(shouldCheckPaymentStatus);

  useEffect(() => {
    if (shouldCheck) {
      dispatch(finalizeOrder());
    }
  }, []);
}

export function useFreshPaymentProcess() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetPaymentState());
  }, []);
}

export function useAciPaymentForm(checkoutUrl, loadCheckoutWidget, orderTotal) {
  const dispatch = useDispatch();
  const appState = useSelector(state => state);

  useEffect(() => {
    const slotHasExpired = () => dispatch(slotExpiredBeforePayment());
    const setPaymentFormSubmitted = () => dispatch(submitPaymentForm());
    window.wpwlOptions = {
      showPlaceholders: false,
      brandDetection: true,
      showCVVHint: true,
      maskCvv: true,
      labels: {
        cardNumber: 'Card number',
        expiryDate: 'Expiry date',
        cardHolder: 'Cardholder’s name',
        cvv: 'Security code',
        cvvHint:
          'The number on the signature strip on the back of your card, usually 3 or 4 digits.',
        submit: `Pay ${orderTotal}`
      },
      onBeforeSubmitCard: () =>
        onBeforeSubmitCard(appState, slotHasExpired, setPaymentFormSubmitted),
      style: 'plain'
    };

    loadCheckoutWidget(checkoutUrl);
  }, [appState, checkoutUrl, dispatch, orderTotal]);
}
