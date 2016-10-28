import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Button from 'components/Button';

const SettingsForm = ({
  fields: {verificationCode},
  handleSubmit,
  invalid,
  phoneVerificationCheck,
  phoneVerificationCancel,
  isCheckingCode,
  currentPhoneNumber
}) => {
  const submit = ({verificationCode}) => {
    phoneVerificationCheck({
      verificationCode,
      phoneNumber: currentPhoneNumber
    });
  };
  const cancel = (e) => {
    e.preventDefault();
    phoneVerificationCancel();
  };
  return (
    <div>
      <div className="ui info message">
        <p>We've sent you an SMS on number <b>{currentPhoneNumber}</b> with a code. Please enter it below.</p>
      </div>
      <form className="ui form" onSubmit={handleSubmit(submit)}>
        <div className="three fields">
          <Input
            {...verificationCode}
            mask="9999"
            maskChar=""
            type="text" />
        </div>
        <Button onClick={cancel}>
          Cancel
        </Button>
        {' '}
        <Button
          positive
          type="submit"
          loading={isCheckingCode}
          disabled={invalid || isCheckingCode}>
          Confirm
        </Button>
      </form>
    </div>
  );
};

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  phoneVerificationCheck: PropTypes.func.isRequired,
  phoneVerificationCancel: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isCheckingCode: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  currentPhoneNumber: PropTypes.string
};

export default SettingsForm;
