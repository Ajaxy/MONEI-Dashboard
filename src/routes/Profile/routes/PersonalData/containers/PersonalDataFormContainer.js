import {reduxForm, getValues} from 'redux-form';
import UpdateMetaDataView from '../components/PersonalDataForm';
import * as selectors from 'modules/profile/selectors';
import * as actions from 'modules/profile/actions';
import countries, {findByCode} from 'lib/countries';
import Validator from 'lib/validator';

const rules = {
  storeUrl: 'url',
  idNumber: 'min:5'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

const mapStateToProps = (state) => {
  const profile = selectors.getProfile(state);
  const country = findByCode(profile.geoip.country_code).name;
  const values = getValues(state.form.personalData) || {};

  return {
    countries,
    disabled: selectors.getIsVerificationRequested(state) || selectors.getIsVerified(state),
    isUpdating: selectors.getIsUpdating(state),
    isCompany: selectors.getIsCompany(state),
    initialValues: {
      country,
      profileType: 'individual',
      ...profile,
      ...values
    }
  };
};

export default reduxForm({
  form: 'personalData',
  fields: [
    'name',
    'profileType',
    'country',
    'companyName',
    'idNumber',
    'storeUrl',
    'storeGoods'
  ],
    validate
}, mapStateToProps, actions)(UpdateMetaDataView);
