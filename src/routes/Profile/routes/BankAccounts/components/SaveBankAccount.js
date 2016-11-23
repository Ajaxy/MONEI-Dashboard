import React, {PropTypes} from 'react';
import Input from 'components/Input';
import CheckBoxInput from 'components/CheckBoxInput';
import Confirm from 'components/Modal/Confirm';
import {CURRENCIES} from 'lib/constants';
import Select, {SelectItem} from 'components/Select';
import cx from 'classnames';

const BankAccountInput = ({dirty, valid, value, name, onChange, onBlur, placeholder}) => (
  <div className="ui icon input">
    <input type="text" {...{value, name, onChange, onBlur, placeholder}} />
    {dirty && valid && <i className="check green icon" />}
  </div>
);

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
  return (
    <Confirm
      isOpen={isOpen}
      isLoading={isSaving}
      isDisabled={invalid}
      onCancel={onCancel}
      onConfirm={handleSubmit(onSubmit)}
      headerText={(bankAccount.id ? 'Edit' : 'Add new') + ' bank account'}
      confirmText="Save"
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
          placeholder={new Array(21).join('•') + (bankAccount.last4Digits || '')}
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
        <CheckBoxInput {...isPrimary} disabled={forcePrimary} label="Is primary bank account"/>
      </form>
    </Confirm>
  );
};

SaveBankAccount.propTypes = {
  fields: PropTypes.shape({
    iban: PropTypes.object.isRequired
  }),
  bankAccount: PropTypes.object,
  saveBankAccount: PropTypes.func.isRequired,
  saveBankAccountCancel: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  forcePrimary: PropTypes.bool
};

export default SaveBankAccount;
