import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import UsersView from '../components/UsersView';

class Users extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    params: PropTypes.shape({
      nextPage: PropTypes.string,
      prevPage: PropTypes.string,
      email: PropTypes.string
    }),
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  getPage = (page) => {
    this.props.fetchUsers({page, email: this.props.params.email});
  };

  viewUser = (userId) => {
    this.props.router.push(`/users/${encodeURI(userId)}`);
  };

  handleSearchChange = (email) => {
    this.props.fetchUsers({email});
  };

  render() {
    return (
      <UsersView
        searchQueryString={this.props.params.email}
        getPage={this.getPage}
        handleSearchChange={this.handleSearchChange}
        viewUser={this.viewUser}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  params: selectors.getParams(state),
  isFirstPage: selectors.getIsFirstPage(state),
  isLastPage: selectors.getIsLastPage(state),
  users: selectors.getUsers(state),
  isFetching: selectors.getIsFetching(state)
});

export default connect(mapStateToProps, actions)(withRouter(Users));
