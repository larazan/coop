import { membershipNumberRegex } from '../FormComponent/formFields';

/**
 *
 * @param {React.SyntethicEvent} evt onBlur event
 * @param {Function} evaluateAction Function to dispatch Redux action and initiate side-effecting code
 * @param {Function} setFieldTouched Imperatively set the touched state of the form. Required when using custom `onBlur` handler
 *                                   (https://jaredpalmer.com/formik/docs/api/formik#props-1)
 */
export default function membershipNumberHandler(
  evt,
  evaluateAction,
  removeAction,
  setFieldTouched
) {
  const { value } = evt.target;
  const isValidMembershipNumber = membershipNumberRegex.test(value);

  if (isValidMembershipNumber) {
    evaluateAction(value);
  } else {
    removeAction();
  }

  setFieldTouched('membershipNumber');

  return isValidMembershipNumber;
}
