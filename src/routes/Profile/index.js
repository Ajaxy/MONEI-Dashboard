import Profile from './containers/ProfileContainer';
import OverviewRoute from './routes/Overview';
import SettingsRoute from './routes/Settings';
import ShopifyStoreRoute from './routes/ShopifyStore';
import PersonalDataRoute from './routes/PersonalData';
import BankAccountsRoute from './routes/BankAccounts';
import RequireAuth from 'containers/RequireAuth';

export default (store) => ({
  path: '/profile',
  indexRoute: OverviewRoute,
  component: RequireAuth(Profile),
  childRoutes: [
    SettingsRoute,
    PersonalDataRoute(store),
    BankAccountsRoute(store),
    ShopifyStoreRoute
  ]
});
