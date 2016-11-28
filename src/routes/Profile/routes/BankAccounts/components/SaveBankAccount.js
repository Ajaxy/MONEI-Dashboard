import React, {PropTypes} from 'react';
import Input from 'components/Input';
import CheckBoxInput from 'components/CheckBoxInput';
import Confirm from 'components/Modal/Confirm';
import {CURRENCIES} from 'lib/constants';
import Select, {SelectItem} from 'components/Select';
import cx from 'classnames';

const BankAccountInput = ({dirty, valid, value, name, onChange, onBlur, placeholder, disabled}) => (
  <div className="ui icon input">
    <input type="text" {...{value, name, onChange, onBlur, placeholder, disabled}} />
    {dirty && valid && <i className="check green icon" />}
  </div>
);

BankAccountInput.propTypes = {
  valid: PropTypes.bool,
  value: PropTypes.string,
  dirty: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool
};

const SaveBankAccount = ({
  forcePrimary,
  isOpen,
  isSaving,
  bankAccount,
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
  saveBankAccount,
  saveBankAccountCancel,
  countries
}) => {
  const onSubmit = (formProps) => {
    saveBankAccount({...bankAccount, ...formProps});
  };
  const onCancel = () => {
    saveBankAccountCancel();
    resetForm();
  };
  const cleanIban = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    iban.onChange(value);
  };
  const isNew = !bankAccount.id;
  return (
    <Confirm
      isOpen={isOpen}
      isLoading={isSaving}
      isDisabled={invalid}
      onCancel={onCancel}
      onConfirm={handleSubmit(onSubmit)}
      headerText={(isNew ? 'Add new' : 'Edit') + ' bank account'}
      confirmText="Save"
      confirmClass="positive">
      <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
        <Input {...name} />
        <Select
          {...country}
          disabled={!isNew}
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
          disabled={!isNew}
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
          disabled={!isNew}
          component={BankAccountInput}
          onChange={cleanIban}
          placeholder={new Array(21).join('•') + (bankAccount.last4Digits || '')}
          label="Bank account number (IBAN)"
          hint="where you want your money to be settled" />}
        {isUsFormat && <Input
          disabled={!isNew}
          {...routingNumber}
          component={BankAccountInput}
          label="Routing number"
          hint="is normally found on a check provided by your bank" />}
        {isUsFormat && <Input
          disabled={!isNew}
          {...accountNumber}
          component={BankAccountInput}
          label="Account number" />}
        <CheckBoxInput {...isPrimary} disabled={forcePrimary} label="Is primary bank account" />
      </form>
    </Confirm>
  );
};

SaveBankAccount.propTypes = {
  fields: PropTypes.shape({
    iban: PropTypes.object.isRequired,
    name: PropTypes.object.isRequired,
    isPrimary: PropTypes.object.isRequired,
    routingNumber: PropTypes.object.isRequired,
    accountNumber: PropTypes.object.isRequired,
    country: PropTypes.object.isRequired,
    currency: PropTypes.object.isRequired
  }),
  bankAccount: PropTypes.object,
  saveBankAccount: PropTypes.func.isRequired,
  saveBankAccountCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  forcePrimary: PropTypes.bool,
  isUsFormat: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired
};

export default SaveBankAccount;
