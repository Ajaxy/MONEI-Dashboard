import React, {PropTypes} from 'react';
import cx from 'classnames';

const Loader = ({
  inline = true,
  dimmer = false,
  active,
  className,
  indeterminate,
  dimmerClassName,
  text = 'Loading'
}) => {
  if (inline) {
    return (
      <div className={cx('ui centered loader inline text', className, {active, indeterminate})}>
        Loading
      </div>
    );
  }
  return (
    <div className={cx('ui inverted dimmer', dimmerClassName, {active})}>
      <div className={cx(className, 'ui loader text', {indeterminate})}>{text}</div>
    </div>
  );
};

Loader.propTypes = {
  active: PropTypes.bool,
  inline: PropTypes.bool,
  dimmer: PropTypes.bool,
  indeterminate: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
  dimmerClassName: PropTypes.string
};

export default Loader;
