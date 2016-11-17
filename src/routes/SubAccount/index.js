import {injectReducer} from 'store/reducers';
import SubAccount from './containers/SubAccountContainer';
import RequireAuth from 'containers/RequireAuth';
import OverviewRoute from './routes/Overview';
import GuidesRoute from './routes/Guides';
import ZapierRoute from './routes/Zapier';
import WebhooksRoute from './routes/Webhooks';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/sub-accounts/:subAccountId',
    component: RequireAuth(SubAccount),
    indexRoute: OverviewRoute,
    childRoutes: [
      GuidesRoute,
      ZapierRoute,
      WebhooksRoute(store)
    ]
  };
};
