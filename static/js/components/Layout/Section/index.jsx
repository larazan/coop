import React from 'react';
import PropTypes from 'prop-types';

const Section = ({ children, contain, fillParentContainer, theme }) => (
  <section
    className={`content-section ${fillParentContainer ? 'content-section--grow' : ''}`}
    data-theme={theme}
  >
    {contain ? (
      <div className={contain ? 'container container--padded' : ''}>{children}</div>
    ) : (
      children
    )}
  </section>
);

Section.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
  contain: PropTypes.bool,
  fillParentContainer: PropTypes.bool,
  theme: PropTypes.string
};

Section.defaultProps = {
  contain: true,
  fillParentContainer: false,
  theme: null
};

export default Section;
