import React, {PropTypes} from 'react';
import UpdateMetaData from '../containers/UpdateMetaDataContainer';
import PhoneVerification from '../containers/PhoneVerificationContainer';
import ConfirmVerification from '../containers/ConfirmVerificationContainer';
import Button from 'components/Button';

const SettingsView = ({
  requestVerificationStart,
  isVerificationRequested,
  isAllowedVerification
}) => (
  <section className="ui vertical segment">
    <div className="ui stackable grid">
      <div className="nine wide column">
        <PhoneVerification />
      </div>
    </div>
    <div className="ui stackable grid">
      <div className="nine wide column">
        <UpdateMetaData />
      </div>
    </div>
    <br />
    {!isVerificationRequested && <Button
      className="basic orange"
      disabled={!isAllowedVerification}
      onClick={requestVerificationStart}>
      Request verification
    </Button>}
    <ConfirmVerification />
  </section>
);

SettingsView.propTypes = {
  isPhoneVerified: PropTypes.bool,
  phoneNumber: PropTypes.string,
  isVerificationStarted: PropTypes.bool,
  isEditingPhone: PropTypes.bool,
  phoneEditStart: PropTypes.func.isRequired
};

export default SettingsView;
