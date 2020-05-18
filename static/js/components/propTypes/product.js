import PropTypes from 'prop-types';

export const defaultProps = {
  productsWithBasketQuantity: [],
  relatedCategories: [],
  tags: [],

  // might not come back from the DG API
  size: '',
  sizeUnit: ''
};

const ingredientProps = {
  name: PropTypes.string,
  allergenPositions: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.number,
      startAt: PropTypes.number
    })
  )
};

export default {
  id: PropTypes.string,
  sku: PropTypes.string,
  gtin: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      mediaStorageKey: PropTypes.string,
      mediaDimensionWidth: PropTypes.number
    })
  ),
  displayPrice: PropTypes.string,
  price: PropTypes.number,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sizeUnit: PropTypes.string,
  promotions: PropTypes.arrayOf(PropTypes.string),
  brand: PropTypes.string,
  brandImageUrl: PropTypes.string,
  manufacturer: PropTypes.string,
  safetyInfo: PropTypes.string,
  storageInfo: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape(ingredientProps)),
  allergens: PropTypes.string,
  quantity: PropTypes.number,
  tags: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, type: PropTypes.string }))
};
