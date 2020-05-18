import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { ERROR_RESOLUTIONS } from '../../store/messages/errors';

const Resolution = ({ resolution, id, removeMessageById, history }) => {
  const ResolutionButton = ({ routerAction }) => (
    <button
      type="button"
      className="btn btn--primary btn--full"
      onClick={() => {
        removeMessageById(id);
        if (routerAction) {
          routerAction();
        }
      }}
    >
      {resolution.label}
    </button>
  );

  ResolutionButton.propTypes = {
    routerAction: PropTypes.func
  };
  ResolutionButton.defaultProps = {
    routerAction: null
  };

  switch (resolution.type) {
    case ERROR_RESOLUTIONS.LINK:
      return <ResolutionButton routerAction={() => history.push(resolution.url)} />;
    case ERROR_RESOLUTIONS.CLOSE:
    default:
      return <ResolutionButton />;
  }
};

Resolution.propTypes = {
  id: PropTypes.string,
  resolution: PropTypes.shape({
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    url: PropTypes.string
  }),
  removeMessageById: PropTypes.func,
  history: PropTypes.instanceOf(Object).isRequired
};

Resolution.defaultProps = {
  id: null,
  removeMessageById: () => null,
  resolution: undefined
};

export default withRouter(Resolution);
