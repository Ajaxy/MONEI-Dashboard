import Profile from './containers/ProfileContainer';
import OverviewRoute from './routes/Overview';
import SettingsRoute from './routes/Settings';
import BankAccountsRoute from './routes/BankAccounts';
import RequireAuth from 'containers/RequireAuth';

export default (store) => ({
  path: '/profile',
  indexRoute: OverviewRoute,
  component: RequireAuth(Profile),
  childRoutes: [
    SettingsRoute(store),
    BankAccountsRoute(store)
  ]
});
