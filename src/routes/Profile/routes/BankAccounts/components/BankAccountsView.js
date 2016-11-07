import React, {PropTypes} from 'react';
import Button from 'components/Button'
import Loader from 'components/Loader';
import classNames from './BankAccountsView.scss';
import AddBankAccount from '../containers/AddBankAccountContainer';
import ConfirmDelete from '../containers/ConfirmDeleteContainer';
import BankAccountItem from './BankAccountItem';
const BankAccountsView = ({
  addBankAccountStart,
  deleteBankAccountStart,
  bankAccounts,
  isFetching,
  isUpToDate
}) => {
  const Empty = () => (
    <div className="item center aligned">
      <h3 className="ui header">You don't have bank accounts yet.</h3>
    </div>
  );
  return (
    <section className="ui vertical segment">
      <h2 className="ui header">
        Bank accounts
        <Button
          primary
          onClick={addBankAccountStart}
          className="right floated">
          Add account
        </Button>
      </h2>
      <div className={classNames.wrapper}>
        <Loader active={isFetching} inline={false} dimmerClassName={classNames.dimmer} />
        <div className="ui stackable three column grid">
          {bankAccounts.length > 0 ? bankAccounts.map((bankAccount, i) => (<BankAccountItem
            {...bankAccount}
            onDelete={deleteBankAccountStart}
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
}

BankAccountsView.propTypes = {
  addBankAccountStart: PropTypes.func.isRequired
};

export default BankAccountsView;
