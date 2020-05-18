import { DialogContent, DialogOverlay } from '@reach/dialog';
import '@reach/dialog/styles.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './UtilitySheet.scss';

const UtilitySheet = ({ children, close, isPadded, visible }) => {
  const classes = classNames({
    'utility-sheet': true,
    'utility-sheet--padded': isPadded
  });
  const cssTransitionClassNamePrefix = 'utility-sheet-';

  // ! FIXME FIGURE OUT HOW TO TRANSITION THIS PROPERLY
  // ! SO IT CAN BE RENDERED WITHOUT ANIMATING INTO PLACE
  return (
    <DialogOverlay isOpen={visible} onDismiss={close} className="overlay">
      <CSSTransition appear in={visible} timeout={250} classNames={cssTransitionClassNamePrefix}>
        <DialogContent className={classes}>{children}</DialogContent>
      </CSSTransition>
    </DialogOverlay>
  );
};

UtilitySheet.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  isPadded: PropTypes.bool,
  visible: PropTypes.bool.isRequired
};

UtilitySheet.defaultProps = {
  isPadded: false
};

export default UtilitySheet;
