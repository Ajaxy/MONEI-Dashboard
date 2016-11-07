import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import BankAccountsView from '../components/BankAccountsView';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';

class BankAccounts extends Component {
  static propTypes = {
    fetchBankAccounts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchBankAccounts();
  }

  render() {
    return (
      <BankAccountsView {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  bankAccounts: selectors.getBankAccounts(state),
  isFetching: selectors.getIsFetching(state),
  isUpToDate: selectors.getIsUpToDate(state)
});

export default connect(mapStateToProps, actions)(BankAccounts);

