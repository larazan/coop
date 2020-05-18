export const url = (href, params) => {
  const link = new URL(href);
  link.search = new URLSearchParams(params).toString();
  return link.toString();
};

// FIXME test me please!
export const getQueryParams = (queryString = window.location.search) => {
  const urlParams = new URLSearchParams(queryString);

  const params = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of urlParams.entries()) {
    params[key] = value;
  }
  return params;
};
