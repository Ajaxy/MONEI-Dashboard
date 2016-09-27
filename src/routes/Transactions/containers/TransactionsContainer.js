import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import TransactionsView from '../components/TransactionsView';
import moment from 'moment';

class Transactions extends Component {
  static propTypes = {
    fetchTransactions: PropTypes.func.isRequired
  };

  componentWillMount() {
    var date = new Date();
    var from = moment(date).startOf('day').valueOf();
    var to = moment(date).endOf('day').valueOf();
    this.props.fetchTransactions(from, to);
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

  render() {
    return (
      <TransactionsView
        loadMore={this.loadMore}
        filterDate={this.filterDate}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  transactions: selectors.getTransactions(state),
  totalAmount: selectors.getTotalAmount(state),
  isFetching: selectors.getIsFetching(state),
  isLastPage: selectors.getIsLastPage(state),
  page: selectors.getPage(state)
});

export default connect(mapStateToProps, actions)(Transactions);
