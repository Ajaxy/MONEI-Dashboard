import React, {PropTypes} from 'react';
import humanize from 'humanize-string';
import Button from 'components/Button';

export const NUM_COLUMNS = 4;

const WebhookRow = ({
  webhook,
  isHeader,
  isFooter,
  createWebhook,
  editWebhook,
  deleteWebhook
}) => {
  if (isHeader) {
    return (
      <tr>
        <th>URL</th>
        <th>Status</th>
        <th>Event Types</th>
        <th />
      </tr>
    );
  } else if (isFooter) {
    return (
      <tr>
        <th colSpan={NUM_COLUMNS} className="right aligned">
          <Button primary onClick={createWebhook} className="green">
            Create Webhook
          </Button>
        </th>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{webhook.url}</td>
        <td>{humanize(webhook.webhookState)}</td>
        <td>{webhook.events.join(', ')}</td>
        <td className="right aligned">
          <Button
            icon
            className="labeled"
            onClick={() => editWebhook(webhook.channelId, webhook.id, webhook)}>
            <i className="edit icon" /> Edit
          </Button>
          <Button
            icon
            negative
            className="labeled"
            onClick={() => deleteWebhook(webhook.id)}>
            <i className="trash icon" /> Delete
          </Button>
        </td>
      </tr>
    );
  }
};

export default WebhookRow;
