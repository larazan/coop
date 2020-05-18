import PropTypes from 'prop-types';

export default {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  content: PropTypes.string,
  severity: PropTypes.string.isRequired,
  resolution: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string
  })
};
