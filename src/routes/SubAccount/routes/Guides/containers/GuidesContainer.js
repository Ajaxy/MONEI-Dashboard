import {connect} from 'react-redux';
import * as actions from 'routes/SubAccount/modules/actions';
import * as selectors from 'routes/SubAccount/modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import GuidesView from '../components/GuidesView';

const mapStateToProps = (state, props) => ({
  subAccount: selectors.getSubAccount(state),
  selectedPlatform: selectors.getSelectedPlatform(state),
  isInSandboxMode: profileSelectors.getIsInSandboxMode(state),
  isMerchant: profileSelectors.getIsMerchant(state)
});

export default connect(mapStateToProps, actions)(GuidesView);
