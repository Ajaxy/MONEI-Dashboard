import React, {PropTypes} from 'react';
import PhoneEdit from '../containers/PhoneEditContainer';
import PhoneConfirm from '../containers/PhoneConfirmContainer';
import PhoneView from './PhoneView';
import UpdateMetaData from '../containers/UpdateMetaDataContainer';
import DocumentUpload from '../containers/DocumentContainer';

const SettingsView = ({
  isPhoneVerified,
  phoneNumber,
  isVerificationStarted,
  isEditingPhone,
  phoneEditStart
}) => (
  <section className="ui vertical segment">
    <h3>Phone settings</h3>
    <div className="ui stackable grid">
      <div className="nine wide column">
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
    </div>
    <h3>Personal data</h3>
    <div className="ui stackable grid">
      <div className="nine wide column">
        <UpdateMetaData />
      </div>
    </div>
    <h3>Upload your identity document</h3>
    <div className="ui stackable grid">
      <div className="nine wide column">
        <DocumentUpload />
      </div>
    </div>
  </section>
);

SettingsView.propTypes = {
  isPhoneVerified: PropTypes.bool,
  isSesUser: PropTypes.bool,
  phoneNumber: PropTypes.string,
  isVerificationStarted: PropTypes.bool,
  isEditingPhone: PropTypes.bool,
  phoneEditStart: PropTypes.func.isRequired
};

export default SettingsView;
