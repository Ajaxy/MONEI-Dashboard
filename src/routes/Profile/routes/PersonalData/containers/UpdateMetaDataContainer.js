import {reduxForm, getValues} from 'redux-form';
import UpdateMetaDataView from '../components/UpdateMetaData';
import {getProfile, getIsCompany, getIsVerificationRequested, getIsVerified} from 'modules/profile/selectors';
import {updateProfileLocally} from 'modules/profile/actions';
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
  const values = getValues(state.form.updateMetaData) || {};
  const rules = {
    store_url: 'url',
    id_number: 'min:5',
    vat_number: 'min:5'
  };
  return {
    countries,
    disabled: getIsVerificationRequested(state) || getIsVerified(state),
    isUpdatingMetaData: selectors.getIsUpdatingMetaData(state),
    isCompany: getIsCompany(state),
    initialValues: {
      country,
      profile_type: 'individual',
      ...profile.user_metadata,
      ...values
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
},
  mapStateToProps,
  {...actions, updateProfileLocally}
)(UpdateMetaDataView);
