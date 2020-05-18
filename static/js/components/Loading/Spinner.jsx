import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ width, height, stroke }) => (
  <svg
    width={width}
    height={height}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    className="lds-dual-ring"
  >
    <circle
      cx="50"
      cy="50"
      ng-attr-r="{{config.radius}}"
      ng-attr-stroke-width="{{config.width}}"
      ng-attr-stroke="{{config.stroke}}"
      ng-attr-stroke-dasharray="{{config.dasharray}}"
      fill="none"
      strokeLinecap="round"
      r="40"
      strokeWidth="8"
      stroke={stroke}
      strokeDasharray="62.83185307179586 62.83185307179586"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        calcMode="linear"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
        dur="1s"
        begin="0s"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

Spinner.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string
};

Spinner.defaultProps = {
  width: '24',
  height: '24',
  stroke: '#FFFFFF'
};

export default Spinner;
