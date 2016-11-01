import {injectReducer} from 'store/reducers';
import Profile from './containers/ProfileContainer';
import OverviewRoute from './routes/Overview';
import SettingsRoute from './routes/Settings';
import RequireAuth from 'containers/RequireAuth';

export default (store) => ({
  path: '/profile',
  indexRoute: OverviewRoute,
  component: RequireAuth(Profile),
  childRoutes: [
    SettingsRoute(store)
  ]
});
