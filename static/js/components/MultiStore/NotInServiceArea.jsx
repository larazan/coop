import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as CoopLogo } from '../../assets/coop-logo.svg';
import { tryNewPostcodeFromNotInServiceAreaError } from '../../store/addresses/actions';
import '../Header.scss';
import { ServiceRestrictionAlert } from '../Covid-19';
import Section from '../Layout/Section';
import { LinkInNewTab } from '../Links';
import './NotInServiceArea.scss';

const NotInServiceArea = () => {
  const dispatch = useDispatch();
  const close = () => dispatch(tryNewPostcodeFromNotInServiceAreaError());

  return (
    <>
      <div className="utility-header">
        <div className="container utility-header--container">
          <div className="utility-header--logo">
            <CoopLogo key="coop-logo-svg" className="utility-header--logo--img" alt="logo" />
          </div>
        </div>
      </div>
      <Section>
        <div className="error-page" data-testid="app-error">
          <h1 className="error-page--title">Sorry, this service is not available in your area</h1>
          <ServiceRestrictionAlert />
          <div className="error-page--message">
            <p>
              <LinkInNewTab
                to="https://finder.coop.co.uk/food"
                text="Find your nearest Co-op store."
              />
            </p>
            <hr />
            <h2>The service is currently available in some areas of:</h2>
            <ul>
              <li>London</li>
              <li>Bristol</li>
              <li>Brighton</li>
              <li>Manchester</li>
              <li>Southampton</li>
              <li>Bournemouth</li>
            </ul>

            <h2>
              The service will soon be available in more areas of Manchester and some areas of:
            </h2>
            <ul>
              <li>Leeds</li>
              <li>Sheffield</li>
              <li>Liverpool</li>
              <li>Newcastle</li>
              <li>Nottingham</li>
              <li>Birmingham</li>
            </ul>

            <button type="button" className="btn btn--primary btn--full" onClick={close}>
              Enter a different postcode
            </button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default NotInServiceArea;
