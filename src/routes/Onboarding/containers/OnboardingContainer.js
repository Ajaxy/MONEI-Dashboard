import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import OnboardingView from '../components/OnboardingView';

class Onboarding extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    const {user, updateStep} = this.props;
    updateStep(user);
  }

  render() {
    return <OnboardingView {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  user: profileSelectors.getProfile(state),
  step: selectors.getStep(state),
  percentage: selectors.getPercentage(state)
});

export default connect(mapStateToProps, actions)(Onboarding);
