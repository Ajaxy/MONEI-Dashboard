import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getActiveSubAccount} from 'routes/SubAccounts/modules/selectors';
import WidgetView from '../components/WidgetView';

const DEFAULT_CURRENCY = 'eur';

class Overview extends Component {
  render() {
    return (
      <WidgetView {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  const subAccount = getActiveSubAccount(state);
  const {commercialConditions} = subAccount;

  return {
    userId: subAccount.login,
    channelId: subAccount.id,
    currency: commercialConditions && commercialConditions.currency ?
      commercialConditions.currency.toLowerCase() :
      DEFAULT_CURRENCY
  };
};

export default connect(mapStateToProps)(Overview);
