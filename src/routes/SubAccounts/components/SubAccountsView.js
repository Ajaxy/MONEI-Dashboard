import React, {PropTypes} from 'react';
import classNames from './SubAccountsView.scss'
import SubAccountItem from './SubAccountItem';
import Loader from 'components/Loader';

const SubAccountsView = ({subAccounts, isFetching, isUpToDate}) => {
  const Empty = () => (
    <div className="item center aligned">
      <h3 className="ui header">You don't have sub accounts yet.</h3>
    </div>
  );
  return (
    <section className="ui basic segment padded-bottom">
      <h1 className="ui header">
        Sub Accounts
      </h1>
      <div className={classNames.wrapper}>
        <Loader active={isFetching} inline={false} dimmerClassName={classNames.dimmer} />
        <div className="ui big very relaxed divided list">
          {subAccounts.length > 0 ? subAccounts.map((subAccount, i) => (<SubAccountItem
            subAccount={subAccount}
            key={i} />))
            : isUpToDate && <Empty />
          }
        </div>
        {isFetching && !isUpToDate && <div className={classNames.placeholder} />}
      </div>
    </section>
  );
};

export default SubAccountsView;
