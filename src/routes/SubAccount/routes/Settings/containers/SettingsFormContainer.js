import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import Validator from 'lib/validator';
import SettingsFormView from '../components/SettingsForm';
import * as selectors from 'routes/Profile/routes/BankAccounts/modules/selectors';
import {fetchBankAccounts} from 'routes/Profile/routes/BankAccounts/modules/actions';

class SettingsForm extends Component {
  static propTypes = {
    fetchSubAccounts: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchBankAccounts()
  }

  render() {
    return (
      <SettingsFormView {...this.props} />
    );
  }
}

const rules = {
  customName: 'required',
  bankAccountId: 'required'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

const mapStateToProps = (state, props) => ({
  bankAccounts: selectors.getBankAccounts(state),
  isFetching: selectors.getIsFetching(state)
});

export default reduxForm({
  form: 'SubAccountSettings',
  fields: ['customName', 'bankAccountId'],
  validate
}, mapStateToProps, {fetchBankAccounts})(SettingsForm);
