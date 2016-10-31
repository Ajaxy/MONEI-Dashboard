import React, {Component, PropTypes} from 'react';
import GeneralDataView from '../components/GeneralDataView';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';

class GeneralDataForm extends Component {
  submitForm = ({name, profile_type, country}) => {
    const {verifyPhoneNumber} = this.props;
    return new Promise(async (resolve, reject) => {
      const {user, updateProfile, goToNextStep} = this.props;
      const user_metadata = Object.assign({}, user.user_metadata, {name, profile_type, country});
      const success = await updateProfile(user.user_id, {user_metadata});
      if (success) goToNextStep();
    });
  };

  render() {
    return <GeneralDataView {...this.props} onSubmit={this.submitForm} />;
  }
}

const mapStateToProps = (state) => ({
  initialValues: {
    name: profileSelectors.getName(state),
    profile_type: profileSelectors.getProfileType(state),
    country: profileSelectors.getCountry(state),
  },
  isModifying: profileSelectors.getIsModifying(state),
});

export default reduxForm({
  form: 'onboarding-general-data',
  fields: ['name', 'profile_type', 'country'],
}, mapStateToProps, actions)(GeneralDataForm);
