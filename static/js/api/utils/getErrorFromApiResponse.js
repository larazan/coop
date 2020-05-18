/* eslint-disable camelcase */

import { get } from 'lodash/fp';
import {
  AUTH_FAILURE,
  AUTH_FAILURE_UNVERIFIED_ACCOUNT_EXPIRED,
  GENERIC_ERROR,
  REGISTER_ERROR
} from '../../store/messages/errors';

export const SLOT_FULL = 'slot_full';

const errors = {
  authentication_failed: AUTH_FAILURE,
  customer_unverified_access_expired: AUTH_FAILURE_UNVERIFIED_ACCOUNT_EXPIRED,
  unprocessable_entity: REGISTER_ERROR,

  // FIXME will any of these render without a severity?
  delivery_not_available: {
    content: 'Delivery not available to given address'
  },
  invalid_discount_code: {
    content: 'Invalid discount code'
  },
  invalid_store_service: {
    content: 'Store does not support given order type'
  },
  check_address: {
    content: 'Address could not be located, check address'
  },
  modification_error: {
    content: 'Error(s) in modifying data'
  },
  delivery_closed: {
    content: 'Delivery closed, order could not be created'
  },
  ambiguous_address: {
    content: 'Ambiguous address'
  },
  failure: {
    content: 'Internal server error'
  },
  unauthorized: {
    content: 'Unauthorized'
  },
  not_found: {
    content: 'not_found'
  },
  bad_request: {
    content: 'bad_request'
  },
  method_not_allowed: {
    content: 'method_not_allowed'
  },
  precondition_required: {
    content: 'Precondition required'
  },
  precondition_failed: {
    content: 'precondition_failed'
  },
  forbidden: {
    content: 'forbidden'
  },
  [SLOT_FULL]: {
    content: 'slot_full'
  },
  no_orchestration: {
    content: 'no_orchestration'
  }
  // FIXME will any of these render without a severity? ^^^^^^^^
};

const getErrorFromApiResponse = error => {
  const code = get(['error', 'code'], error);
  return errors[code] || GENERIC_ERROR;
};

export default getErrorFromApiResponse;
