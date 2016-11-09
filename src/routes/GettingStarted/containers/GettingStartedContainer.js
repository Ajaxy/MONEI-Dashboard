import {connect} from 'react-redux';
import * as selectors from 'modules/profile/selectors';
import * as actions from 'routes/Profile/routes/Settings/modules/actions';
import GettingStarted from '../components/GettingStartedView';

const mapStateToProps = (state) => {
  return {
    isAllowedVerification: selectors.getIsReadyForProduction(state)
  }
};

export default connect(mapStateToProps, actions)(GettingStarted);

