import React, {PropTypes} from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import Select, {SelectItem} from 'components/Select';

const SettingsForm = ({
  fields: {
    customName,
    bankAccountId
  },
  isDisabled,
  handleSubmit,
  invalid,
  onFormSubmit,
  isFetching,
  bankAccounts,
  isLoading
}) => {
  return (
    <div className="ui stackable grid">
      <form className="ui form nine wide column" onSubmit={handleSubmit(onFormSubmit)}>
        <Input type="text" {...customName} />
        <Select
          label="Bank account"
          disabled={isDisabled}
          hint="where you want your money to be settled"
          loading={isFetching}
          {...bankAccountId}>
          {bankAccounts.map((bankAccount, i) => (
            <SelectItem
              key={i}
              value={bankAccount.id}>
              {bankAccount.name} {' '}
              <span className="text grey">
                ...{bankAccount.last4Digits} {' '}
                {bankAccount.isPrimary && '(primary)'}
              </span>
            </SelectItem>
          ))}
        </Select>
        {isDisabled && <div className="ui info message">
          We will change your bank account within 24 hours.
        </div>}
        <Button
          primary
          loading={isLoading}
          type="submit"
          disabled={invalid || isLoading}>
          Save
        </Button>
      </form>
    </div>
  );
};

SettingsForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fields: PropTypes.object.isRequired,
  bankAccounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFetching: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool
};

export default SettingsForm;
