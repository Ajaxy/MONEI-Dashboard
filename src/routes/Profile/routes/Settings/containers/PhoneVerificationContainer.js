import {connect} from 'react-redux';
import PhoneVerification from '../components/PhoneVerification';
import {getIsPhoneVerified, getPhoneNumber} from 'modules/profile/selectors';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';

const mapStateToProps = (state) => {
  const isPhoneVerified = getIsPhoneVerified(state);
  return {
    isPhoneVerified,
    phoneNumber: getPhoneNumber(state),
    isVerificationStarted: selectors.getIsPhoneVerificationStarted(state),
    isEditingPhone: selectors.getIsEditingPhone(state) || !isPhoneVerified
  };
};

export default connect(mapStateToProps, actions)(PhoneVerification);
