export const getEnv = () => ({
  ...process.env,
  ...window.env_config
});

const defaultEnvironmentName = 'localhost';

export const getEnvName = () => {
  const { REACT_APP_ENV: env } = getEnv();
  return env || defaultEnvironmentName;
};

// Provide a default value in the event that basket restrictions are
// flagged on but REACT_APP_BASKET_MAX_SIZE is not set.
export const getMaxBasketSize = () => {
  const { REACT_APP_BASKET_MAX_SIZE: maxBasketSize } = getEnv();

  return parseInt(maxBasketSize, 10) || 999;
};

export const getDefaultProductMaxQuantity = () => {
  const { REACT_APP_PRODUCT_MAX_QUANTITY_DEFAULT: maxDefault } = getEnv();

  return parseInt(maxDefault, 10) || 99;
};
