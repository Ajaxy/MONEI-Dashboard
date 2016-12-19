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
      'grey info circle': subAccount.state === 'TEST' || isSandboxMode,
      'grey ban': subAccount.state === 'DISABLED'
    }
  );
  return (
    <div className="item">
      <div className="right floated content">
        <div className="ui buttons">
          <Link
            to={`/sub-accounts/${subAccount.id}`}
            className="ui button">
            Overview
          </Link>
          <DropDownMenu className="button icon floating">
            <i className="dropdown icon" />
            <div className="menu">
              <Link
                to={`/sub-accounts/${subAccount.id}/guides`}
                className="item">
                Ecommerce Guides
              </Link>
              <Link
                to={`/sub-accounts/${subAccount.id}/zapier`}
                className="item">
                Zapier
              </Link>
              <Link
                to={`/sub-accounts/${subAccount.id}/webhooks`}
                className="item">
                Webhooks
              </Link>
              <Link
                to={`/sub-accounts/${subAccount.id}/settings`}
                className="item">
                Settings
              </Link>
            </div>
          </DropDownMenu>
        </div>
      </div>
      <i className={iconClass} />
      <div className="content">
        <h3 className="header">
          <Link to={`/sub-accounts/${subAccount.id}`}>
            {subAccount.customName}
          </Link>
          {' '}
          {subAccount.commercialConditions.currency}
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
  subAccount: PropTypes.object.isRequired,
  isSandboxMode: PropTypes.bool.isRequired
};

export default SubAccountItem;

