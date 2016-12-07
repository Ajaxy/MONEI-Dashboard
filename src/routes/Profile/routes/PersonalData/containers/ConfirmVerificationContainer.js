import {connect} from 'react-redux';
import * as actions from 'routes/Profile/modules/actions';
import * as selectors from 'routes/Profile/modules/selectors';
import ConfirmVerification from '../components/ConfirmVerification';

const mapStateToProps = (state) => ({
  isVerifying: selectors.getIsRequestingVerification(state),
  isOpen: selectors.getIsVerificationModalOpen(state)
});

export default connect(mapStateToProps, actions)(ConfirmVerification);
