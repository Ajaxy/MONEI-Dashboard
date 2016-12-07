import React, {PropTypes} from 'react';
import PhoneEdit from '../containers/PhoneEditContainer';
import PhoneConfirm from '../containers/PhoneConfirmContainer';
import PhoneView from './PhoneView';

const PhoneVerification = ({
  isPhoneVerified,
  phoneNumber,
  isVerificationStarted,
  isEditingPhone,
  phoneEditStart,
  className,
  title = 'Phone settings'
}) => (
  <div className={className}>
    <h3>{title}</h3>
    {!isEditingPhone && <div>
      <PhoneView
        phoneNumber={phoneNumber}
        onEdit={phoneEditStart}
        isPhoneVerified={isPhoneVerified} />
    </div>}
    {isEditingPhone && <div>
      {!isVerificationStarted && <PhoneEdit />}
      {isVerificationStarted && <PhoneConfirm />}
    </div>}
  </div>
);

PhoneVerification.propTypes = {
  isPhoneVerified: PropTypes.bool,
  phoneNumber: PropTypes.string,
  isVerificationStarted: PropTypes.bool,
  isEditingPhone: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  phoneEditStart: PropTypes.func.isRequired
};

export default PhoneVerification;
