import React, {PropTypes} from 'react';
import WebhookItem from './WebhookItem';
import SaveModal from '../containers/SaveContainer';
import DeleteModal from '../containers/ConfirmDeleteContainer';
import Loader from 'components/Loader';
import Button from 'components/Button';
import classNames from './WebhooksView.scss';

export const WebhooksView = ({
  webhooks,
  isFetching,
  isUpToDate,
  saveWebhookStart,
  deleteWebhookStart,
  subAccountId
}) => {
  const Empty = () => (
    <div className="item center aligned">
      <h3 className="ui header">You don't have webhooks yet.</h3>
    </div>
  );
  return (
    <section className="ui vertical segment">
      <h2 className="ui header">
    Webhooks
        <Button
          primary
          onClick={saveWebhookStart}
          className="right floated">
      Create webhook
        </Button>
      </h2>
      <div className={classNames.wrapper}>
        <Loader active={isFetching} inline={false} dimmerClassName={classNames.dimmer} />
        <div className="ui big very relaxed divided list">
          {webhooks.length > 0 ? webhooks.map((webhook, i) => (<WebhookItem
            webhook={webhook}
            onEdit={() => saveWebhookStart(webhook.id)}
            onDelete={() => deleteWebhookStart(webhook.id)}
            key={i} />))
          : isUpToDate && <Empty />
        }
        </div>
        {isFetching && !isUpToDate && <div className={classNames.placeholder} />}
        <SaveModal subAccountId={subAccountId} />
        <DeleteModal />
      </div>
    </section>
  );
};

WebhooksView.propTypes = {
  webhooks: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUpToDate: PropTypes.bool.isRequired
};

export default WebhooksView;
