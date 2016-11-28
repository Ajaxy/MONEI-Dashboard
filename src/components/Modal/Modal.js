import React, {Component, PropTypes} from 'react';
import Portal from 'react-portal';
import cx from 'classnames';

class Modal extends Component {
  static defaultProps = {
    style: 'standard',
    size: 'tiny'
  };

  static propTypes = {
    isOpen: PropTypes.bool,
    children: PropTypes.any,
    style: PropTypes.oneOf(['standard', 'basic']),
    size: PropTypes.oneOf([undefined, 'tiny', 'small', 'large', 'fullscreen'])
  };

  onOpen = () => {
    $(this.dimmer).transition('fade', '500ms');
    $(this.modal).transition('scale', '500ms');
  };

  beforeClose = (node, onComplete) => {
    $(this.dimmer).transition('fade', '500ms', onComplete);
    $(this.modal).transition('scale', '500ms');
  };

  render() {
    const {isOpen, children, size, style} = this.props;
    return (
      <Portal
        isOpened={isOpen}
        beforeClose={this.beforeClose}
        onOpen={this.onOpen}>
        <div
          className="ui dimmer modals page transition active hidden"
          ref={n => {
            this.dimmer = n;
          }}>
          <div
            className={cx('ui modal transition active hidden', size, style)}
            ref={n => {
              this.modal = n;
            }}>
            {children}
          </div>
        </div>
      </Portal>
    );
  }
}

export default Modal;
