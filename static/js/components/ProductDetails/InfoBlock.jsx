import React from 'react';
import PropTypes from 'prop-types';

const InfoBlock = ({ header, value }) => {
  return value ? (
    <div className="product-view--infoblock">
      <h3 className="infoblock-header">{header}</h3>
      <p>{value}</p>
    </div>
  ) : null;
};

InfoBlock.propTypes = {
  header: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Object)])
};

InfoBlock.defaultProps = {
  value: null
};

export default InfoBlock;
