const metresInAMile = 1609.344;

export const formatDistance = metres => `${(metres / metresInAMile).toFixed(2)} miles`;
