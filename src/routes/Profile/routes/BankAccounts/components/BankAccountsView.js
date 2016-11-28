import React, {PropTypes} from 'react';
import Button from 'components/Button';
import Loader from 'components/Loader';
import cx from 'classnames';
import classNames from './BankAccountsView.scss';
import AddBankAccount from '../containers/SaveBankAccountContainer';
import ConfirmDelete from '../containers/ConfirmDeleteContainer';
import BankAccountItem from './BankAccountItem';
const BankAccountsView = ({
  saveBankAccountStart,
  deleteBankAccountStart,
  bankAccounts,
  isFetching,
  isUpToDate
}) => {
  const Empty = () => (
    <div className={cx('sixteen wide column', classNames.empty)}>
      <h3 className="ui header">You don't have bank accounts yet.</h3>
    </div>
  );
  return (
    <section className="ui vertical segment">
      <h2 className="ui header">
        Bank accounts
        <Button
          primary
          onClick={saveBankAccountStart}
          className="right floated">
          Add account
        </Button>
      </h2>
      <div className={classNames.wrapper}>
        <Loader active={isFetching} inline={false} dimmerClassName={classNames.dimmer} />
        <div className="ui stackable three column grid">
          {bankAccounts.length > 0 ? bankAccounts.map((bankAccount, i) => (<BankAccountItem
            {...bankAccount}
            isDeletable={bankAccounts.length > 1 && !bankAccount.isPrimary}
            onDelete={deleteBankAccountStart}
            onEdit={saveBankAccountStart}
            key={i} />))
            : isUpToDate && <Empty />
          }
        </div>
        {isFetching && !isUpToDate && <div className={classNames.placeholder} />}
      </div>
      <AddBankAccount />
      <ConfirmDelete />
    </section>
  );
};

BankAccountsView.propTypes = {
  saveBankAccountStart: PropTypes.func.isRequired,
  deleteBankAccountStart: PropTypes.func.isRequired,
  bankAccounts: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isUpToDate: PropTypes.bool.isRequired
};

export default BankAccountsView;
