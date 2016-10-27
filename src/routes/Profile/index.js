import {injectReducer} from 'store/reducers';
import Profile from './containers/ProfileContainer';
import OverviewRoute from './routes/Overview';
import RequireAuth from 'containers/RequireAuth';

export default {
  path: '/profile',
  indexRoute: OverviewRoute,
  component: RequireAuth(Profile),
  childRoutes: []
};
