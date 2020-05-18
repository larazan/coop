import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchForAddress } from '../../../store/addresses/actions';
import { getOptions } from '../../../store/addresses/selectors';
import { selectAddress } from '../../../store/order/actions';
import AddressList from './AddressList';
import Spinner from '../../Loading/Spinner';
import PageHeader from '../../PageHeader';
import InlineError from '../PostcodeSearch/InlineError';

const AddressLookup = ({ storeId, error, isFetching, postcode, setChangeAddress }) => {
  const dispatch = useDispatch();
  const options = useSelector(getOptions);
  const [inputValue, setInputValue] = useState(postcode || '');
  const [hasSeenOptions, setHasSeenOptions] = useState(false);

  const updateInputValue = evt => {
    const { value } = evt.target;

    setInputValue(value);
  };

  const handleSelectItem = link => {
    dispatch(selectAddress({ storeId, link }));
  };

  const onSubmitPostcode = evt => {
    evt.preventDefault();
    dispatch(searchForAddress(inputValue));
  };

  useEffect(() => {
    // one-time set
    if (!hasSeenOptions) {
      const now = options && options.length;
      if (now !== hasSeenOptions) {
        setHasSeenOptions(now);
      }
    }

    // close this component if an address has been selected (which nulls the options)
    if (hasSeenOptions && !options) {
      setChangeAddress(false);
    }
  }, [hasSeenOptions, options, setChangeAddress]);

  return (
    <>
      <PageHeader title="Where should we deliver to?" />
      <form className="address-lookup" onSubmit={onSubmitPostcode}>
        <div
          className="form-item address-input"
          role="combobox"
          aria-controls="address-menu"
          aria-expanded="true"
        >
          <label htmlFor="postcode" className="form-label">
            Enter a postcode
          </label>
          <div className="form-item-search">
            <span className="form-item-search--input">
              <input
                className="form-input"
                type="text"
                id="postcode"
                data-testid="postcode-input"
                minLength={2}
                value={inputValue}
                onChange={updateInputValue}
                aria-autocomplete="list"
                placeholder="M60 0AG"
              />
            </span>
            <button
              className="btn btn--secondary address-lookup__button"
              type="submit"
              disabled={inputValue === ''}
            >
              {isFetching ? (
                <>
                  <Spinner /> Looking...
                </>
              ) : (
                'Find address'
              )}
            </button>
          </div>
        </div>
        <InlineError error={error} />
      </form>
      <AddressList options={options} onClick={({ link }) => handleSelectItem(link)} />
    </>
  );
};

AddressLookup.propTypes = {
  storeId: PropTypes.string,
  error: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string
  }),
  isFetching: PropTypes.bool,
  postcode: PropTypes.string,
  setChangeAddress: PropTypes.func.isRequired
};

AddressLookup.defaultProps = {
  storeId: null,
  error: null,
  isFetching: false,
  postcode: null
};

export default AddressLookup;
