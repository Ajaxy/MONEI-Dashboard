import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Validator from 'lib/validator';
import SettingsFormView from '../components/SettingsForm';
import {getIsInSandboxMode} from 'modules/profile/selectors';
import * as selectors from 'routes/Profile/routes/BankAccounts/modules/selectors';
import {fetchBankAccounts} from 'routes/Profile/routes/BankAccounts/modules/actions';

class SettingsForm extends Component {
  static propTypes = {
    fetchBankAccounts: PropTypes.func.isRequired,
    isInSandboxMode: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const {isInSandboxMode, fetchBankAccounts} = this.props;
    if (!isInSandboxMode) fetchBankAccounts();
  }

  render() {
    return (
      <SettingsFormView {...this.props} />
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

const mapStateToProps = state => {
  const isInSandboxMode = getIsInSandboxMode(state);
  const rules = {
    customName: 'required'
  };
  if (!isInSandboxMode) {
    rules.bankAccountId ='required';
  }
  return {
    bankAccounts: selectors.getBankAccounts(state),
    isFetching: selectors.getIsFetching(state),
    isInSandboxMode,
    validate: createValidator(rules)
  }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const bankAccount = stateProps.bankAccounts.find(a => a.isPrimary) || {};
  const props = {...stateProps, ...dispatchProps, ...ownProps};
  props.initialValues = {bankAccountId: bankAccount.id, ...props.initialValues};
  return props;
};

export default reduxForm({
  form: 'subAccountSettings',
  fields: ['customName', 'bankAccountId']
}, mapStateToProps, {fetchBankAccounts}, mergeProps)(SettingsForm);
