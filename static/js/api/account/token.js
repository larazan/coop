import jwt from 'jsonwebtoken';

export const isExpired = token => {
  const decoded = jwt.decode(token);
  if (decoded) {
    const { exp } = decoded;
    const now = Math.floor(Date.now() / 1000);

    return exp < now;
  }
  return true;
};

export const getEmailAddress = idToken => {
  const decoded = jwt.decode(idToken);
  if (decoded && !isExpired(idToken)) {
    return decoded.email_address;
  }
  return null;
};
