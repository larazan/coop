import { rootReducer } from '../../store';
import { saveState } from '../../store/localStorage';
import { getOrder, getOrderSlotSelector } from '../../store/order/selectors';
import { persistBeforeRedirect } from '../../store/payment/selectors';
import { hasExpired } from '../../store/slots/utils/expiry';

function saveStateWithFormSubmittedFlag(state, setFormSubmittedAction) {
  const allStateWithFlagSet = rootReducer(state, setFormSubmittedAction());
  saveState(persistBeforeRedirect(allStateWithFlagSet));
}

// a list of all configuration options, including event listeners, can be found
// here: https://docs.aciworldwide.com/tutorials/integration-guide/widget-api
export function onBeforeSubmitCard(state, slotHasExpired, setPaymentFormSubmitted) {
  const slot = getOrderSlotSelector()(state);
  const order = getOrder(state);
  const isValidSlot = !hasExpired({ slot, order });

  if (!isValidSlot) {
    slotHasExpired();
    return false;
  }

  // set a flag saying payment form has been submitted. Without being able
  // to check payment status, this lets us disambiguate a newly created order
  // and one which the user has attempted to pay for.
  saveStateWithFormSubmittedFlag(state, setPaymentFormSubmitted);
  return true;
}
