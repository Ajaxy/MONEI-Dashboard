import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import UsersView from '../components/UsersView';

class Users extends Component {
  static propTypes = {
    fetchUsers: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    const {page} = this.props;
    this.props.fetchUsers(1, page.filter);
  }

  filterUsers = (filter) => {
    this.props.fetchUsers(1, filter);
  };

  loadMore = () => {
    const {page} = this.props;
    this.props.fetchUsers(page.currentPage + 1, page.filter);
  };

  viewUser = (userId) => {
    this.context.router.push(`/users/${encodeURI(userId)}`);
  };

  render() {
    return (
      <UsersView
        filterUsers={this.filterUsers}
        loadMore={this.loadMore}
        viewUser={this.viewUser}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  page: selectors.getPage(state),
  users: selectors.getUsers(state),
  isFetching: selectors.getIsFetching(state),
  isLastPage: selectors.getIsLastPage(state),
});

export default connect(mapStateToProps, actions)(Users);
