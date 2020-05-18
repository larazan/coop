import { filter, find, flow, get, getOr } from 'lodash/fp';
import { bannerImages } from './constants';

const getImageUrl = (imageEntry, res) => {
  const imageId = get('sys.id', imageEntry);

  const url = flow(
    getOr([], 'includes.Asset'),
    find(e => e.sys.id === imageId),
    get('fields.file.url')
  )(res);

  return `https:${url}`;
};

const checkErrors = res => {
  const errorId = getOr(null, 'errors[0].details.id', res);
  if (errorId) {
    const inError = flow(
      getOr([], 'items'),
      filter(e => getOr(null, 'fields.banner.sys.id', e) === errorId)
    )(res);

    if (inError) {
      const name = getOr(null, '[0].fields.name', inError);
      const title = getOr(null, '[0].fields.title', inError);

      throw new Error(`misconfigured: ${name || title}`);
    }
  }
};

export const transformBanner = ({ bannerId }, res) => {
  checkErrors(res);

  const {
    bannerImageSmall,
    bannerImageMedium,
    bannerImageLarge,
    imageAltText,
    linkUrl,
    termsAndConditions
  } = flow(
    getOr([], 'includes.Entry'),
    find(e => e.sys.id === bannerId),
    get('fields')
  )(res);

  const images = {
    [bannerImages.small]: getImageUrl(bannerImageSmall, res),
    [bannerImages.medium]: getImageUrl(bannerImageMedium, res),
    [bannerImages.large]: getImageUrl(bannerImageLarge, res)
  };

  return { imageAltText, images, linkUrl, termsAndConditions };
};
