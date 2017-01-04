import {reduxForm} from 'redux-form';
import {getActiveSubAccount} from 'routes/SubAccounts/modules/selectors';
import {getUserId} from 'modules/profile/selectors';
import Validator from 'lib/validator';
import WidgetView from '../components/WidgetView';

const DEFAULT_CURRENCY = 'eur';

const rules = {
  amount: 'required|integer|min:1',
  redirectUrl: 'required|url'
};

const validate = values => {
  const validator = new Validator(values, rules);
  validator.passes();
  return validator.errors.all();
};

const mapStateToProps = (state) => {
  const subAccount = getActiveSubAccount(state);
  const {commercialConditions} = subAccount;
  return {
    userId: getUserId(state),
    subAccountId: subAccount.id,
    currency: commercialConditions && commercialConditions.currency
      ? commercialConditions.currency.toLowerCase()
      : DEFAULT_CURRENCY
  };
};

export default reduxForm({
  form: 'widgetSetup',
  fields: ['redirectUrl', 'amount'],
  initialValues: {
    amount: 100,
    redirectUrl: 'http://yoursite.com/monei-callback'
  },
  validate
}, mapStateToProps)(WidgetView);
