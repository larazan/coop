import React from 'react';
import PropTypes from 'prop-types';
import Back from '../Button/Back';
import './PageHeader.scss';

const PageHeader = ({ title, hasBackLink, backLinkLabel }) => (
  <header className="page-header">
    {hasBackLink ? (
      <div className="page-header__controls">
        <Back label={backLinkLabel} />
      </div>
    ) : null}
    <h1 className="page-header__title">{title}</h1>
  </header>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  hasBackLink: PropTypes.bool,
  backLinkLabel: PropTypes.string
};

PageHeader.defaultProps = {
  hasBackLink: false,
  backLinkLabel: 'Back'
};

export default PageHeader;
