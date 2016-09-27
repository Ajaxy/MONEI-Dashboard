import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import CustomersView from '../components/CustomersView';

class Customers extends Component {
  static propTypes = {
    fetchCustomers: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchCustomers();
  }

  filterUsers = (filter) => {
    this.props.fetchCustomers(null, filter);
  };

  loadMore = () => {
    const {page} = this.props;
    this.props.fetchCustomers(page.nextPage, page.filter);
  };

  render() {
    return (
      <CustomersView
        loadMore={this.loadMore}
        filterUsers={this.filterUsers}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  customers: selectors.getCustomers(state),
  isFetching: selectors.getIsFetching(state),
  isLastPage: selectors.getIsLastPage(state),
  page: selectors.getPage(state)
});

export default connect(mapStateToProps, actions)(Customers);
