import { dgPatch } from '../../fetchOptions';
import { dgUrl } from '../../utils/dgUrls';

export function url(orderNumber) {
  return dgUrl(`/v1/orders/${orderNumber}/finalize`);
}

export class FinalizeError extends Error {
  constructor(res) {
    super(res);

    this.body = res.error;
    this.status = res.status;
  }
}

async function getErrorBody(res) {
  try {
    return await res.json();
  } catch (e) {
    return {
      error: {
        code: 'no_error_body',
        message: 'No error body returned'
      }
    };
  }
}

async function finalizeError(res) {
  // we get a 404 if the payment is not pre-authorised
  // and a 400 if it has been failed
  // sometimes a 412 or 500 for unknown reasons
  const body = await getErrorBody(res);

  const resWithStatus = { ...body, ok: false, status: res.status };

  if (res.status === 400) {
    return resWithStatus;
  }

  throw new FinalizeError(resWithStatus);
}

export const customFetch = async ({ operation, error }) => {
  const res = await operation();

  // 204 is the 👍 response from DG
  if (res.status === 204) {
    return { ok: true, status: res.status };
  }

  return error(res);
};

export const patch = async ({ orderNumber }) => {
  const operation = dgPatch({ url: url(orderNumber) });

  const res = await customFetch({ operation, error: finalizeError });
  return res;
};
