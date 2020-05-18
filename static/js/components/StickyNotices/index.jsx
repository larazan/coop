import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { BasketRestrictionNotice } from '../Covid-19';
import CookieConsent from '../CookieConsent';
import { isMaxBasketSize } from '../../store/basket/selectors.shared';
import { getCookieBannerDismissed } from '../../store/ui/selectors';

import styles from './StickyNotices.module.scss';

const StickyNotices = () => {
  const maxBasketSize = useSelector(isMaxBasketSize);
  const cookieBannerDismissed = useSelector(getCookieBannerDismissed);

  const suppressProductRestrictionOn = [
    '/payment',
    '/delivery',
    '/collection',
    '/checkout',
    '/payment-status'
  ];
  const { pathname: path } = useLocation();
  const isNotOnSuppressedPath =
    suppressProductRestrictionOn.filter(suppressedPath => suppressedPath === path).length < 1;

  const showProductRestriction = isNotOnSuppressedPath && maxBasketSize;
  const showCookieBanner = !cookieBannerDismissed;
  const show = showProductRestriction || showCookieBanner;

  return (
    show && (
      <div className={styles['sticky-notices']}>
        {showProductRestriction && <BasketRestrictionNotice />}
        {showCookieBanner && <CookieConsent />}
      </div>
    )
  );
};

export default StickyNotices;
