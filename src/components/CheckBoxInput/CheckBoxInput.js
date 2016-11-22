import React, {PropTypes} from 'react';
import cx from 'classnames';
import {omitProps} from 'lib/utils';
import CheckBox from '../CheckBox';

const Input = ({
  invalid,
  error,
  initial,
  fieldClass,
  hint,
  ...rest
}) => {
  const errorText = Array.isArray(error) ? error[0] : error;
  const componentProps = omitProps(rest,
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
    <div className={cx('field', fieldClass, {error: !initial && invalid})}>
      <div>
        <CheckBox {...componentProps} id={rest.name} />
      </div>
      {hint && !(!initial && invalid) && <div className="hint">{hint}</div>}
      {invalid && <div className="ui basic red pointing prompt label">{errorText}</div>}
    </div>

  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  fieldClass: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string
  ]),
  initial: PropTypes.bool,
  invalid: PropTypes.bool,
  hint: PropTypes.string
};

export default Input;
