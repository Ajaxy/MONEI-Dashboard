import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import UserView from '../components/UserView';

class User extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    verifyUser: PropTypes.func.isRequired,
    loginAsUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
  };

  componentDidMount() {
    const {userId, fetchUser} = this.props;
    fetchUser(userId, true);
  }

  render() {
    return <UserView{...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  user: selectors.getUser(state),
  isFetching: selectors.getIsFetching(state),
  isUpdating: selectors.getIsUpdating(state),
  isUpToDate: selectors.getIsUpToDate(state),
  userId: props.params.userId
});

export default connect(mapStateToProps, actions)(User);
