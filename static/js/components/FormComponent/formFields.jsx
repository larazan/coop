import React from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import formatPhone from '../../utils/formatPhone';

export const fullName = {
  name: 'fullName',
  label: 'Full name',
  hint: 'Required',
  type: 'text',
  autoComplete: 'name',
  validation: Yup.string().required('Enter your full name.')
};

export const email = {
  name: 'email',
  label: 'Email address',
  hint: 'Required',
  type: 'email',
  autoComplete: 'email',
  validation: Yup.string()
    .email('This does not look like an email address.')
    .required('Enter your email address.')
};

export const password = {
  name: 'password',
  label: 'Password',
  hint: 'Required',
  type: 'password',
  autoComplete: 'new-password',
  validation: Yup.string()
    .matches(
      /^((?=.*[\d])(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[A-Z])(?=.*[^\w\d\s])|(?=.*[\d])(?=.*[a-z])(?=.*[^\w\d\s])).{8,64}$/,
      'Choose a different password - it must be at least 8 characters, and including a mix of numbers and upper and lower case letters.'
    )
    .required('Enter a password.')
};

export const confirmPassword = {
  name: 'confirmPassword',
  label: 'Confirm password',
  hint: 'Required',
  type: 'password',
  autoComplete: 'new-password',
  validation: Yup.string()
    .oneOf([Yup.ref('password')], 'Both passwords must match.')
    .required('Re-enter you password.')
};

export const membershipNumberRegex = /^(\d){18}$/;
export const membershipNumber = {
  name: 'membershipNumber',
  label: 'Membership number',
  hint: 'If you are already a Co-op member you can earn 5% and 1% on all Co-op branded products.',
  type: 'tel',
  autoComplete: 'off',
  validation: Yup.string()
    .matches(
      membershipNumberRegex,
      'Enter the 18 digit number on the back of your membership card.'
    )
    .notRequired()
};

export const mobilePhone = {
  name: 'mobilePhone',
  label: 'Mobile phone number',
  hint: 'Required. We’ll only contact you if there are any major changes to your order.',
  type: 'tel',
  autoComplete: 'tel',
  validation: Yup.string()
    .transform(value => formatPhone(value))
    .matches(/^07\d{9}$/, 'This does not look like a valid mobile number (i.e. 07712341234).')
    .required('Enter your mobile phone number.')
};

export const allowMarketing = {
  name: 'allowMarketing',
  text: 'I would like to be contacted with news and offers about the service.',
  type: 'checkbox'
};

export const allowFeedback = {
  name: 'allowFeedback',
  text:
    'I am happy to be contacted about giving feedback on my experience which will help to improve the service.',
  type: 'checkbox'
};

export const termsAndConditions = {
  name: 'termsAndConditions',
  text: (
    <span>
      I have read and accept the{' '}
      <Link to="/terms-of-service" target="_blank">
        terms of service
      </Link>
      .
    </span>
  ),
  type: 'checkbox',
  validation: Yup.bool().oneOf([true]).required()
};
