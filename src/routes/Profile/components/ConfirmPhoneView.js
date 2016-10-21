import React, {PropTypes} from 'react';
import {getInputProps} from 'components/Input';
import cx from 'classnames';

const ConfirmPhoneView = ({
  fields: {verificationCode},
  handleSubmit,
  onSubmit,
  isUpdating,
}) => {
  const verificationCodeProps = getInputProps(verificationCode);
  return (
    <form className="ui large form" target="#" onSubmit={handleSubmit(onSubmit)}>
      <div className="fields">
        <div className="twelve wide field">
          <div className="ui labeled input">
            <div className="ui label">Code</div>
            <input {...verificationCodeProps} type="text" placeholder="Enter code from SMS..."/>
          </div>
          {verificationCode.touched && verificationCode.invalid && verificationCode.error && 
            <div className="ui basic red pointing prompt label">{verificationCode.error}</div>}
        </div>
        <div className="four wide field">
          <input 
            type="submit" 
            value="Confirm" 
            disabled={!verificationCode.dirty || isUpdating}
            className={cx("ui submit large button fluid green", {loading: isUpdating})}
          />
        </div>
      </div>
    </form>
  )
};

ConfirmPhoneView.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool.isRequired,
};

export default ConfirmPhoneView;