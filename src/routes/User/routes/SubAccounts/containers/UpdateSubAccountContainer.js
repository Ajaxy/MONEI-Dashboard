import {reduxForm} from 'redux-form';
import * as actions from '../modules/actions';
import UpdateSubAccount from '../components/UpdateSubAccount';
import * as selectors from '../modules/selectors';
import Validator from 'validatorjs';
import dot from 'dot-object';

const rules = {
  commercialConditions: {
    europeCardRate: 'required|numeric',
    nonEuropeCardRate: 'required|numeric',
    fixEuropeRate: 'required|numeric',
    fixNonEuropeRate: 'required|numeric',
    currency: 'required'
  }
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return dot.object(validator.errors.all());
};

const mapStateToProps = (state, props) => {
  const subAccount = selectors.getActiveSubAccount(state);
  return {
    userId: props.userId,
    subAccount,
    initialValues: subAccount,
    isOpen: selectors.getIsUpdateModalOpen(state),
    isUpdating: selectors.getIsUpdatingSubAccount(state)
  };
};

export default reduxForm({
  form: 'editUserSubAccount',
  fields: [
    'commercialConditions.europeCardRate',
    'commercialConditions.nonEuropeCardRate',
    'commercialConditions.fixEuropeRate',
    'commercialConditions.fixNonEuropeRate',
    'commercialConditions.currency',
    'acquirer'
  ],
  validate
}, mapStateToProps, actions)(UpdateSubAccount);
