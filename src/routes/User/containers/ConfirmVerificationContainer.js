import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import ConfirmVerification from '../components/ConfirmVerification';

const mapStateToProps = (state) => ({
  isVerifying: selectors.getIsVerifying(state),
  isOpen: selectors.getIsVerificationModalOpen(state),
  user: selectors.getUser(state),
  isAllowedToVerify: selectors.getIsAllowedToVerify(state)
});

export default connect(mapStateToProps, actions)(ConfirmVerification);
