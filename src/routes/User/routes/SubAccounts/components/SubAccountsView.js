import React, {PropTypes} from 'react';
import Button from 'components/Button';
import Loader from 'components/Loader';
import EditSubAccount from '../containers/UpdateSubAccountContainer';
import SubAccountRow from './SubAccountRow';
import cx from 'classnames';

const SubAccountsView = ({
  subAccounts,
  isFetching,
  isSyncing,
  syncUser,
  user,
  bankAccountById,
  copyToClipboard,
  updateSubAccountStart,
  isConfirmingBankAccount,
  confirmBankAccount
}) => (
  <section>
    <table className="ui large striped table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Attached bank account</th>
          <th>Acquirer</th>
          <th>Status</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {isFetching && <tr>
          <td colSpan="5">
            <Loader active />
          </td>
        </tr>}
        {!isFetching && subAccounts.length === 0 && <tr>
          <td colSpan="5">
            <h4 className="ui header centered">
              This user doesn't have sub accounts yet, or you need to sync data with PayOn.
            </h4>
          </td>
        </tr>}
        {!isFetching && subAccounts.map((subAccount, i) => (
          <SubAccountRow
            key={i}
            subAccount={subAccount}
            onEdit={() => updateSubAccountStart(subAccount.id)}
            bankAccount={bankAccountById[subAccount.bankAccountId]}
            copy={copyToClipboard}
            isConfirming={isConfirmingBankAccount}
            confirm={() => confirmBankAccount(user.user_id, subAccount.id)} />
        ))}
      </tbody>
    </table>
    <Button
      primary
      loading={isSyncing}
      onClick={() => syncUser(user.user_id, user.app_metadata.mid)}
      className={cx('right floated green')}>
      Sync user data with PayOn
    </Button>
    <EditSubAccount userId={user.user_id} />
  </section>
);

SubAccountsView.propTypes = {
  user: PropTypes.object.isRequired,
  subAccounts: PropTypes.array.isRequired,
  syncUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isSyncing: PropTypes.bool.isRequired,
  bankAccountById: PropTypes.object.isRequired,
  copyToClipboard: PropTypes.func.isRequired,
  updateSubAccountStart: PropTypes.func.isRequired,
  isConfirmingBankAccount: PropTypes.bool.isRequired,
  confirmBankAccount: PropTypes.func.isRequired
};

export default SubAccountsView;
