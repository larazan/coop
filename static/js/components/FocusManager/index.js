import { Component } from 'react';
import PropTypes from 'prop-types';

class FocusManager extends Component {
  canBlur = true;

  handleMouseDown = () => {
    this.canBlur = false;
  };

  handleMouseUp = () => {
    this.canBlur = true;
  };

  handleBlur = event => {
    const { onBlur } = this.props;
    if (this.canBlur) {
      onBlur(event);
    }
  };

  handleKeyDown = event => {
    const { onBlur } = this.props;
    if (event.key === 'Escape') {
      onBlur(event);
    }
  };

  render() {
    const { children, onFocus } = this.props;
    return children({
      onFocus,
      onBlur: this.handleBlur,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onKeyDown: this.handleKeyDown
    });
  }
}

FocusManager.propTypes = {
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  children: PropTypes.instanceOf(Object).isRequired
};

FocusManager.defaultProps = {
  onBlur: () => null,
  onFocus: () => null
};

export default FocusManager;
