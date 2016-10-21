import React, {PropTypes} from 'react';
import Input, {getInputProps} from 'components/Input';
import cx from 'classnames';
import classNames from './ChangePhoneView.scss';

const ChangePhoneView = ({
  fields: {phoneNumber},
  handleSubmit,
  onSubmit,
  isUpdating,
  isLabeled = true,
}) => {
  const phoneNumberProps = getInputProps(phoneNumber);
  return (
    <div className={cx({"ui basic segment": isLabeled})}>
      <form className="ui large form" target="#" onSubmit={handleSubmit(onSubmit)}>
        <div className="fields">
          <div className="fourteen wide field">
            { isLabeled ?
              <div className="ui labeled input">
                <div className="ui label">Phone number</div>
                <input {...phoneNumberProps} type="text" placeholder="+1234567890"/>
              </div>
              :
              <Input {...phoneNumber} type="text" placeholder="+1234567890" label="Phone number with country code"/>
            }
            { isLabeled && phoneNumber.touched && phoneNumber.invalid && phoneNumber.error && 
              <div className="ui basic red pointing prompt label">{phoneNumber.error}</div>}
          </div>
          <div className="two wide field">
            <input 
              type="submit" 
              value="Verify" 
              disabled={!phoneNumber.dirty || isUpdating}
              className={cx("ui submit large button green", {loading: isUpdating}, classNames.verify)}
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