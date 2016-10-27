import React, {PropTypes} from 'react';
import humanize from 'humanize-string';

export const NUM_COLUMNS = 4;

const WebhookRow = ({webhook, isHeader, isFooter}) => {
  if (isHeader) {
    return (
      <tr>
        <th>URL</th>
        <th>Status</th>
        <th>Event Types</th>
        <th></th>
      </tr>
    );
  } else if (isFooter) {
    return (
      <tr>
        <th colSpan={NUM_COLUMNS}></th>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{webhook.url}</td>
        <td>{humanize(webhook.webhookState)}</td>
        <td>{webhook.events.join(', ')}</td>
        <td></td>
      </tr>
    );
  }
};

export default WebhookRow;