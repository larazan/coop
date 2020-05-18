import PropTypes from 'prop-types';
import React from 'react';
import './SupplierBanner.scss';

export const MediumImage = ({ image }) => {
  return image ? (
    <>
      <source
        media="(min-width: 30em)"
        srcSet={`${image}?w=468&h=120&fm=webp 1x`}
        type="image/webp"
      />
      <source media="(min-width: 30em)" srcSet={`${image}?fm=webp 2x`} type="image/webp" />
      <source
        media="(min-width: 30em)"
        srcSet={`${image}?w=468&h=120&fm=jpg 1x`}
        type="image/jpeg"
      />
      <source media="(min-width: 30em)" srcSet={`${image}?fm=jpg 2x`} type="image/jpeg" />
    </>
  ) : null;
};

MediumImage.propTypes = {
  image: PropTypes.string
};

MediumImage.defaultProps = {
  image: null
};

export const LargeImage = ({ image }) => {
  return image ? (
    <>
      <source
        media="(min-width: 60em)"
        srcSet={`${image}?w=970&h=250&fm=webp 1x`}
        type="image/webp"
      />
      <source media="(min-width: 60em)" srcSet={`${image}?fm=webp 2x`} type="image/webp" />
      <source
        media="(min-width: 60em)"
        srcSet={`${image}?w=970&h=250&fm=jpg 1x`}
        type="image/jpeg"
      />
      <source media="(min-width: 60em)" srcSet={`${image}?fm=jpg 2x`} type="image/jpeg" />
    </>
  ) : null;
};

LargeImage.propTypes = {
  image: PropTypes.string
};

LargeImage.defaultProps = {
  image: null
};
