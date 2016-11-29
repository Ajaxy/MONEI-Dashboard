import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getActiveSubAccount} from 'routes/SubAccounts/modules/selectors';
import * as actions from 'routes/SubAccount/modules/actions';
import OverviewView from '../components/OverviewView';
import * as selectors from 'routes/Profile/routes/BankAccounts/modules/selectors';
import {fetchBankAccounts} from 'routes/Profile/routes/BankAccounts/modules/actions';

class Overview extends Component {
  static propTypes = {
    fetchBankAccounts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchBankAccounts();
  }

  render() {
    return (
      <OverviewView {...this.props} />
    );
  }
}

const mapStateToProps = (state, props) => {
  const subAccount = getActiveSubAccount(state);
  const bankAccountById = selectors.getBankAccountById(state);
  return {
    isFetchingBankAccounts: selectors.getIsFetching(state),
    subAccount,
    bankAccount: bankAccountById[subAccount.bankAccountId] || {},
    subAccountId: props.params.subAccountId
  };
};

export default connect(mapStateToProps, {...actions, fetchBankAccounts})(Overview);
