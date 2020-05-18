import React from 'react';
import PropTypes from 'prop-types';
import productProps from '../propTypes/product';

const ProductImage = ({ images, alt, className, withBackground }) => (
  <section className={withBackground ? 'product-view--image' : 'product-photo'}>
    <img
      srcSet={images.map(image => `${image.mediaStorageKey} ${image.mediaDimensionWidth * 2.5}w`)}
      className={className}
      alt={alt}
    />
  </section>
);

ProductImage.propTypes = {
  images: productProps.images.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  withBackground: PropTypes.bool
};
ProductImage.defaultProps = {
  className: null,
  withBackground: false
};

export default ProductImage;
