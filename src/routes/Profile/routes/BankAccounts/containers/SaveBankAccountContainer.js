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

const mapStateToProps = (state) => {
  const values = getValues(state.form.addBankAccount) || {};
  const profile = getProfile(state);
  const country = findByCode(profile.geoip.country_code).name;
  const bankAccount = selectors.getActiveBankAccount(state);
  let isUsFormat = false;
  const rules = {
    name: 'required',
    country: 'required',
    currency: 'required'
  };
  if (values.country === 'Spain') {
    rules.iban = 'required|iban';
  }
  if (values.country === 'United States') {
    rules.routingNumber = 'required|routingNumber';
    rules.accountNumber = 'required|accountNumber';
    isUsFormat = true;
  }
  return {
    countries,
    isUsFormat,
    bankAccount,
    isSaving: selectors.getIsSaving(state),
    isOpen: selectors.getIsSaveModalOpen(state),
    initialValues: {country, ...bankAccount},
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
