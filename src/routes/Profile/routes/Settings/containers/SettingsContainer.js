import {connect} from 'react-redux';
import SettingsView from '../components/SettingsView';
import {getDocumentName, getIsPhoneVerified, getIsVerificationRequested} from 'modules/profile/selectors';
import {getIsPersonalDataReady} from '../modules/selectors'
import * as actions from '../modules/actions';

const mapStateToProps = (state) => {
  return {
    isVerificationRequested: getIsVerificationRequested(state),
    isAllowedVerification: getDocumentName(state)
    && getIsPhoneVerified(state)
    && getIsPersonalDataReady(state)
  }
};


export default connect(mapStateToProps, actions)(SettingsView);
