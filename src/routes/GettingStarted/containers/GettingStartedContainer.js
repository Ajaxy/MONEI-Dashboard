import {connect} from 'react-redux';
import GettingStarted from '../components/GettingStartedView';
import {getIsVerificationRequested, getDocumentName, getIsPhoneVerified} from 'modules/Profile/selectors';
import {getIsPersonalDataReady} from 'routes/Profile/routes/Settings/modules/selectors'
import * as actions from 'routes/Profile/routes/Settings/modules/actions';

const mapStateToProps = (state) => {
  return {
    isVerificationRequested: getIsVerificationRequested(state),
    isAllowedVerification: getDocumentName(state)
    && getIsPhoneVerified(state)
    && getIsPersonalDataReady(state)
  }
};

export default connect(mapStateToProps, actions)(GettingStarted);

