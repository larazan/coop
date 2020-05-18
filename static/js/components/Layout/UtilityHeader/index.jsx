import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as CoopLogo } from '../../../assets/coop-logo.svg';
import { ReactComponent as RemoveIcon } from '../../../assets/icons/remove.svg';
import CloseButton from '../../Button/Close';
import '../../Header.scss';

const goToPriorPositionInHistory = (history, priorPosition) => {
  const { length } = history;
  const returnTo = length - priorPosition;
  history.go(-returnTo);
};

const UtilityHeader = ({ history }) => {
  const [priorPositionInHistory, setPriorPositionInHistory] = useState(history.length);

  useEffect(
    () => {
      const { length } = history;
      const priorPosition = length - 1;
      setPriorPositionInHistory(priorPosition);
    },
    // eslint-disable-next-line
    [] // pass empty array to only run once on mount
  );

  return (
    <div className="utility-header">
      <div className="container utility-header--container">
        <Link to="/" className="utility-header--logo">
          <CoopLogo key="coop-logo-svg" className="utility-header--logo--img" alt="logo" />
        </Link>
        <CloseButton
          className="utility-header--close"
          type="button"
          onClick={() => goToPriorPositionInHistory(history, priorPositionInHistory)}
        >
          <span data-testid="close-popover" className="utility-header--close--label">
            Close
          </span>
          <RemoveIcon
            key="remove-icon-svg"
            className="utility-header--close--icon"
            data-testid="close-page"
          />
        </CloseButton>
      </div>
    </div>
  );
};

UtilityHeader.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired
};

export default UtilityHeader;
