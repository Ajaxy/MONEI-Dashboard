import React, {PropTypes} from 'react';
import {InfiniteTable} from 'components/Table';
import WebhookRow, {NUM_COLUMNS} from './WebhookRow';

const ChannelWebhooks = ({webhooks, loadMore, isFetching}) => (
  <InfiniteTable
    isFetching={isFetching}
    isLastPage={true}
    selectable={!isFetching && webhooks.length > 0}
    numColumns={NUM_COLUMNS}
    onLoadMore={loadMore}
    autoLoad={true}
    className="large striped single line"
    header={<WebhookRow isHeader={true}/>}
    footer={<WebhookRow isFooter={true}/>}
  >
    {
      (webhooks.length > 0 || isFetching) ? webhooks.map((webhook, index) =>
        <WebhookRow
          key={index}
          webhook={webhook}
        />)
      : <tr><td colSpan={NUM_COLUMNS} className="center aligned">No webhooks yet</td></tr>
    }
  </InfiniteTable>
);

export default ChannelWebhooks;