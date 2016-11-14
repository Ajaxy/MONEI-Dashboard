import {connect} from 'react-redux';
import {getActiveSubAccount} from 'routes/SubAccounts/modules/selectors';
import * as actions from 'routes/SubAccount/modules/actions';
import OverviewView from '../components/OverviewView';

const mapStateToProps = (state, props) => ({
  subAccount: getActiveSubAccount(state),
  subAccountId: props.params.subAccountId
});

export default connect(mapStateToProps, actions)(OverviewView);

