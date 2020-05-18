import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

const AddressList = ({ options, onClick }) =>
  !isEmpty(options) ? (
    <div className="card-list" role="listbox" data-testid="address-list">
      {options.map((address, index) => (
        <button
          key={address.displayName}
          type="button"
          role="option"
          aria-selected="false"
          className="options-list--row"
          data-testid={`address-choice-${index}`}
          data-address={address.displayName}
          onClick={() => {
            onClick(address);
          }}
        >
          {address.displayName}
        </button>
      ))}
    </div>
  ) : null;

AddressList.propTypes = {
  onClick: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired
    }).isRequired
  )
};

AddressList.defaultProps = {
  options: []
};

export default AddressList;
