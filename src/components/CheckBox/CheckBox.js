import React, {PropTypes} from 'react';
import humanize from 'humanize-string';
import cx from 'classnames';

const CheckBox = ({
  className,
  onChange,
  checked,
  name = '',
  value,
  label,
  fitted,
  toggle,
  slider,
  inverted
}) => {
  const labelText = label || humanize(name);
  const _value = value === '' ? false : value;
  return (
    <div className={cx('ui checkbox', className, {fitted, toggle, slider, inverted})}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        value={_value}
        id={name} />
      <label htmlFor={name}>{labelText}</label>
    </div>
  );
};

CheckBox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.bool,
  fitted: PropTypes.bool,
  toggle: PropTypes.bool,
  slider: PropTypes.bool,
  inverted: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.bool
  ])
};

CheckBox.defaultProps = {
  value: false
};

export default CheckBox;
