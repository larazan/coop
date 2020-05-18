import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannerImages } from '../../api/cms/banner/constants';
import { cleanSearchTerm } from '../../api/cms/banner/utilities';
import {
  supplierBannerByCategoryId,
  supplierBannerByPage,
  supplierBannerBySearchTerm
} from '../../store/cms/actions';
import {
  getBannerByCategoryId,
  getBannerByPage,
  getBannerBySearchTerm
} from '../../store/cms/selectors';
import { isCmsEnabled } from '../../utils/featureFlag';
import Section from '../Layout/Section';
import { LargeImage, MediumImage } from './images';
import './SupplierBanner.scss';

const SupplierBannerBy = ({ action, selector }) => {
  const dispatch = useDispatch();
  const data = useSelector(selector);

  useEffect(() => {
    if (isCmsEnabled()) {
      dispatch(action);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(action)]);

  if (!isCmsEnabled()) {
    return null;
  }

  return data ? (
    <Section theme="default">
      <figure className="supplier-banner" data-testid="supplier-banner">
        <a href={data.linkUrl}>
          <picture className="supplier-banner__media">
            <LargeImage image={data.images[bannerImages.large]} />
            <MediumImage image={data.images[bannerImages.medium]} />
            <img
              srcSet={`${data.images[bannerImages.small]}?fm=jpg`}
              alt={data.imageAltText ? data.imageAltText : null}
              type="image/jpeg"
            />
          </picture>
        </a>
        {data.termsAndConditions ? (
          <figcaption className="supplier-banner__caption">
            <p>{data.termsAndConditions}</p>
          </figcaption>
        ) : null}
      </figure>
    </Section>
  ) : null;
};

SupplierBannerBy.propTypes = {
  action: PropTypes.shape({
    type: PropTypes.string.isRequired,
    payload: PropTypes.object.isRequired
  }).isRequired,
  selector: PropTypes.func.isRequired
};

export const SupplierBannerByCategory = ({ categoryId }) => {
  const action = supplierBannerByCategoryId({ categoryId });
  const selector = getBannerByCategoryId({ categoryId });

  return <SupplierBannerBy action={action} selector={selector} />;
};

SupplierBannerByCategory.propTypes = {
  categoryId: PropTypes.string
};

SupplierBannerByCategory.defaultProps = {
  categoryId: null
};

export const SupplierBannerByPage = ({ page }) => {
  const action = supplierBannerByPage({ page });
  const selector = getBannerByPage({ page });

  return <SupplierBannerBy action={action} selector={selector} />;
};

SupplierBannerByPage.propTypes = {
  page: PropTypes.string
};

SupplierBannerByPage.defaultProps = {
  page: null
};

export const SupplierBannerBySearchTerm = ({ searchTerm: raw }) => {
  // TODO can we just do this once here?
  const searchTerm = cleanSearchTerm(raw);

  const action = supplierBannerBySearchTerm({ searchTerm });
  const selector = getBannerBySearchTerm({ searchTerm });

  return <SupplierBannerBy action={action} selector={selector} />;
};

SupplierBannerBySearchTerm.propTypes = {
  searchTerm: PropTypes.string
};

SupplierBannerBySearchTerm.defaultProps = {
  searchTerm: null
};
