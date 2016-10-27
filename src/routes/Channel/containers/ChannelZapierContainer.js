import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import ChannelZapier from '../components/ChannelZapier';

class ChannelZapierContainer extends Component {
  componentWillMount() {
    const {channelId, zapierToken, createZapierToken} = this.props;
    if (!zapierToken)
      createZapierToken(channelId);
  }

  render() {
    return <ChannelZapier {...this.props}/>;
  }
}

const mapStateToProps = (state, props) => ({
  zapierToken: selectors.getZapierToken(state),
  isFetching: selectors.getIsFetchingZapierToken(state),
});

export default connect(mapStateToProps, actions)(ChannelZapierContainer);
