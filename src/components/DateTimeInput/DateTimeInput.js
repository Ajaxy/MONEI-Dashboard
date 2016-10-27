import React, {PropTypes} from 'react';
import cx from 'classnames';
import humanize from 'humanize-string';
import {omitProps} from 'lib/utils';
import DateTime from 'react-datetime';
import './DateTimeInput.scss';

const Input = ({
  invalid,
  error,
  touched,
  fieldClass,
  label,
  ...rest
}) => {
  const labelText = label || humanize(rest.name);
  const errorText = Array.isArray(error) ? error[0] : error;
  const inputProps = omitProps(rest,
    'initialValue',
    'autofill',
    'onUpdate',
    'valid',
    'dirty',
    'pristine',
    'active',
    'visited',
    'autofilled'
  );
  return (
    <div className={cx('field', fieldClass, {error: touched && invalid})}>
      {label !== false && <label>{labelText}</label>}
      <div className="ui fluid icon input">
        <DateTime
          timeFormat="HH:mm"
          isValidDate={date => date.isAfter(DateTime.moment().subtract(1, 'day'))}
          {...inputProps} />
        <i className="calendar icon" />
      </div>
      {touched && invalid && <div className="ui basic red pointing prompt label">{errorText}</div>}
    </div>

  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  fieldClass: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
  mask: PropTypes.string
};

export default Input;
