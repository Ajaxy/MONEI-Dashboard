import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import SubAccountsView from '../components/SubAccountsView';

class User extends Component {
  static propTypes = {
    fetchSubAccounts: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {userId, fetchSubAccounts} = this.props;
    fetchSubAccounts(userId);
  }

  render() {
    return <UserView{...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  user: selectors.getUser(state),
  subAccounts: selectors.getSubAccounts(state),
  isSyncing: selectors.getIsSyncing(state),
  isFetching: selectors.getIsFetchingSubAccounts(state)
});

export default connect(mapStateToProps, actions)(SubAccountsView);
