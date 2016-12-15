import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import CustomersView from '../components/CustomersView';

class Customers extends Component {
  static propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
    isInSandboxMode: PropTypes.bool.isRequired,
    pages: PropTypes.shape({
      nextPage: PropTypes.string,
      prevPage: PropTypes.string
    })
  };

  componentDidMount() {
    this.props.fetchCustomers();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isInSandboxMode !== this.props.isInSandboxMode) {
      this.props.fetchCustomers();
    }
  }

  getPage = (page) => {
    this.props.fetchUsers({page, email: this.props.params.email});
  };

  handleSearchChange = (email) => {
    this.props.fetchUsers({email});
  };

  render() {
    return (
      <CustomersView
        searchQueryString={this.props.params.email}
        getPage={this.getPage}
        handleSearchChange={this.handleSearchChange}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  customers: selectors.getCustomers(state),
  isFetching: selectors.getIsFetching(state),
  isFirstPage: selectors.getIsFirstPage(state),
  isLastPage: selectors.getIsLastPage(state),
  isInSandboxMode: profileSelectors.getIsInSandboxMode(state),
  params: selectors.getParams(state)
});

export default connect(mapStateToProps, actions)(Customers);
