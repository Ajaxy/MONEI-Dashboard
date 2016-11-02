import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import Validator from 'lib/validator';
import AddBankAccount from '../components/AddBankAccount';

const mapStateToProps = (state, ownProps) => ({
  isAdding: selectors.getIsAdding(state),
  isOpen: selectors.getIsAddModalOpen(state)
});

const rules = {
  number: 'required|iban'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

export default reduxForm({
  form: 'addBankAccount',
  fields: ['number'],
  validate
}, mapStateToProps, actions)(AddBankAccount);
