import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import ChannelsView from '../components/ChannelsView';

class Channels extends Component {
  static propTypes = {
    fetchChannels: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    if (!this.props.channels || this.props.channels.length === 0)
      { this.props.fetchChannels(); }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isInSandboxMode != this.props.isInSandboxMode)
      { this.props.fetchChannels(); }
  }

  loadMore = () => {
    const {page} = this.props;
    this.props.fetchChannels(page.nextPage, page.filter);
  };

  viewChannel = (channelId) => {
    this.context.router.push(`/channels/${encodeURI(channelId)}/guides`);
  };

  render() {
    return (
      <ChannelsView
        loadMore={this.loadMore}
        viewChannel={this.viewChannel}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  channels: selectors.getChannels(state),
  isFetching: selectors.getIsFetching(state),
  isInSandboxMode: profileSelectors.getIsInSandboxMode(state)
});

export default connect(mapStateToProps, actions)(Channels);
