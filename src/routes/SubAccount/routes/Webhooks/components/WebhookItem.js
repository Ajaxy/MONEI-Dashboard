import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import cx from 'classnames';
import classNames from './WebhookItem.scss';
import Button from 'components/Button';
import {NO_LOCALIZE} from 'lib/constants';

const WebhookItem = ({webhook}) => {
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
      <i className={iconClass} />
      <div className="content">
        <h3 className="header">
          {webhook.url}
        </h3>
        <small className="description" style={{opacity: 0.5}}>
          {webhook.webhookState}
        </small>
      </div>
    </div>
  );
};
WebhookItem.propTypes = {
  webhook: PropTypes.object.isRequired
};

export default WebhookItem;

