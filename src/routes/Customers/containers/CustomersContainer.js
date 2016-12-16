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
    queryParams: PropTypes.shape({
      nextPage: PropTypes.string,
      prevPage: PropTypes.string,
      email: PropTypes.string
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
    this.props.fetchCustomers({page, email: this.props.queryParams.email});
  };

  handleSearchChange = (email) => {
    this.props.fetchCustomers({email});
  };

  render() {
    return (
      <CustomersView
        searchQueryString={this.props.queryParams.email}
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
  queryParams: selectors.getQueryParams(state)
});

export default connect(mapStateToProps, actions)(Customers);
