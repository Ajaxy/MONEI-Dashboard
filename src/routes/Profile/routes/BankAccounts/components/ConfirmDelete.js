import React, {PropTypes} from 'react';
import Confirm from 'components/Modal/Confirm';

const ConfirmDelete = ({isOpen, isDeleting, deleteBankAccountCancel, deleteBankAccount, bankAccount}) => (
  <Confirm
    isOpen={isOpen}
    isLoading={isDeleting}
    onCancel={deleteBankAccountCancel}
    onConfirm={() => deleteBankAccount(bankAccount.id)}
    confirmText="Delete"
    confirmClass="negative">
    <p>This action will completely delete a bank account ending with <b>{bankAccount.last4Digits}</b></p>
  </Confirm>
);

ConfirmDelete.propTypes = {
  bankAccount: PropTypes.object.isRequired,
  deleteBankAccount: PropTypes.func.isRequired,
  deleteBankAccountCancel: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired
};

export default ConfirmDelete;
