import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import SubAccountsView from '../components/SubAccountsView';

class SubAccounts extends Component {
  static propTypes = {
    fetchSubAccounts: PropTypes.func.isRequired,
    fetchBankAccounts: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {user, fetchSubAccounts, fetchBankAccounts} = this.props;
    fetchSubAccounts(user.user_id);
    fetchBankAccounts(user.user_id);
  }

  render() {
    return <SubAccountsView{...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  user: selectors.getUser(state),
  subAccounts: selectors.getSubAccounts(state),
  bankAccountById: selectors.getBankAccountById(state),
  isSyncing: selectors.getIsSyncing(state),
  isFetching: selectors.getIsFetchingSubAccounts(state)
});

export default connect(mapStateToProps, actions)(SubAccounts);
