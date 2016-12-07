import React, {PropTypes} from 'react';
import PersonalDataForm from '../containers/PersonalDataFormContainer';
import PhoneVerification from '../containers/PhoneVerificationContainer';
import ConfirmVerification from '../containers/ConfirmVerificationContainer';
import Button from 'components/Button';

const PersonalData = ({
  requestVerificationStart,
  isVerificationRequested,
  isAllowedVerification
}) => (
  <section className="ui vertical segment">
    <div className="ui stackable grid">
      <div className="nine wide column">
        <PhoneVerification />
        <br />
        <PersonalDataForm />
      </div>
    </div>
    <br />
    {isAllowedVerification && <Button
      className="orange"
      onClick={requestVerificationStart}>
      <i className="icon checkmark box" />
      Request verification
    </Button>}
    <ConfirmVerification />
  </section>
);

PersonalData.propTypes = {
  requestVerificationStart: PropTypes.func.isRequired,
  isVerificationRequested: PropTypes.bool,
  isAllowedVerification: PropTypes.bool
};

export default PersonalData;
