import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import WebhooksView from '../components/WebhooksView';

class ChannelWebhooksContainer extends Component {
  componentDidMount() {
    const {fetchWebhooks, subAccountId} = this.props;
    fetchWebhooks(subAccountId);
  }

  render() {
    return <WebhooksView  {...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  subAccountId: props.params.subAccountId,
  webhooks: selectors.getWebhooks(state),
  isFetching: selectors.getIsFetching(state),
  isSaving: selectors.getIsSaving(state),
  isUpToDate: selectors.getIsUpToDate(state),
  isDeleting: selectors.getIsDeleting(state)
});

export default connect(mapStateToProps, actions)(ChannelWebhooksContainer);
