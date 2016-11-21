import {connect} from 'react-redux';
import SettingsView from '../components/SettingsView';
import * as selectors from 'routes/SubAccount/modules/selectors';
import * as actions from 'routes/SubAccount/modules/actions';

const mapStateToProps = (state, props) => ({
  isUpdating: selectors.getIsUpdating(state),
  subAccount: selectors.getSubAccount(state),
  subAccountId: props.params.subAccountId
});

export default connect(mapStateToProps, actions)(SettingsView);
