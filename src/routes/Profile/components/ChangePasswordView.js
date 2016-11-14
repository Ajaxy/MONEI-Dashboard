import React, {PropTypes} from 'react';
import {omitProps} from 'lib/utils';
import cx from 'classnames';

const ChangePasswordView = ({
  fields: {newPassword, confirmPassword},
  handleSubmit,
  onSubmit,
  isUpdating,
  pristine
}) => {
  const newPasswordProps = omitProps(newPassword,
    'initialValue',
    'autofill',
    'onUpdate',
    'valid',
    'dirty',
    'pristine',
    'active',
    'visited',
    'autofilled',
    'invalid',
    'touched',
    'error',
  );
  const confirmPasswordProps = omitProps(confirmPassword,
    'initialValue',
    'autofill',
    'onUpdate',
    'valid',
    'dirty',
    'pristine',
    'active',
    'visited',
    'autofilled',
    'invalid',
    'touched',
    'error',
  );
  return (<div className="ui basic segment">
    <form className="ui large form" target="#" onSubmit={handleSubmit(onSubmit)}>
      <div className="fields">
        <div className="seven wide field">
          <div className="ui labeled input">
            <div className="ui label">New password</div>
            <input {...newPasswordProps} type="password" placeholder="Enter new password..." />
          </div>
          {newPassword.touched && newPassword.invalid && newPassword.error &&
          <div className="ui basic red pointing prompt label">{newPassword.error}</div>}
        </div>
        <div className="seven wide field">
          <div className="ui labeled input">
            <div className="ui label">Current password</div>
            <input {...confirmPasswordProps} type="password" placeholder="Confirm new password..." />
          </div>
          {confirmPassword.touched && confirmPassword.invalid && confirmPassword.error &&
            <div className="ui basic red pointing prompt label">{confirmPassword.error}</div>}
        </div>
        <div className="two wide field">
          <input
            type="submit"
            value="Reset"
            disabled={pristine || !newPassword.dirty || !confirmPassword.dirty || isUpdating}
            className={cx('ui submit large button green', {loading: isUpdating})}
          />
        </div>
      </div>
    </form>
  </div>
);
};

ChangePasswordView.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired
};

export default ChangePasswordView;
