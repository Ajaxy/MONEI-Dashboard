import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as transactionActions from 'routes/Transactions/modules/actions'
import * as transactionSelectors from 'routes/Transactions/modules/selectors';
import TransactionsView from '../components/TransactionsView';

class Transactions extends Component {
  static propTypes = {
    customerId: PropTypes.string.isRequired,
    fetchTransactions: PropTypes.func.isRequired,
    page: PropTypes.shape({
      nextPage: PropTypes.string,
      prevPage: PropTypes.string
    }),
    viewTransactionStart: PropTypes.func.isRequired,
    viewTransactionCancel: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {fetchTransactions, customerId} = this.props;
    fetchTransactions(customerId, {forceRefresh: true});
  }

  goToNextPage = () => {
    const {page, fetchTransactions, customerId} = this.props;
    fetchTransactions(customerId, {page: page.nextPage});
  };

  goToPrevPage = () => {
    const {page, fetchTransactions, customerId} = this.props;
    fetchTransactions(customerId, {page: page.prevPage});
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
        viewDetails={this.viewDetails}
        closeDetails={this.closeDetails}
        printPage={this.printPage}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state, props) => ({
  customerId: props.params.customerId,
  transactions: selectors.getTransactions(state),
  isFetching: selectors.getIsFetching(state),
  isFirstPage: selectors.getIsFirstPage(state),
  isLastPage: selectors.getIsLastPage(state),
  page: selectors.getPage(state),
  isDetailsModalOpen: transactionSelectors.getIsDetailsModalOpen(state),
  transactionViewed: selectors.getViewedTransaction(state),
});

export default connect(mapStateToProps, {...transactionActions, ...actions})(Transactions);
