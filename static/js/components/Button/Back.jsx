import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { ReactComponent as NavIconLeft } from '../../assets/icons/chevron-small-left.svg';
import './Back.scss';

const Back = ({ label, history, clickHandler = () => history.goBack() }) => (
  <button className="btn-back" onClick={() => clickHandler(history)} type="button">
    <span className="btn-back--icon">
      <NavIconLeft key="nav-icon-left" />
    </span>
    <span className="btn-back--label">{label}</span>
  </button>
);

Back.propTypes = {
  label: PropTypes.string,
  history: PropTypes.instanceOf(Object).isRequired,
  clickHandler: PropTypes.func
};

Back.defaultProps = {
  label: 'Back',
  clickHandler: undefined // this is a hack to appease the linter and allow default assignment above
};

export default withRouter(Back);
