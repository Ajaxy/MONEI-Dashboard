import {injectReducer} from 'store/reducers';
import User from './containers/UserContainer';
import RequireAuth from 'containers/RequireAuth';
import RequireAdmin from 'containers/RequireAdmin';
import OverviewRoute from './routes/Overview';
import SettingsRoute from './routes/Settings';
import SubAccountsRoute from './routes/SubAccounts';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/users/:userId',
    indexRoute: OverviewRoute,
    component: RequireAuth(RequireAdmin(User)),
    childRoutes: [
      SettingsRoute,
      SubAccountsRoute(store)
    ]
  };
};
