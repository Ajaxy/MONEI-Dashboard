import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import TransactionsView from '../components/TransactionsView';

class Transactions extends Component {
  static propTypes = {
    fetchTransactions: PropTypes.func.isRequired
  };

  componentWillMount() {
    // this.props.fetchTransactions();
  }

  getPage = (page) => {
    this.props.fetchTransactions(page, true);
  };

  render() {
    return (
      <TransactionsView
        getPage={this.getPage}
        {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  customers: selectors.getTransactions(state),
  isFetching: selectors.getIsFetching(state),
  isDeleting: selectors.getIsDeleting(state),
  isUpToDate: selectors.getIsUpToDate(state),
  pages: selectors.getPages(state)
});

export default connect(mapStateToProps, actions)(Transactions);
