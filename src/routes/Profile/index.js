import {injectReducer} from 'store/reducers';
import Profile from './containers/ProfileContainer';
import SettingsRoute from './routes/Settings';
import ShopifyStoreRoute from './routes/ShopifyStore';
import PersonalDataRoute from './routes/PersonalData';
import BankAccountsRoute from './routes/BankAccounts';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/profile',
    indexRoute: PersonalDataRoute(store),
    component: RequireAuth(Profile),
    childRoutes: [
      SettingsRoute,
      BankAccountsRoute(store),
      ShopifyStoreRoute
    ]
  }
};
