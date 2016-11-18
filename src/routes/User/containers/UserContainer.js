import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import UserView from '../components/UserView';

class User extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    fetchSubAccounts: PropTypes.func.isRequired,
    verifyUser: PropTypes.func.isRequired,
    loginAsUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {userId, fetchUser, fetchSubAccounts} = this.props;
    fetchUser(userId, true);
    fetchSubAccounts(userId);
  }

  render() {
    return <UserView{...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  user: selectors.getUser(state),
  userMetadata: selectors.getUserMetadata(state),
  subAccounts: selectors.getSubAccounts(state),
  isFetching: selectors.getIsFetching(state),
  isUpdating: selectors.getIsUpdating(state),
  isUpToDate: selectors.getIsUpToDate(state),
  isSyncing: selectors.getIsSyncing(state),
  isFetchingSubAccounts: selectors.getIsFetchingSubAccounts(state),
  userId: props.params.userId
});

export default connect(mapStateToProps, actions)(User);
