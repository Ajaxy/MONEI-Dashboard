import React, {PropTypes} from 'react';
import cx from 'classnames';

const Button = ({
  disabled,
  active,
  loading,
  primary,
  positive,
  negative,
  basic,
  icon,
  className,
  children,
  onClick,
  type,
  style,
  withRef
}) => (
  <button
    style={style}
    className={cx('ui button', className,
      {loading, active, green: primary, positive, negative, basic, icon})}
    type={type}
    disabled={disabled || loading}
    onClick={onClick}
    ref={withRef}>
    {children}
  </button>
);

Button.propTypes = {
  style: PropTypes.object,
  loading: PropTypes.bool,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  positive: PropTypes.bool,
  negative: PropTypes.bool,
  basic: PropTypes.bool,
  icon: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
  withRef: PropTypes.func
};

export default Button;
