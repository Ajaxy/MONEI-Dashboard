import React, {PropTypes} from 'react';
import cx from 'classnames';
import classNames from './WebhookItem.scss';
import Button from 'components/Button';
import {NO_LOCALIZE} from 'lib/constants';

const WebhookItem = ({webhook, onEdit, onDelete}) => {
  const isActive = webhook.webhookState === 'ACTIVE';
  const iconClass = cx(
    classNames.icon,
    'large middle aligned icon',
    {
      'green play': isActive,
      'grey pause': !isActive
    }
  );
  return (
    <div className="item">
      <div className="right floated content">
        <Button onClick={onEdit}>
          Edit
        </Button>
        {' '}
        <Button onClick={onDelete}>
          Delete
        </Button>
      </div>
      <i className={iconClass} />
      <div className={cx('content', NO_LOCALIZE)}>
        <h3 className="header">
          {webhook.url}
        </h3>
        <small className="description" style={{opacity: 0.5}}>
          {webhook.events.join(', ').replace(/\./g, ' ')}
        </small>
      </div>
    </div>
  );
};
WebhookItem.propTypes = {
  webhook: PropTypes.object.isRequired
};

export default WebhookItem;

