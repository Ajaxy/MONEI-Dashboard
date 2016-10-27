import React, {Component, PropTypes} from 'react';
import classNames from './DotHint.scss';
import cx from 'classnames';

class DotHint extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    flowing: PropTypes.bool,
    className: PropTypes.string,
    position: PropTypes.string
  };

  componentDidMount() {
    const {position = 'right center'} = this.props;
    this.element.popup({
      popup: this.popup,
      on: 'click',
      position
    });
  }

  componentWillUnmount() {
    this.element.popup('destroy');
  }

  render() {
    const {children, flowing, className} = this.props;
    return (
      <div
        className={cx(classNames.hint, className)}
        ref={n => this.element = $(n)}>
        <div className={classNames.pulse} />
        <div className={classNames.dot} />
        <div
          className={cx('ui popup transition hidden', {flowing})}
          ref={n => this.popup = $(n)}>
          {children}
        </div>
      </div>
    );
  }
}

export default DotHint;
