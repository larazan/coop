import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as CoopLogo } from '../../../assets/coop-logo.svg';
import '../../Header.scss';

const ContentHeader = ({ withoutLink }) => (
  <header className="header">
    <div className="container header--container">
      {withoutLink ? (
        <div className="header--logo">
          <CoopLogo key="coop-logo-svg" className="header--logo--img" alt="logo" />
        </div>
      ) : (
        <Link to="/" className="header--logo">
          <CoopLogo key="coop-logo-svg" className="header--logo--img" alt="logo" />
        </Link>
      )}
    </div>
  </header>
);

ContentHeader.propTypes = {
  withoutLink: PropTypes.bool
};

ContentHeader.defaultProps = {
  withoutLink: false
};

export default ContentHeader;
