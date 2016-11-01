import {connect} from 'react-redux';
import SettingsView from '../components/SettingsView';
import {getProfile, getIsPhoneVerified, getPhoneNumber} from 'modules/profile/selectors';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';

const mapStateToProps = (state) => {
  const isPhoneVerified = getIsPhoneVerified(state);
  return {
    profile: getProfile(state),
    isPhoneVerified,
    phoneNumber: getPhoneNumber(state),
    isVerificationStarted: selectors.getIsPhoneVerificationStarted(state),
    isEditingPhone: selectors.getIsEditingPhone(state) || !isPhoneVerified
  };
};

export default connect(mapStateToProps, actions)(SettingsView);

