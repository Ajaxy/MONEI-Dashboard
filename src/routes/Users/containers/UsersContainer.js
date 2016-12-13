import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import UsersView from '../components/UsersView';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  static propTypes = {
    fetchUsers: PropTypes.func.isRequired,
    pages: PropTypes.shape({
      nextPage: PropTypes.string,
      prevPage: PropTypes.string
    }),
    router: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  componentDidMount() {
    this.props.fetchUsers();
  }

  getPage = (page) => {
    this.props.fetchUsers({page, email: this.state.email});
  };

  viewUser = (userId) => {
    this.props.router.push(`/users/${encodeURI(userId)}`);
  };

  handleSearchChange = (email) => {
    this.setState({email});
    this.props.fetchUsers({email});
  };

  render() {
    return (
      <UsersView
        filterUsers={this.filterUsers}
        getPage={this.getPage}
        searchQueryString={this.state.email}
        handleSearchChange={this.handleSearchChange}
        viewUser={this.viewUser}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  pages: selectors.getPages(state),
  isFirstPage: selectors.getIsFirstPage(state),
  isLastPage: selectors.getIsLastPage(state),
  users: selectors.getUsers(state),
  isFetching: selectors.getIsFetching(state)
});

export default connect(mapStateToProps, actions)(withRouter(Users));
