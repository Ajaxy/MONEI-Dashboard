import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import ChannelGuide from '../components/ChannelGuide';

class ChannelGuideContainer extends Component {
  componentWillMount() {
    this.props.selectPlatform(0);
  }

  render() {
    return <ChannelGuide {...this.props}/>;
  }
}

const mapStateToProps = (state, props) => ({
  selectedPlatform: selectors.getSelectedPlatform(state),
  isInSandboxMode: profileSelectors.getIsInSandboxMode(state),
  isMerchant: profileSelectors.getIsMerchant(state),
});

export default connect(mapStateToProps, actions)(ChannelGuideContainer);
