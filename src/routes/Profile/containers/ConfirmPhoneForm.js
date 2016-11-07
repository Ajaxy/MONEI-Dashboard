import React, {Component, PropTypes} from 'react';
import ConfirmPhoneView from '../components/ConfirmPhoneView';
import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import Modal from 'components/Modal';
import Button from 'components/Button';

class ConfirmPhoneForm extends Component {
  submitForm = ({verificationCode}) => {
    const {phoneNumber, resetForm, checkPhoneNumber} = this.props;
    return new Promise(async (resolve, reject) => {
      if (!verificationCode) {
        return reject({verificationCode: 'Please enter the code we\'ve sent you by SMS'});
      }
      await checkPhoneNumber(phoneNumber, verificationCode);
      resetForm();
      resolve();
    });
  };

  render() {
    const {isOpen, closeCheckingModal} = this.props;
    return (
      <Modal isOpen={isOpen} size="small">
        <div className="header">Please enter the code we've sent you by SMS</div>
        <div className="content">
          <div className="ui basic segment">
            <ConfirmPhoneView {...this.props} onSubmit={this.submitForm} />
          </div>
        </div>
        <div className="actions">
          <Button onClick={closeCheckingModal}>Close</Button>
        </div>
      </Modal>
    );
  }
}

ConfirmPhoneForm.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  initialValues: {
    verificationCode: ''
  },
  isOpen: selectors.getIsCheckingModalVisible(state),
  isUpdating: selectors.getIsCheckingPhoneVerification(state),
  phoneNumber: selectors.getPhoneNumberToCheck(state)
});

export default reduxForm({
  form: 'confirm-phone-number',
  fields: ['verificationCode']
}, mapStateToProps, actions)(ConfirmPhoneForm);
