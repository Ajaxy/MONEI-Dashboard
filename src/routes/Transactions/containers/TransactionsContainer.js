import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import TransactionsView from '../components/TransactionsView';
import {fetchSubAccounts} from 'routes/SubAccounts/modules/actions';
import {getSubAccountById} from 'routes/SubAccounts/modules/selectors';
import moment from 'moment';

class Transactions extends Component {
  static propTypes = {
    fetchTransactions: PropTypes.func.isRequired,
    fetchSubAccounts: PropTypes.func.isRequired,
    isInSandboxMode: PropTypes.bool.isRequired,
    page: PropTypes.shape({
      nextPage: PropTypes.string,
      prevPage: PropTypes.string
    }),
    viewTransactionStart: PropTypes.func.isRequired,
    viewTransactionCancel: PropTypes.func.isRequired
  };

  componentWillMount() {
    const from = moment().startOf('day').valueOf();
    const to = moment().endOf('day').valueOf();
    this.props.fetchTransactions(from, to, null, true);
    this.props.fetchSubAccounts();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isInSandboxMode !== this.props.isInSandboxMode) {
      this.componentWillMount();
    }
  }

  goToNextPage = () => {
    const {page} = this.props;
    this.props.fetchTransactions(page.from, page.to, page.nextPage);
  };

  goToPrevPage = () => {
    const {page} = this.props;
    this.props.fetchTransactions(page.from, page.to, page.prevPage);
  };

  filterByDate = (fromDate, toDate) => {
    const from = moment(fromDate).startOf('day').valueOf();
    const to = moment(toDate).endOf('day').valueOf();
    this.props.fetchTransactions(from, to);
  };

  viewDetails = (transactionId) => {
    this.props.viewTransactionStart(transactionId);
  };

  closeDetails = () => {
    this.props.viewTransactionCancel();
  };

  printPage = () => {
    window.print();
  };

  render() {
    return (
      <TransactionsView
        goToNextPage={this.goToNextPage}
        goToPrevPage={this.goToPrevPage}
        filterByDate={this.filterByDate}
        viewDetails={this.viewDetails}
        closeDetails={this.closeDetails}
        printPage={this.printPage}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  fromDate: selectors.getFromDate(state),
  toDate: selectors.getToDate(state),
  transactions: selectors.getTransactions(state),
  totalAmount: selectors.getTotalAmount(state),
  isFetching: selectors.getIsFetching(state),
  isFirstPage: selectors.getIsFirstPage(state),
  isLastPage: selectors.getIsLastPage(state),
  isDetailsModalOpen: selectors.getIsDetailsModalOpen(state),
  isInSandboxMode: profileSelectors.getIsInSandboxMode(state),
  transactionViewed: selectors.getViewedTransaction(state),
  subAccountById: getSubAccountById(state),
  page: selectors.getPage(state)
});

export default connect(mapStateToProps, {...actions, fetchSubAccounts})(Transactions);
