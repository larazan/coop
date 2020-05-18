import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReactComponent as LocationPin } from '../../../assets/icons/location-pin.svg';
import Spinner from '../../Loading/Spinner';
import errorProps from '../../propTypes/error';
import InlineError from './InlineError';
import './PostcodeSearch.scss';

const PostcodeSearch = ({
  btnClassName,
  btnContent,
  error,
  initialPostcode,
  isFetching,
  label,
  onSubmitPostcode,
  placeholder
}) => {
  const [postcode, setPostcode] = useState(initialPostcode || '');
  const onChangePostcode = e => setPostcode(e.target.value.toUpperCase());

  return (
    <form
      className="postcode-search"
      onSubmit={e => {
        e.preventDefault();
        onSubmitPostcode(postcode);
      }}
    >
      <div className="form-item">
        <label htmlFor="postcode" className="form-label">
          {label}
        </label>
        <div className="form-item--searchbox">
          <span className="form-item--searchbox--input">
            <input
              autoComplete="postal-code"
              className="form-input"
              data-testid="postcode-input"
              onChange={onChangePostcode}
              placeholder={placeholder}
              type="text"
              value={postcode}
            />
          </span>
          <button
            className={btnClassName}
            type="submit"
            disabled={postcode === ''}
            data-testid="postcode-button"
          >
            {isFetching ? <Spinner /> : btnContent}
          </button>
        </div>
        <InlineError error={error} />
      </div>
    </form>
  );
};

PostcodeSearch.propTypes = {
  btnClassName: PropTypes.string,
  btnContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  // nb. this is to appease <InlineError />
  error: errorProps,
  initialPostcode: PropTypes.string,
  isFetching: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onSubmitPostcode: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

PostcodeSearch.defaultProps = {
  btnClassName: 'postcode-search__button',
  btnContent: <LocationPin />,
  initialPostcode: '',
  isFetching: false,
  error: null,
  placeholder: 'M60 0AG'
};

export default PostcodeSearch;
