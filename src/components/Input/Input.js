import React, {PropTypes} from 'react';
import cx from 'classnames';
import humanize from 'humanize-string';
import {omitProps} from 'lib/utils';
import InputElement from 'react-input-mask';

const Input = ({
  invalid,
  error,
  touched,
  fieldClass,
  component,
  label,
  leftLabel,
  leftLabelClass,
  hint,
  ...rest
}) => {
  const Component = rest.mask ? InputElement : component || 'input';
  const labelText = label || humanize(rest.name);
  const errorText = Array.isArray(error) ? error[0] : error;
  const componentProps = Component === 'input' || InputElement
    ? omitProps(rest,
    'initialValue',
    'autofill',
    'onUpdate',
    'valid',
    'dirty',
    'pristine',
    'active',
    'visited',
    'autofilled'
  ) : rest;
  componentProps.value = rest.type === 'number' && isNaN(rest.value) ? 0 : rest.value;
  return (
    <div className={cx('field', fieldClass, {error: touched && invalid})}>
      {label !== false && <label htmlFor={rest.name}>{labelText}</label>}
      {
        leftLabel
          ? <div className="ui labeled input">
            <div className={cx('ui label', leftLabelClass)}>{leftLabel}</div>
            <Component {...componentProps} id={rest.name} />
          </div>
          : <Component {...componentProps} id={rest.name} />
      }
      {hint && !(touched && invalid) && <div className="hint">{hint}</div>}
      {touched && invalid && <div className="ui basic red pointing prompt label">{errorText}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
  ]),
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func,
    PropTypes.bool
  ]),
  fieldClass: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  touched: PropTypes.bool,
  invalid: PropTypes.bool,
  mask: PropTypes.string,
  hint: PropTypes.string,
  leftLabel: PropTypes.string,
  leftLabelClass: PropTypes.string
};

export default Input;
