import rsaToPem from 'rsa-pem-from-mod-exp';

/**
 * Normalised certificate modulus used by API
 */
const normaliseModulus = modulus => modulus.replace(/-/g, '+').replace(/_/g, '/');

/**
 * Convert key used by API
 */
export const formatKey = (modulus, exponent) => rsaToPem(normaliseModulus(modulus), exponent);
