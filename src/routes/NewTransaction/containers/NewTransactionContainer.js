import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import NewTransactionView from '../components/NewTransactionView';
import * as selectors from 'routes/SubAccounts/modules/selectors';
import * as actions from 'routes/SubAccounts/modules/actions';
import {getUserId} from 'modules/profile/selectors';
import Validator from 'lib/validator';

const DEFAULT_CURRENCY = 'eur';

class NewTransaction extends Component {
  static propTypes = {
    fetchSubAccounts: PropTypes.func.isRequired,
    isUpToDate: PropTypes.bool.isRequired,
    values: PropTypes.object.isRequired,
    subAccountById: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {isUpToDate, fetchSubAccounts} = this.props;
    !isUpToDate && fetchSubAccounts();
  }

  render() {
    const {values, subAccountById} = this.props;
    const {commercialConditions} = subAccountById[values.subAccountId] || {};
    const currency = commercialConditions && commercialConditions.currency
      ? commercialConditions.currency.toLowerCase()
      : DEFAULT_CURRENCY;
    return (
      <NewTransactionView {...this.props} currency={currency} />
    );
  }
}

const rules = {
  amount: 'required|integer',
  subAccountId: 'required'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

const mapStateToProps = (state) => {
  const subAccounts = selectors.getSubAccounts(state);
  const defaultSubAccount = subAccounts[0] || {};
  return {
    subAccounts,
    subAccountById: selectors.getSubAccountById(state),
    isUpToDate: selectors.getIsUpToDate(state),
    userId: getUserId(state),
    isFetchingSubAccounts: selectors.getIsFetching(state),
    initialValues: {
      amount: 100,
      subAccountId: defaultSubAccount.id
    }
  };
};

export default reduxForm({
  form: 'newTransaction',
  fields: ['subAccountId', 'amount'],
  validate
}, mapStateToProps, actions)(NewTransaction);
