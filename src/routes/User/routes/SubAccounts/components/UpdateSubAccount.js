import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Confirm from 'components/Modal/Confirm';
import {CURRENCIES} from 'lib/constants';
import Select, {SelectItem} from 'components/Select';
import {USER_ACQUIRERS} from 'lib/enums';

const UpdateSubAccount = ({
  userId,
  isOpen,
  isUpdating,
  subAccount,
  fields: {commercialConditions, acquirer},
  handleSubmit,
  invalid,
  resetForm,
  updateSubAccount,
  updateSubAccountCancel
}) => {
  const onSubmit = (formProps) => {
    updateSubAccount(userId, subAccount.id, formProps);
  };
  const onCancel = () => {
    updateSubAccountCancel();
    resetForm();
  };
  return (
    <Confirm
      isOpen={isOpen}
      isLoading={isUpdating}
      isDisabled={invalid}
      onCancel={onCancel}
      onConfirm={handleSubmit(onSubmit)}
      headerText={subAccount.name}
      confirmText="Save"
      confirmClass="green">
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Commercial conditions</h3>
        <Input {...commercialConditions.europeCardRate} label="Europe card rate" />
        <Input {...commercialConditions.nonEuropeCardRate} label="Non Europe card rate" />
        <Input {...commercialConditions.fixEuropeRate} label="Fixed Europe rate" />
        <Input {...commercialConditions.fixNonEuropeRate} label="Fixed non Europe rate" />
        <Select
          {...commercialConditions.currency}
          name="currency">
          {CURRENCIES.map((currency, i) => (
            <SelectItem
              key={i}
              value={currency}>
              {currency}
            </SelectItem>
          ))}
        </Select>
        <h3>Sub account settings</h3>
        <Select
          {...acquirer}
          search>
          {Object.keys(USER_ACQUIRERS).map((key, i) => (
            <SelectItem
              key={i}
              value={key}>
              {USER_ACQUIRERS[key]}
            </SelectItem>
          ))}
        </Select>
      </form>
    </Confirm>
  );
};

UpdateSubAccount.propTypes = {
  fields: PropTypes.shape({
    commercialConditions: PropTypes.object.isRequired
  }),
  subAccount: PropTypes.object,
  userId: PropTypes.string,
  updateSubAccount: PropTypes.func.isRequired,
  updateSubAccountCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isUpdating: PropTypes.bool.isRequired
};

export default UpdateSubAccount;
