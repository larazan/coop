import React from 'react';
import { useDispatch } from 'react-redux';
import { dismissCookieBanner } from '../../store/ui/actions';
import './CookieConsent.scss';

const CookieConsent = () => {
  const dispatch = useDispatch();
  const dismiss = () => dispatch(dismissCookieBanner());

  return (
    <div data-testid="cookie-consent-banner" className="cookie-consent-banner">
      <p>
        This site uses cookies. By continuing to use this site you&#39;re agreeing to our{' '}
        <a href="https://www.coop.co.uk/terms/privacy-notice">cookie policy</a>.
      </p>
      <button type="button" className="btn" onClick={dismiss}>
        Accept and close
      </button>
    </div>
  );
};

export default CookieConsent;
