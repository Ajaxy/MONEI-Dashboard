import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from 'modules/auth/actions';
import * as selectors from 'modules/auth/selectors';
import SignInView from '../components/SignInView';

class SignIn extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    showLock: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.replace('/');
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
  isAuthenticated: selectors.getIsAuthenticated(state)
});

export default connect(mapStateToProps, actions)(SignIn);
