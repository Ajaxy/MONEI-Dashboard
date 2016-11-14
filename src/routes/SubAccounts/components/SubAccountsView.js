import React, {PropTypes} from 'react';
import classNames from './SubAccountsView.scss'
import SubAccountItem from './SubAccountItem';
import Loader from 'components/Loader';

const SubAccountsView = ({subAccounts, isFetching, isUpToDate, isInSandboxMode}) => {
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
            isSandboxMode={isInSandboxMode}
            key={i} />))
            : isUpToDate && <Empty />
          }
        </div>
        {isFetching && !isUpToDate && <div className={classNames.placeholder} />}
      </div>
    </section>
  );
};

SubAccountsView.propTypes = {
  subAccounts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUpToDate: PropTypes.bool.isRequired,
  isInSandboxMode: PropTypes.bool.isRequired
};

export default SubAccountsView;
