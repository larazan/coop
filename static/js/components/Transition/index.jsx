import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Transition.module.scss';

const Transition = ({ status, children }) => {
  const classes = {
    container: classNames(styles.transition, styles[status]),
    icon: styles.icon,
    svg: styles.background,
    children: styles.children
  };
  const failed = status === 'failed';

  return (
    <div data-testid="transition" className={classes.container}>
      <span className={classes.icon}>
        {failed && (
          <svg viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
            <path d="M13,0 C20.176,0 26,5.824 26,13 C26,20.176 20.176,26 13,26 C5.824,26 0,20.176 0,13 C0,5.824 5.824,0 13,0 Z M14.4444444,11.5555556 L11.5555556,11.5555556 L11.5555556,20.2222222 L14.4444444,20.2222222 L14.4444444,11.5555556 Z M13,5.05555556 C11.803383,5.05555556 10.8333333,6.02560526 10.8333333,7.22222222 C10.8333333,8.41883918 11.803383,9.38888889 13,9.38888889 C14.196617,9.38888889 15.1666667,8.41883918 15.1666667,7.22222222 C15.1666667,6.02560526 14.196617,5.05555556 13,5.05555556 Z" />
          </svg>
        )}
      </span>
      <div className={classes.children}>{children}</div>
      <svg className={classes.svg} viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="25" />
      </svg>
    </div>
  );
};

Transition.propTypes = {
  children: PropTypes.node,
  status: PropTypes.oneOf(['working', 'failed']).isRequired
};

Transition.defaultProps = {
  children: undefined
};

export default Transition;
