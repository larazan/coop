export const authHeaders = ({ accessToken, clientId }) => ({
  Authorization: `Bearer ${accessToken}`,
  client_id: clientId
});

export const postHeaders = headers => ({
  ...headers,
  'Content-Type': 'application/json'
});
