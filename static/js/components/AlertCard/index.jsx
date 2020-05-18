import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as Squircle } from '../../assets/icons/squircle-mask.svg';

import styles from './AlertCard.module.scss';

const AlertCard = ({ title, theme, children }) => (
  <section className={`container container--padded-magic ${styles.container} ${styles[theme]}`}>
    <div className={styles.card}>
      <Squircle className={styles.squircle} width="100" height="100" />
      <div className={styles.content}>
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
    </div>
  </section>
);

AlertCard.defaultProps = {
  title: null,
  theme: 'orange'
};

AlertCard.propTypes = {
  title: PropTypes.string,
  theme: PropTypes.oneOf(['orange', 'lemon']),
  children: PropTypes.node.isRequired
};

export default AlertCard;
