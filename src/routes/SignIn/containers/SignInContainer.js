import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import * as actions from 'modules/auth/actions';
import * as selectors from 'modules/auth/selectors';
import {getIsSandboxInitialized} from 'modules/profile/selectors';
import SignInView from '../components/SignInView';

class SignIn extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    showLock: PropTypes.func.isRequired,
    router: PropTypes.shape({
      replace: PropTypes.func.isRequired
    }).isRequired
  };

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.router.replace('/');
    }
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.showLock();
    }
  }

  render() {
    return (
      <SignInView {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: selectors.getIsAuthenticated(state),
  isSandboxInitialized: getIsSandboxInitialized(state)
});

export default connect(mapStateToProps, actions)(withRouter(SignIn));
