import PropTypes from 'prop-types';

export const nutrient = {
  name: PropTypes.string,
  quantity: PropTypes.arrayOf(PropTypes.string)
};

export const nutritionalInformation = {
  nutritionInfo: PropTypes.shape({
    servingSize: PropTypes.string,
    nutrients: PropTypes.arrayOf(PropTypes.shape(nutrient))
  })
};

export const defaultProps = {
  nutritionInfo: {
    servingSize: null,
    nutrients: []
  }
};
