import {reduxForm} from 'redux-form';
import UpdateMetaData from '../components/UpdateMetaData';
import {getProfile, getIsCompany} from 'modules/profile/selectors';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';
import countries, {findByCode} from 'lib/countries';
import Validator from 'lib/validator';

const createValidator = (rules) => {
  return values => {
    const validator = new Validator(values, rules);
    validator.passes();
    return validator.errors.all();
  };
};

const mapStateToProps = (state) => {
  const profile = getProfile(state);
  const country = findByCode(profile.geoip.country_code).name;
  const rules = {
    name: 'required'
  };
  return {
    countries,
    isUpdatingMetaData: selectors.getIsUpdatingMetaData(state),
    isCompany: getIsCompany(state),
    initialValues: {
      country,
      profile_type: 'individual',
      ...profile.user_metadata
    },
    validate: createValidator(rules)
  };
};

export default reduxForm({
  form: 'updateMetaData',
  fields: [
    'name',
    'profile_type',
    'country',
    'company_name',
    'vat_number',
    'id_number',
    'store_url',
    'store_goods',
    'isHintsDisabled'
  ]
}, mapStateToProps, actions)(UpdateMetaData);
