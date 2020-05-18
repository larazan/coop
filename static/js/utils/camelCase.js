import camelCaseKeys from 'camelcase-keys';

export const camelCase = obj => camelCaseKeys(obj, { deep: true });
