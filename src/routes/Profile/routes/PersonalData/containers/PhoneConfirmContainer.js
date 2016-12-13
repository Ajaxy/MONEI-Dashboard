import {reduxForm} from 'redux-form';
import PhoneConfirm from '../components/PhoneConfirm';
import * as selectors from 'routes/Profile/modules/selectors';
import * as actions from 'routes/Profile/modules/actions';
import Validator from 'lib/validator';

const rules = {
  verificationCode: 'required|size:4'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

const mapStateToProps = (state) => ({
  isCheckingCode: selectors.getIsCheckingCode(state),
  currentPhoneNumber: selectors.getPhoneNumber(state)
});

export default reduxForm({
  form: 'phoneConfirm',
  fields: ['verificationCode'],
  validate
}, mapStateToProps, actions)(PhoneConfirm);
