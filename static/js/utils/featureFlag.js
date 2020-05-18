import { getEnv } from './environment';

const REACT_APP_FLAG_ACCOUNT = 'REACT_APP_FLAG_ACCOUNT';
const REACT_APP_FLAG_ANALYTICS_FUNNEL = 'REACT_APP_FLAG_ANALYTICS_FUNNEL';
const REACT_APP_FLAG_BASKET_CROSS_SELL = 'REACT_APP_FLAG_BASKET_CROSS_SELL';
const REACT_APP_FLAG_BASKET_DID_YOU_FORGET = 'REACT_APP_FLAG_BASKET_DID_YOU_FORGET';
const REACT_APP_FLAG_BASKET_SIZE_RESTRICTION = 'REACT_APP_FLAG_BASKET_SIZE_RESTRICTION';
const REACT_APP_FLAG_CMS = 'REACT_APP_FLAG_CMS';
const REACT_APP_FLAG_DISPLAY_SLOT_COST = 'REACT_APP_FLAG_DISPLAY_SLOT_COST';
const REACT_APP_FLAG_MANDATORY_BAGS = 'REACT_APP_FLAG_MANDATORY_BAGS';
const REACT_APP_FLAG_ROLLBAR_LOGGING_FROM_LOCALHOST =
  'REACT_APP_FLAG_ROLLBAR_LOGGING_FROM_LOCALHOST';
const REACT_APP_FLAG_USER_FEEDBACK = 'REACT_APP_FLAG_USER_FEEDBACK';
const REACT_APP_FLAG_VOUCHERS = 'REACT_APP_FLAG_VOUCHERS';

export const isEnabled = flag => getEnv()[flag] === 'true';

export const isAccountEnabled = () => isEnabled(REACT_APP_FLAG_ACCOUNT);
export const isAnalyticsFunnelEnabled = () => isEnabled(REACT_APP_FLAG_ANALYTICS_FUNNEL);
export const isMandatoryBagsEnabled = () => isEnabled(REACT_APP_FLAG_MANDATORY_BAGS);
export const isBasketCrossSellEnabled = () => isEnabled(REACT_APP_FLAG_BASKET_CROSS_SELL);
export const isBasketDidYouForgetEnabled = () => isEnabled(REACT_APP_FLAG_BASKET_DID_YOU_FORGET);
export const isBasketMaxSizeEnabled = () => isEnabled(REACT_APP_FLAG_BASKET_SIZE_RESTRICTION);
export const isCmsEnabled = () => isEnabled(REACT_APP_FLAG_CMS);
export const isRollbarLoggingFromLocalhostEnabled = () =>
  isEnabled(REACT_APP_FLAG_ROLLBAR_LOGGING_FROM_LOCALHOST);
export const isSlotCostEnabled = () => isEnabled(REACT_APP_FLAG_DISPLAY_SLOT_COST);
export const isUserFeedbackEnabled = () => isEnabled(REACT_APP_FLAG_USER_FEEDBACK);
export const isVouchersEnabled = () => isEnabled(REACT_APP_FLAG_VOUCHERS);
