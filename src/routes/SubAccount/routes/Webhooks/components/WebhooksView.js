import React, {PropTypes} from 'react';
import WebhookItem from './WebhookItem';
import Loader from 'components/Loader';
import classNames from './WebhooksView.scss';

export const WebhooksView = ({webhooks, isFetching, isUpToDate}) => {
  const Empty = () => (
    <div className="item center aligned">
      <h3 className="ui header">You don't have webhooks yet.</h3>
    </div>
  );
  return (
    <div className={classNames.wrapper}>
      <Loader active={isFetching} inline={false} dimmerClassName={classNames.dimmer} />
      <div className="ui big very relaxed divided list">
        {webhooks.length > 0 ? webhooks.map((webhook, i) => (<WebhookItem
          webhook={webhook}
          key={i} />))
          : isUpToDate && <Empty />
        }
      </div>
      {isFetching && !isUpToDate && <div className={classNames.placeholder} />}
    </div>
  );
};

WebhooksView.propTypes = {
  webhooks: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUpToDate: PropTypes.bool.isRequired
};

export default WebhooksView;
