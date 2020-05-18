import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Squircle } from '../../../assets/icons/squircle-mask.svg';
import './ContentCard.scss';

const ContentCard = ({ children, theme, title, content }) => (
  <div className="content-card" data-theme={theme}>
    <header>
      <Squircle className="content-card--squircle" width="100" height="100" />
      <div className="content-card--content">
        <h3 className="content-card--heading">{title}</h3>
        {/*
      There's a design requirement to be able to pass on some rich content,
      such as standard HTML formating to this element.
      */}
        {/* eslint-disable-next-line */}
        <p className="content-card--label" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </header>
    {children}
  </div>
);

ContentCard.defaultProps = {
  children: null
};

ContentCard.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default ContentCard;
