import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import TransactionsView from '../components/TransactionsView';

class Transactions extends Component {
  static propTypes = {
    customerId: PropTypes.string.isRequired,
    fetchTransactions: PropTypes.func.isRequired,
    page: PropTypes.shape({
      nextPage: PropTypes.string,
      prevPage: PropTypes.string
    })
  };

  componentDidMount() {
    const {fetchTransactions, customerId} = this.props;
    fetchTransactions(customerId);
  }

  goToNextPage = () => {
    const {page, fetchTransactions, customerId} = this.props;
    fetchTransactions(customerId, page.nextPage);
  };

  goToPrevPage = () => {
    const {page, fetchTransactions, customerId} = this.props;
    fetchTransactions(customerId, page.prevPage);
  };

  render() {
    return (
      <TransactionsView
        goToNextPage={this.goToNextPage}
        goToPrevPage={this.goToPrevPage}
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
  page: selectors.getPage(state)
});

export default connect(mapStateToProps, actions)(Transactions);
