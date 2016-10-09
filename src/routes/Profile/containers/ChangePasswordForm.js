import React, {Component, PropTypes} from 'react';
import ChangePasswordView from '../components/ChangePasswordView';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import Modal from 'components/Modal';

const MIN_PASSWORD_LENGTH = 8;

class ChangePasswordForm extends Component {
  submitForm = ({newPassword, confirmPassword}) => {
    const {user, resetForm, resetPassword} = this.props;
    return new Promise(async (resolve, reject) => {
      if (!newPassword) {
        return reject({newPassword: 'Required'});
      } else if (newPassword.length < MIN_PASSWORD_LENGTH) {
        return reject({newPassword: `Must be atleast ${MIN_PASSWORD_LENGTH} long`});
      }
      if (!confirmPassword) {
        return reject({confirmPassword: 'Required'});
      } else if(newPassword != confirmPassword) {
        return reject({confirmPassword: 'Passwords do not match'});
      }
      await resetPassword(user.email, newPassword)
      resetForm();
      resolve();
    });
  };

  render() {
    return <ChangePasswordView {...this.props} onSubmit={this.submitForm}/>;
  }
}

ChangePasswordForm.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  initialValues: {
    newPassword: '',
    confirmPassword: '',
  },
  isUpdating: selectors.getIsChangingPassword(state),
});

export default reduxForm({
  form: 'change-password',
  fields: ['newPassword', 'confirmPassword'],
}, mapStateToProps, actions)(ChangePasswordForm);
