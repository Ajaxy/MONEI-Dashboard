import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as selectors from 'modules/profile/selectors';
import * as actions from '../../Profile/routes/PersonalData/modules/actions';
import {saveBankAccountStart, fetchBankAccounts} from 'routes/Profile/routes/BankAccounts/modules/actions';
import {getPrimaryBankAccount, getIsFetching} from 'routes/Profile/routes/BankAccounts/modules/selectors';
import GettingStartedView from '../components/GettingStartedView';

class GettingStarted extends Component {
  static propTypes = {
    fetchBankAccounts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchBankAccounts();
  }

  render() {
    return (
      <GettingStartedView {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  const bankAccount = getPrimaryBankAccount(state);
  return {
    isAllowedVerification: selectors.getIsReadyForProduction(state) && bankAccount.id,
    isFetching: getIsFetching(state),
    bankAccount
  };
};

export default connect(
  mapStateToProps,
  {
    ...actions,
    saveBankAccountStart,
    fetchBankAccounts
  }
)(GettingStarted);

