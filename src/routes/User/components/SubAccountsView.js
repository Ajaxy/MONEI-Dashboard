import React, {PropTypes} from 'react';
import Button from 'components/Button';
import Loader from 'components/Loader';
import cx from 'classnames';

const SubAccountsView = ({subAccounts, isFetching, isSyncing, syncUser, user, bankAccountById}) => (
  <section>
    <table className="ui large striped table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Attached bank account</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {isFetching && <tr>
          <td colSpan="3">
            <Loader active />
          </td>
        </tr>}
        {!isFetching && subAccounts.length === 0 && <tr>
          <td colSpan="3">
            <h4 className="ui header centered">
              This user doesn't have sub accounts yet, or you need to sync data with PayOn.
            </h4>
          </td>
        </tr>}
        {subAccounts.map((subAccount, i) => {
          const bankAccount = bankAccountById[subAccount.bankAccountId] || {};
          return (
            <tr key={i}>
              <td>{subAccount.name}</td>
              <td>
                {
                  bankAccount.number
                  ? <span>
                    {bankAccount.number} {' '}
                    <span className="text grey">
                    {bankAccount.currency} / {bankAccount.country}
                    </span>
                  </span>
                  : <span className="text grey">No attached bank account</span>
                }
              </td>
              <td>{subAccount.state}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <Button
      primary
      loading={isSyncing}
      onClick={() => syncUser(user.user_id, user.app_metadata.mid)}
      className={cx('right floated green')}>
      Sync user data with PayOn
    </Button>
  </section>
);

SubAccountsView.propTypes = {
  user: PropTypes.object.isRequired,
  subAccounts: PropTypes.array.isRequired,
  syncUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSyncing: PropTypes.bool.isRequired
};

export default SubAccountsView;