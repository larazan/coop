/**
 * A common means of "logging" errors until we have an actual strategy
 */
export function logError(error) {
  // eslint-disable-next-line
  console.error(error);
}

export function logErrorFrom(message, error) {
  // eslint-disable-next-line
  console.error(message, error);
}
