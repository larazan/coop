import { getEnv } from './utils/environment';

export const DELIVERY_CHARGE = 5;
export const MIN_BASKET_VALUE = 15;
export const CARRIER_BAGS_CHARGE = 0.2;

// corporation street store details
const { REACT_APP_DG_STORE_ID } = getEnv();
export const STORE_ID = REACT_APP_DG_STORE_ID || '605dc6c0-d1c0-4461-8768-8e055606e011';

export const STORE_RADIUS_IN_METRES = 7000;

export const FULFILMENT_TYPE_DELIVERY = 'delivery';
export const FULFILMENT_TYPE_COLLECTION = 'collection';

export const isCollection = type => type === FULFILMENT_TYPE_COLLECTION;

export const PLASTIC_BAG_EAN = '0000000000644';
export const DELIVERY_CHARGE_EAN = '0000000000002';

export const PAGE_SIZE = 16;
export const pageParams = { page: 1, page_size: PAGE_SIZE };
export const LOYALTY_PROGRAM_NAME = 'Coop';
export const AUTH_RETRIES_ALLOWED = 5;
export const ICON_SIZE_SMALL = { width: 24, height: 24 };
export const ICON_SIZE_MEDIUM = { width: 32, height: 32 };
export const ICON_SIZE_LARGE = { width: 48, height: 48 };

export const DEFAULT_LANG = 'en';
export const DG_TREE_NAME = 'coophomedelivery';

export const DOORBELL_APP_ID = '10381';
export const DOORBELL_APP_KEY = 'dMwIbq9iUB2XCpV3PjFMnBwwtxMyovnGi1LXhtRgaR2P1kArWkTnyDk5SHNJ07Pc';

export const QUICK_SLOT_REFRESH_INTERVAL_IN_MINUTES = 15;

export const DEFAULT_BASKET_ID = '00000000-0000-0000-0000-000000000000';
