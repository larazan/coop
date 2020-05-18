import { getEnv } from '../utils/environment';
import { logError } from '../utils/logError';

export const defaultOptions = {
  referer: '/',
  referrerPolicy: 'no-referrer-when-downgrade',
  mode: 'cors'
};

export const getHeaders = headers => ({
  Accept: 'application/json',
  ...headers
});

export const postHeaders = headers => ({
  'Content-Type': 'application/json',
  ...getHeaders(headers)
});

export const postHeadersNoBody = headers => ({
  Accept: '*/*',
  ...headers
});

export const dgHeaders = () => {
  const { REACT_APP_DG_API_KEY, REACT_APP_DG_ORG_ID } = getEnv();

  return {
    'DG-Api-Key': REACT_APP_DG_API_KEY,
    'DG-Organization-Id': REACT_APP_DG_ORG_ID
  };
};

export const jsonGet = ({ url, headers = {}, options = {} }) => {
  return async () => {
    return fetch(url, {
      ...defaultOptions,
      ...options,
      method: 'GET',
      headers: getHeaders(headers)
    });
  };
};

export const cmsJsonGet = ({ url, headers = {} }) => {
  return jsonGet({
    url,
    headers,
    options: {
      cache: 'no-cache'
    }
  });
};

const postOrPatch = async ({ url, headers, body, method }) => {
  return fetch(url, {
    ...defaultOptions,
    method,
    headers: body ? postHeaders(headers) : postHeadersNoBody(headers),
    body: body ? JSON.stringify(body) : null
  });
};

export const jsonPost = ({ url, headers = {}, body }) => {
  return () => postOrPatch({ url, headers, body, method: 'POST' });
};

export const jsonPatch = ({ url, headers = {}, body = null }) => {
  return () => postOrPatch({ url, headers, body, method: 'PATCH' });
};

export const httpDelete = ({ url, headers = {} }) => {
  return async () => {
    return fetch(url, {
      ...defaultOptions,
      method: 'DELETE',
      headers
    });
  };
};

export const dgGet = ({ url }) => {
  return jsonGet({ url, headers: dgHeaders() });
};

export const dgPost = ({ url, body }) => {
  return jsonPost({ url, headers: dgHeaders(), body });
};

export const dgPatch = ({ url, body = null }) => {
  return jsonPatch({ url, headers: dgHeaders(), body });
};

export const handleDgError = async res => {
  const response =
    res.status < 500
      ? await res.json()
      : {
          error: {
            code: 'internal_server_error',
            message: res.statusText
          }
        };

  // eslint-disable-next-line no-console
  logError(response);
  return Promise.reject(response);
};

// FIXME we need to know how to handle autoAddress errors!
//  for now we just forward to handleDgError
export const handleAutoaddressError = async res => {
  return handleDgError(res);
};

export class CmsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const handleCmsError = async res => {
  throw new CmsError(res.statusText, res.status);
};

const noop = res => res;

export const fetching = async ({ operation, transform = noop, error = noop }) => {
  const res = await operation();
  if (res.ok) {
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('json')) {
      return transform(await res.json());
    }
    return { ok: res.ok, status: res.status };
  }
  return error(res);
};
