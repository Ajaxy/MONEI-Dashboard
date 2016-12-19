import React, {PropTypes} from 'react';
import Button from 'components/Button';
import {USER_ACQUIRERS} from 'lib/enums';
import cx from 'classnames';

const SubAccountRow = ({subAccount, onEdit, bankAccount = {}, copy, isConfirming, confirm}) => {
  const isPending = subAccount.bankAccountStatus === 'pending';
  const bankAccountIconClass = cx('icon', {
    'grey wait': isPending,
    'green check': !isPending
  });
  const handleEdit = (e) => {
    e.preventDefault();
    onEdit();
  };
  return (
    <tr className={cx({warning: subAccount.sandbox})}>
      <td>
        <a href="#" onClick={handleEdit}>{subAccount.name}</a>
      </td>
      <td>
        {
          bankAccount.number
            ? <span>
              <i className={bankAccountIconClass} />
              <span
                className="clickable"
                onClick={() => copy(bankAccount.number, 'Bank account number')}>
                {bankAccount.number}
              </span> {' '}
              <span className="text grey">
                {bankAccount.currency} / {bankAccount.country}
              </span>
            </span>
            : <span className="text grey">No attached bank account</span>
        }
      </td>
      <td>{USER_ACQUIRERS[subAccount.acquirer]}</td>
      <td>{subAccount.commercialConditions.currency}</td>
      <td>{subAccount.sandbox ? 'TEST' : subAccount.state}</td>
      <td>
        {isPending && <Button
          loading={isConfirming}
          onClick={confirm}>
          Confirm bank account
        </Button>}
      </td>
    </tr>
  );
};

SubAccountRow.propTypes = {
  subAccount: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  bankAccount: PropTypes.object,
  copy: PropTypes.func.isRequired,
  isConfirming: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired
};

export default SubAccountRow;
