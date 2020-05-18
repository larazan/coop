import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as RemoveIcon } from '../../assets/icons/remove.svg';
import { SEVERITY } from '../../store/messages/errors';

import ComponentStyle from './Message.module.scss';

const severityTypes = Object.keys(SEVERITY).map(key => SEVERITY[key]);

const Message = ({ title, children, severity, removeHandler }) => {
  const classes = {
    wrapper: classNames(ComponentStyle.wrapper, ComponentStyle[severity.toLowerCase()]),
    button: classNames(ComponentStyle.button, ComponentStyle.dismiss)
  };

  return (
    <div className={classes.wrapper} data-testid="ui-notification">
      <div className={ComponentStyle.container}>
        {title && <h4 className={ComponentStyle.title}>{title}</h4>}
        <div className={ComponentStyle.content}>{children}</div>
        <button
          type="button"
          className={classes.button}
          data-testid="ui-notification-dismiss"
          onClick={removeHandler}
          aria-label="Close message"
        >
          <RemoveIcon
            key="remove-icon-svg"
            className={ComponentStyle.dismissicon}
            data-testid="close-page"
          />
        </button>
      </div>
    </div>
  );
};

Message.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  severity: PropTypes.oneOf(severityTypes).isRequired,
  removeHandler: PropTypes.func.isRequired
};

Message.defaultProps = {
  title: undefined
};

export default Message;
