import {reduxForm} from 'redux-form';
import PhoneEdit from '../components/PhoneEdit';
import {getProfile, getPhoneNumber, getIsPhoneVerified} from 'modules/profile/selectors';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';
import countries, {findByCode, findByPhone} from 'lib/countries';
import Validator from 'lib/validator';

const rules = {
  phoneNumber: 'phoneNumber'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

const getCountry = (phoneNumber, geoip) => {
  if (phoneNumber) {
    return findByPhone(phoneNumber);
  } else if (geoip) {
    return findByCode(geoip.country_code);
  }
  return {};
};

const mapStateToProps = (state) => {
  const profile = getProfile(state);
  const phoneNumber = getPhoneNumber(state);
  const country = getCountry(phoneNumber, profile.geoip);
  return {
    countries,
    isVerifying: selectors.getIsVerifying(state),
    isPhoneVerified: getIsPhoneVerified(state),
    currentPhoneNumber: phoneNumber,
    initialValues: {
      countryCode: country.phoneCode,
      phoneNumber
    }
  };
};

export default reduxForm({
  form: 'phoneEdit',
  fields: ['phoneNumber', 'countryCode'],
  validate
}, mapStateToProps, actions)(PhoneEdit);
