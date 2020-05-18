const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isUuid = id => {
  if (!uuidRegex.test(id)) {
    throw new Error(`"${id}" is not a valid UUID`);
  }
};

export const productLink = id => {
  isUuid(id);
  return `/product/${id}`;
};

export const categoryLink = id => `/category/${id}`;
