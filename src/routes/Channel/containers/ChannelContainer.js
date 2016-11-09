import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {getIsInSandboxMode} from 'modules/profile/selectors';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as channelsSelectors from 'routes/Channels/modules/selectors';
import ChannelView from '../components/ChannelView';

class Channel extends Component {
  componentWillMount() {
    if (!this.props.channel.name)
      { this.props.fetchChannel(); }
  }

  render() {
    const {channelId} = this.props;
    return <ChannelView baseUrl={`/channels/${channelId}`} {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  channel: selectors.getChannel(state),
  isFetching: channelsSelectors.getIsFetching(state),
  isSandboxMode: getIsInSandboxMode(state),
  channelId: props.params.channelId,
  currentTab: props.params.currentTab
});

export default connect(mapStateToProps, actions)(Channel);
