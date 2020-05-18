import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { isMandatoryBagsEnabled, isVouchersEnabled } from '../../utils/featureFlag';
import BasketSummaryContainer from '../Basket/BasketSummary';
import FormCheckbox from '../FormComponent/FormCheckbox';
import {
  email,
  fullName,
  membershipNumber,
  mobilePhone,
  termsAndConditions
} from '../FormComponent/formFields';
import Spinner from '../Loading/Spinner';
import AgeChallengeNotice from './AgeChallengeNotice';
import FormInput from './FormInput';
import membershipNumberHandler from './membershipNumberHandler';
import { SignedInMessage } from './SignedInMessage';
import VoucherCode from './VoucherCode';

const validationSchema = Yup.object().shape({
  fullName: fullName.validation,
  email: email.validation,
  membershipNumber: membershipNumber.validation,
  mobilePhone: mobilePhone.validation,
  termsAndConditions: termsAndConditions.validation
});

const InfoSection = ({ title, text }) => (
  <div className="form-item">
    <p className="form-label">{title}</p>
    <p className="form-hint">{text}</p>
  </div>
);

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export function getCommonProperties({ id, label, component = FormInput }) {
  return {
    name: id,
    key: id,
    component,
    label
  };
}

const CheckoutForm = ({
  isCollection,
  isFetching,
  storeCarrierBags,
  checkoutDetails: initialValues,
  placeOrder,
  productsForOrder,
  slot,
  evaluateMemberDiscount,
  removeMemberDiscount
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={values => placeOrder(slot, productsForOrder, values)}
    validationSchema={validationSchema}
  >
    {({ isValid, setFieldValue, setFieldTouched }) => {
      return (
        <Form noValidate spellCheck="false" autoComplete="off">
          <fieldset className="form-section">
            <h2 className="section-title">Your information</h2>
            <SignedInMessage />

            <Field
              autoComplete="name"
              hint="Required"
              {...getCommonProperties({ id: 'fullName', label: 'Full name' })}
            />

            <Field
              autoComplete="email"
              hint="Required"
              type="email"
              {...getCommonProperties({ id: 'email', label: 'Email address' })}
            />

            <Field
              autoComplete="off"
              hint="If you are already a Co-op member you can earn 5% and 1% on all Co-op branded products."
              type="tel"
              onBlur={evt =>
                membershipNumberHandler(
                  evt,
                  evaluateMemberDiscount,
                  removeMemberDiscount,
                  setFieldTouched
                )
              }
              {...getCommonProperties({ id: 'membershipNumber', label: 'Membership number' })}
            />

            <h2 className="section-title">{`${
              isCollection ? 'Collection' : 'Delivery'
            } information`}</h2>

            <Field
              autoComplete="tel"
              hint="Required. We’ll only contact you if there are any major changes to your order."
              type="tel"
              {...getCommonProperties({ id: 'mobilePhone', label: 'Mobile phone number' })}
            />

            {!isCollection && (
              <Field
                autoComplete="off"
                hint="Let your driver know if you have any special request or want us to leave your order in a safe place."
                {...getCommonProperties({
                  id: 'messageToDriver',
                  label: 'Message to the driver'
                })}
              />
            )}

            {isCollection || isMandatoryBagsEnabled() ? (
              <InfoSection
                title="Carrier bags"
                text={`You have been charged 20p for carrier bags as we will pre pack your shopping ready for ${
                  isCollection ? 'collection' : 'delivery'
                }.`}
              />
            ) : (
              <Field
                hint="We work hard to reduce our environmental impact. That’s why we reuse the bags we deliver your shopping in."
                initialValue={initialValues.carrierBags}
                onChangeCallback={checked => {
                  storeCarrierBags(checked);
                }}
                setFieldValue={setFieldValue}
                text="Keep the reusable plastic shopping bags for 20p."
                type="checkbox"
                {...getCommonProperties({
                  id: 'carrierBags',
                  label: 'Carrier bags',
                  component: FormCheckbox
                })}
              />
            )}

            <h2 className="section-title">Order summary</h2>

            {isVouchersEnabled() ? <VoucherCode isFetching={isFetching} /> : null}

            <BasketSummaryContainer />

            <p>
              We’ll preauthorise a payment on your card of your order total plus 10% in case of any
              substitutions. You will only be charged for the products you receive.
            </p>

            <AgeChallengeNotice />

            <Field
              component={FormCheckbox}
              type="checkbox"
              text={
                <span>
                  I am 18 years old or older and I have read and accept the{' '}
                  <Link to="/terms-of-service" target="_blank">
                    terms of service
                  </Link>
                  .
                </span>
              }
              {...getCommonProperties({
                id: 'termsAndConditions',
                component: FormCheckbox
              })}
            />
          </fieldset>
          <fieldset className="form-section">
            <button
              type="submit"
              disabled={!isValid || isFetching}
              className="btn btn--full btn--primary"
              data-testid="btnSubmit"
            >
              {isFetching ? <Spinner /> : 'Continue to payment'}
            </button>
          </fieldset>
        </Form>
      );
    }}
  </Formik>
);

const price = {
  price: PropTypes.number,
  price_vat: PropTypes.number
};

CheckoutForm.propTypes = {
  isCollection: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  placeOrder: PropTypes.func.isRequired,
  storeCarrierBags: PropTypes.func.isRequired,
  evaluateMemberDiscount: PropTypes.func.isRequired,
  removeMemberDiscount: PropTypes.func.isRequired,
  slot: PropTypes.shape({
    id: PropTypes.string.isRequired,
    startsAt: PropTypes.string.isRequired,
    endsAt: PropTypes.string.isRequired
  }),
  productsForOrder: PropTypes.arrayOf(
    PropTypes.shape({
      gtin: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      allow_replace: PropTypes.bool.isRequired,
      unit_price: PropTypes.shape(price),
      row_price: PropTypes.shape(price)
      /* eslint-enable */
    })
  ).isRequired,
  checkoutDetails: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    membershipNumber: PropTypes.string,
    mobilePhone: PropTypes.string,
    messageToDriver: PropTypes.string,
    carrierBags: PropTypes.bool
  }).isRequired
};

CheckoutForm.defaultProps = {
  slot: {}
};

export default CheckoutForm;
