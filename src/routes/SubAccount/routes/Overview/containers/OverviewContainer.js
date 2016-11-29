import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getActiveSubAccount} from 'routes/SubAccounts/modules/selectors';
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

const mapStateToProps = (state, props) => ({
  bankAccountById: selectors.getBankAccountById(state),
  isFetchingBankAccounts: selectors.getIsFetching(state),
  subAccount: getActiveSubAccount(state),
  subAccountId: props.params.subAccountId
});

export default connect(mapStateToProps, {fetchBankAccounts})(Overview);

