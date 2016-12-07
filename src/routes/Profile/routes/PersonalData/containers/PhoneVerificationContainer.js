import {connect} from 'react-redux';
import PhoneVerification from '../components/PhoneVerification';
import {getProfile} from 'modules/profile/selectors';
import * as selectors from 'routes/Profile/modules/selectors';
import * as actions from 'routes/Profile/modules/actions';

const mapStateToProps = (state) => {
  const profile = getProfile(state);
  const isPhoneVerified = !!profile.phoneNumber;
  return {
    isPhoneVerified,
    phoneNumber: profile.phoneNumber,
    isVerificationStarted: selectors.getIsPhoneVerificationStarted(state),
    isEditingPhone: selectors.getIsEditingPhone(state) || !isPhoneVerified
  };
};

export default connect(mapStateToProps, actions)(PhoneVerification);
