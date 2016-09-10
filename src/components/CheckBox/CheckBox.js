import React, {PropTypes} from 'react';
import humanize from 'humanize-string';
import cx from 'classnames';

const CheckBox = ({className, onChange, checked, name, value, fitted = false}) => {
  return (
    <div className={cx('ui checkbox', className, {fitted})}>
      <input type="checkbox" checked={checked} onChange={onChange} value={value} />
      <label>{name && humanize(name)}</label>
    </div>
  );
};

CheckBox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.bool,
  fitted: PropTypes.bool
};

CheckBox.defaultProps = {
  value: false
};

export default CheckBox;
