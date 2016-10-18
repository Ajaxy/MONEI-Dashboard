import React, {PropTypes} from 'react';
import {omitProps} from 'lib/utils';
import cx from 'classnames';

const ChangePhoneView = ({
  fields: {phoneNumber},
  handleSubmit,
  onSubmit,
  isUpdating
}) => {
  const phoneNumberProps = omitProps(phoneNumber,
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
  return (
    <div className="ui basic segment">
      <form className="ui large form" target="#" onSubmit={handleSubmit(onSubmit)}>
        <div className="fields">
          <div className="fourteen wide field">
            <div className="ui labeled input">
              <div className="ui label">Phone number</div>
              <input {...phoneNumberProps} type="text" placeholder="+1234567890"/>
            </div>
            {phoneNumber.touched && phoneNumber.invalid && phoneNumber.error && 
              <div className="ui basic red pointing prompt label">{phoneNumber.error}</div>}
          </div>
          <div className="two wide field">
            <input 
              type="submit" 
              value="Verify" 
              disabled={!phoneNumber.dirty || isUpdating}
              className={cx("ui submit large button fluid green", {loading: isUpdating})}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

ChangePhoneView.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
}

export default ChangePhoneView;