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
    // this.props.fetchCustomers();
  }

  getPage = (page) => {
    this.props.fetchCustomers(page, true);
  };

  render() {
    return (
      <CustomersView
        getPage={this.getPage}
        {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  customers: selectors.getCustomers(state),
  isFetching: selectors.getIsFetching(state),
  isDeleting: selectors.getIsDeleting(state),
  isUpToDate: selectors.getIsUpToDate(state),
  pages: selectors.getPages(state)
});

export default connect(mapStateToProps, actions)(Customers);
