import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import TransactionsView from '../components/TransactionsView';
import moment from 'moment';

class Transactions extends Component {
  static propTypes = {
    fetchTransactions: PropTypes.func.isRequired
  };

  componentWillMount() {
    const date = this.props.selectedDate;
    var from = moment(date, selectors.DEFAULT_DATE_FORMAT).startOf('day').valueOf();
    var to = moment(date, selectors.DEFAULT_DATE_FORMAT).endOf('day').valueOf();
    this.props.fetchTransactions(from, to, null, true);
  }

  componentWillUpdate(nextProps) {
    if(nextProps.isInSandboxMode != this.props.isInSandboxMode)
      this.componentWillMount();
  }

  loadMore = () => {
    const {page} = this.props;
    this.props.fetchTransactions(page.from, page.to, page.nextPage);
  };

  filterDate = (dateString) => {
    var from = moment(dateString).startOf('day').valueOf();
    var to = moment(dateString).endOf('day').valueOf();
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
        loadMore={this.loadMore}
        filterDate={this.filterDate}
        viewDetails={this.viewDetails}
        closeDetails={this.closeDetails}
        printPage={this.printPage}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  selectedDate: selectors.getSelectedDate(state),
  transactions: selectors.getTransactions(state),
  totalAmount: selectors.getTotalAmount(state),
  isFetching: selectors.getIsFetching(state),
  isLastPage: selectors.getIsLastPage(state),
  isDetailsModalOpen: selectors.getIsDetailsModalOpen(state),
  isInSandboxMode: profileSelectors.getIsInSandboxMode(state),
  transactionViewed: selectors.getViewedTransaction(state),
  page: selectors.getPage(state),
});

export default connect(mapStateToProps, actions)(Transactions);
