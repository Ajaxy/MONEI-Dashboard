import React, {Component, PropTypes} from 'react'
import {reduxForm, getValues} from 'redux-form';
import UpdateMetaDataView from '../components/UpdateMetaData';
import {getProfile, getIsCompany, getIsVerificationRequested} from 'modules/profile/selectors';
import * as selectors from '../modules/selectors';
import * as actions from '../modules/actions';
import countries, {findByCode} from 'lib/countries';
import Validator from 'lib/validator';

class UpdateMetaData extends Component {
  componentWillReceiveProps(np) {
    this.props.validatePersonalData(!np.invalid)
  }

  componentDidMount() {
    this.props.validatePersonalData(!this.props.invalid)
  }

  render() {
    return (
      <UpdateMetaDataView {...this.props} />
    );
  }
}

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
  const isCompany = values.profile_type === 'company';
  const rules = {
    name: 'required',
    store_url: 'required',
    store_goods: 'required',
  };
  if (isCompany) {
    rules.vat_number = 'required';
    rules.company_name = 'required';
  }
  if (!isCompany) {
    rules.id_number = 'required';
  }
  return {
    countries,
    disabled: getIsVerificationRequested(state),
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
