import React, {PropTypes} from 'react';
import {InfiniteTable} from 'components/Table';
import WebhookRow, {NUM_COLUMNS} from './WebhookRow';

const ChannelWebhooks = ({
  channelId,
  webhooks,
  loadMore,
  isFetching,
  showCreateModal,
  showEditModal,
  showDeleteModal
}) => (
  <InfiniteTable
    isFetching={isFetching}
    isLastPage
    selectable={!isFetching && webhooks.length > 0}
    numColumns={NUM_COLUMNS}
    onLoadMore={loadMore}
    autoLoad
    className="large striped single line"
    header={<WebhookRow isHeader />}
    footer={<WebhookRow isFooter createWebhook={showCreateModal} />}
  >
    {
      (webhooks.length > 0 || isFetching) ? webhooks.map((webhook, index) =>
        <WebhookRow
          key={index}
          webhook={webhook}
          editWebhook={showEditModal}
          deleteWebhook={showDeleteModal}
        />)
      : <tr><td colSpan={NUM_COLUMNS} className="center aligned">No webhooks yet</td></tr>
    }
  </InfiniteTable>
);

export default ChannelWebhooks;
