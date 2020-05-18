import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as IconInfo } from '../../assets/icons/info.svg';
import './InformationTable.scss';

const InformationTable = ({ content }) => (
  <dl data-testid="infoblock-table" className="infoblock-table">
    {content.map(({ key, value, additionalCls = '', warning }) => {
      const termCls = `infoblock-table--term${additionalCls ? ` ${additionalCls}` : ''}`;
      const definitionCls = `infoblock-table--definition tr${
        additionalCls ? ` ${additionalCls}` : ''
      }`;
      return (
        <Fragment key={key}>
          <dt className={termCls}>
            {warning ? <IconInfo width="24" height="24" /> : null} {key}
          </dt>
          <dd className={definitionCls}>{value}</dd>
        </Fragment>
      );
    })}
  </dl>
);

InformationTable.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      additionalCls: PropTypes.string,
      warning: PropTypes.bool
    })
  ).isRequired
};

export default InformationTable;
