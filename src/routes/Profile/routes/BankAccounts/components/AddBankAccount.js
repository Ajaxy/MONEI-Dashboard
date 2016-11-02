import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Confirm from 'components/Modal/Confirm';

const AddBankAccount = ({
  isOpen,
  isAdding,
  fields: {number},
  handleSubmit,
  invalid,
  resetForm,
  addBankAccount,
  addBankAccountCancel
}) => {
  const onSubmit = (formProps) => {
    addBankAccount(formProps);
  };
  const onCancel = () => {
    addBankAccountCancel();
    resetForm();
  };
  return (
    <Confirm
      isOpen={isOpen}
      isLoading={isAdding}
      isDisabled={invalid}
      onCancel={onCancel}
      onConfirm={handleSubmit(onSubmit)}
      headerText="Add new bank account"
      confirmText="Add"
      confirmClass="positive">
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" {...number} label="Account number" />
      </form>
    </Confirm>
  );
};

AddBankAccount.propTypes = {
  fields: PropTypes.shape({
    number: PropTypes.object.isRequired
  }),
  addBankAccount: PropTypes.func.isRequired,
  addBankAccountCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isAdding: PropTypes.bool.isRequired
};

export default AddBankAccount;
