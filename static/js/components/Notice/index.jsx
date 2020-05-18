import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isNil from 'lodash/fp/isNil';
import { ReactComponent as InfoIcon } from '../../assets/icons/info.svg';
import './Notice.scss';

const BaseNotice = ({ children, withIcon, theme, sticky }) => {
  const noticeClasses = classNames({
    notice: true,
    'notice--sticky': sticky
  });
  const wrapperClasses = classNames({
    container: true,
    notice__wrapper: true,
    'container--padded-magic': sticky
  });

  return isNil(children) ? null : (
    <div className={noticeClasses} data-theme={theme}>
      <div className={wrapperClasses}>
        {withIcon ? (
          <span className="notice--icon">
            <InfoIcon width="24" height="24" alt="information icon" />
          </span>
        ) : null}
        <span className="notice--message">{children}</span>
      </div>
    </div>
  );
};

const Notice = ({ children, theme, sticky }) => (
  <BaseNotice withIcon={false} theme={theme} sticky={sticky}>
    {children}
  </BaseNotice>
);

export const NoticeWithIcon = ({ children, theme, sticky }) => (
  <BaseNotice withIcon theme={theme} sticky={sticky}>
    {children}
  </BaseNotice>
);

BaseNotice.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  withIcon: PropTypes.bool.isRequired,
  sticky: PropTypes.bool
};

Notice.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  sticky: PropTypes.bool
};

NoticeWithIcon.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.string,
  sticky: PropTypes.bool
};

const defaultProps = {
  sticky: false,
  theme: 'notice-low'
};

BaseNotice.defaultProps = defaultProps;
Notice.defaultProps = defaultProps;
NoticeWithIcon.defaultProps = defaultProps;

export default Notice;
