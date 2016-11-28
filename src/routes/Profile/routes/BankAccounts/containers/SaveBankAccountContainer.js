import {reduxForm, getValues} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import Validator from 'lib/validator';
import SaveBankAccount from '../components/SaveBankAccount';
import {getProfile} from 'modules/profile/selectors';
import countries, {findByCode} from 'lib/countries';

const createValidator = (rules) => {
  return values => {
    const validator = new Validator(values, rules);
    validator.passes();
    return validator.errors.all();
  };
};

const mapStateToProps = (state, ownProps) => {
  const values = getValues(state.form.saveBankAccount) || {};
  const profile = getProfile(state);
  const country = findByCode(profile.geoip.country_code).name;
  const bankAccount = selectors.getActiveBankAccount(state);
  const bankAccounts = selectors.getBankAccounts(state);
  const isNew = !bankAccount.id;
  Validator.register(
    'isPrimary',
    value => value && !bankAccounts.some(a => a.isPrimary && a.id !== bankAccount.id) || !value,
    'You can have only one primary bank account'
  );
  let isUsFormat = false;
  const rules = {
    name: 'required',
    country: 'required',
    currency: 'required',
    isPrimary: 'isPrimary'
  };
  if (values.country === 'Spain') {
    rules.iban = 'iban';
    if (isNew) rules.iban += '|required'
  }
  if (values.country === 'United States') {
    rules.routingNumber = 'routingNumber';
    rules.accountNumber = 'accountNumber';
    if (isNew) {
      rules.routingNumber += '|required';
      rules.accountNumber += '|required';
    }
    isUsFormat = true;
  }
  return {
    countries,
    isUsFormat,
    bankAccount,
    isSaving: selectors.getIsSaving(state),
    isOpen: selectors.getIsSaveModalOpen(state),
    initialValues: {country, ...bankAccount, ...ownProps.initialValues},
    validate: createValidator(rules)
  };
};

export default reduxForm({
  form: 'saveBankAccount',
  fields: [
    'name',
    'isPrimary',
    'iban',
    'routingNumber',
    'accountNumber',
    'country',
    'currency'
  ]
}, mapStateToProps, actions)(SaveBankAccount);
