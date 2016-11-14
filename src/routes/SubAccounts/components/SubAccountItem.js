import React, {PropTypes} from 'react';
import Link from 'react-router/lib/Link';
import cx from 'classnames';
import classNames from './SubAccountItem.scss';
import DropDownMenu from 'components/DropDownMenu';

const SubAccountItem = ({subAccount, isSandboxMode}) => {
  const iconClass = cx(
    classNames.icon,
    'large middle aligned icon',
    {
      'green check circle': subAccount.state === 'LIVE' && !isSandboxMode,
      'grey info circle': subAccount.state === 'TEST' || isSandboxMode
    }
  );
  return (
    <div className="item">
      <div className="right floated content">
        <div className="ui buttons">
          <Link
            to={`/channels/${subAccount.channel}/guides`}
            className="ui button">
            Ecommerce Guides
          </Link>
          <DropDownMenu className="button icon floating">
            <i className="dropdown icon" />
            <div className="menu">
              <Link
                to={`/channels/${subAccount.channel}/settings`}
                className="item">
                Settings
              </Link>
              <Link
                to={`/channels/${subAccount.channel}/zapier`}
                className="item">
                Zapier
              </Link>
              <Link
                to={`/channels/${subAccount.channel}/webhooks`}
                className="item">
                Webhooks
              </Link>
            </div>
          </DropDownMenu>
        </div>
      </div>
      <i className={iconClass} />
      <div className="content">
        <h3 className="header">
          <Link to={`/channels/${subAccount.channel}/guides`}>
            {subAccount.name}
          </Link>
        </h3>
        <small className="description">
          {isSandboxMode
            ? <span className="text orange">only for testing purposes</span>
            : <span className="text grey">{subAccount.state}</span>}
        </small>
      </div>
    </div>
  );
};
SubAccountItem.propTypes = {
  subAccount: PropTypes.object.isRequired
};

export default SubAccountItem;

