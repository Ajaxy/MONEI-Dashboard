import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import ChannelWebhooks from '../components/ChannelWebhooks';

class ChannelWebhooksContainer extends Component {
  componentWillMount() {
    this.loadMore();
  }

  loadMore = () => {
    const {channelId} = this.props;
    this.props.fetchWebhooks(channelId);
  }

  showCreateModal = () => {
    const {channelId, showCreateWebhook} = this.props;
    showCreateWebhook(channelId);
  }

  showEditModal = (channelId, webhookId, webhook) => {
    this.props.showEditWebhook(channelId, webhookId, webhook);
  }

  showDeleteModal = (webhookId) => {
    this.props.showDeleteWebhook(webhookId);
  }

  render() {
    return <ChannelWebhooks 
      loadMore={this.loadMore} 
      showCreateModal={this.showCreateModal}
      showEditModal={this.showEditModal}
      showDeleteModal={this.showDeleteModal}
      {...this.props}
    />;
  }
}

const mapStateToProps = (state, props) => ({
  webhooks: selectors.getWebhooks(state),
  isFetching: selectors.getIsFetchingWebhooks(state),
  isCreating: selectors.getIsCreatingWebhooks(state),
  isUpdating: selectors.getIsUpdatingWebhooks(state),
  isDeleting: selectors.getIsDeletingWebhooks(state),
});

export default connect(mapStateToProps, actions)(ChannelWebhooksContainer);
