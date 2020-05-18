import { isString } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import './InlineError.scss';

// nb. errors can come in object or string form (for historic reasons)
//  - hence adapting them at this level
const adaptError = error => {
  if (error) {
    if (isString(error)) {
      const fullStop = sentence => (sentence ? `${sentence.trim()}.` : null);

      const sentences = error.split('.');
      return { title: fullStop(sentences[0]), content: fullStop(sentences[1]) };
    }
    return error;
  }
  return null;
};

const InlineError = ({ error: raw }) => {
  const error = adaptError(raw);

  return error ? (
    <div className="inline-error" data-testid="inline-error">
      <h4 className="inline-error--title">{error.title}</h4>
      {error.content ? (
        <p className="inline-error--content" data-testid="inline-error--content">
          {error.content}
        </p>
      ) : null}
    </div>
  ) : null;
};

InlineError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.string
    })
  ])
};

InlineError.defaultProps = {
  error: null
};

export default InlineError;
