import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {signOut} from 'modules/auth/actions';
import {setSandboxMode} from 'modules/profile/actions';
import * as selectors from 'modules/profile/selectors';
import {trackEvent} from 'lib/intercom';

class HeaderContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  viewOnboarding = () => {
    trackEvent('monei_verification_started');
    this.context.router.push('/onboarding');
  };

  viewChannels = () => {
    const {isInSandboxMode} = this.props;
    trackEvent('monei_channels_clicked', {sandbox: isInSandboxMode});
    this.context.router.push('/channels');
  };

  render() {
    return <Header
      viewOnboarding={this.viewOnboarding}
      viewChannels={this.viewChannels}
      {...this.props}
    />
  }
}

const mapActionCreators = {
  setSandboxMode,
  signOut
};

const mapStateToProps = (state) => ({
  profile: selectors.getProfile(state),
  isUser: selectors.getIsUser(state),
  isAdmin: selectors.getIsAdmin(state),
  isMerchant: selectors.getIsMerchant(state),
  isInSandboxMode: selectors.getIsInSandboxMode(state),
  isVerificationRequested: selectors.getIsVerificationRequested(state),
});

export default connect(mapStateToProps, mapActionCreators)(HeaderContainer);
