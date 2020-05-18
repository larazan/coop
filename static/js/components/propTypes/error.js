import PropTypes from 'prop-types';

export default PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  })
]);
