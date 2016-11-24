import React, {Component, PropTypes} from 'react';
import ChangePhoneView from '../components/ChangePhoneView';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';

class ChangePhoneForm extends Component {
  submitForm = ({phoneNumber}) => {
    const {verifyPhoneNumber} = this.props;
    return new Promise(async (resolve, reject) => {
      if (!phoneNumber) {
        return reject({phoneNumber: 'Required'});
      } else if (!/^\+\d{10,14}$/.test(phoneNumber)) {
        return reject({phoneNumber: 'Phone number should have at least 10 digits and starts with +'});
      }
      await verifyPhoneNumber(phoneNumber);
      resolve();
    });
  };

  render() {
    return <ChangePhoneView {...this.props} onSubmit={this.submitForm} />;
  }
}

const mapStateToProps = (state) => ({
  initialValues: {
    phoneNumber: profileSelectors.getPhoneNumber(state)
  },
  isUpdating: selectors.getIsRequestingPhoneVerification(state)
});

export default reduxForm({
  form: 'verifyPhoneNumber',
  fields: ['phoneNumber']
}, mapStateToProps, actions)(ChangePhoneForm);
