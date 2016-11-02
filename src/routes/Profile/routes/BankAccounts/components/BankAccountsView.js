import React, {PropTypes} from 'react';
import Button from 'components/Button'
import AddBankAccount from '../containers/AddBankAccountContainer';
const BankAccountsView = ({
  addBankAccountStart
}) => (
  <section className="ui vertical segment">
    <h1 className="ui header">
      Bank accounts
      <Button
        primary
        onClick={addBankAccountStart}
        className="right floated">
        Add account
      </Button>
    </h1>
    <AddBankAccount />
  </section>
);

BankAccountsView.propTypes = {
  addBankAccountStart: PropTypes.func.isRequired
};

export default BankAccountsView;
