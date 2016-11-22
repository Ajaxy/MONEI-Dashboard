import React, {PropTypes} from 'react';
import Input from 'components/Input';
import CheckBox from 'components/CheckBox';
import Confirm from 'components/Modal/Confirm';
import {CURRENCIES} from 'lib/constants';
import Select, {SelectItem} from 'components/Select';
import cx from 'classnames';

const BankAccountInput = ({dirty, valid, value, name, onChange, onBlur}) => (
  <div className="ui icon input">
    <input type="text" value={value} name={name} onChange={onChange} onBlur={onBlur} />
    {dirty && valid && <i className="check green icon" />}
  </div>
);

const AddBankAccount = ({
  isOpen,
  isAdding,
  fields: {
    name,
    isPrimary,
    iban,
    routingNumber,
    accountNumber,
    country,
    currency
  },
  isUsFormat,
  handleSubmit,
  invalid,
  resetForm,
  addBankAccount,
  addBankAccountCancel,
  countries
}) => {
  const onSubmit = (formProps) => {
    addBankAccount(formProps);
  };
  const onCancel = () => {
    addBankAccountCancel();
    resetForm();
  };
  const cleanIban = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    iban.onChange(value);
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
        <Input {...name} />
        <Select
          {...country}
          label="Country"
          search>
          {countries.map(country => (
            <SelectItem
              key={country.code}
              value={country.name}>
              <i className={cx(country.code.toLowerCase(), 'flag')} />
              {country.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          {...currency}
          label="Currency">
          {CURRENCIES.map((currency, i) => (
            <SelectItem
              key={i}
              value={currency}>
              {currency}
            </SelectItem>
          ))}
        </Select>
        {!isUsFormat && <Input
          {...iban}
          component={BankAccountInput}
          onChange={cleanIban}
          label="Bank account number (IBAN)"
          hint="where you want your money to be settled" />}
        {isUsFormat && <Input
          {...routingNumber}
          component={BankAccountInput}
          label="Routing number"
          hint="is normally found on a check provided by your bank" />}
        {isUsFormat && <Input
          {...accountNumber}
          component={BankAccountInput}
          label="Account number" />}
        <div className="field">
          <CheckBox {...isPrimary} label="Is primary bank account"/>
        </div>
      </form>
    </Confirm>
  );
};

AddBankAccount.propTypes = {
  fields: PropTypes.shape({
    iban: PropTypes.object.isRequired
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
