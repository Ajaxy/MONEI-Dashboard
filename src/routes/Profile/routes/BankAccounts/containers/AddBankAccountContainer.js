import {reduxForm, getValues} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import Validator from 'lib/validator';
import AddBankAccount from '../components/AddBankAccount';
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
    isAdding: selectors.getIsAdding(state),
    isOpen: selectors.getIsAddModalOpen(state),
    initialValues: {
      country
    },
    validate: createValidator(rules)
  };
};

export default reduxForm({
  form: 'addBankAccount',
  fields: [
    'name',
    'isPrimary',
    'iban',
    'routingNumber',
    'accountNumber',
    'country',
    'currency'
  ]
}, mapStateToProps, actions)(AddBankAccount);
