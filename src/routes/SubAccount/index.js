import SubAccount from './containers/SubAccountContainer';
import RequireAuth from 'containers/RequireAuth';
import OverviewRoute from './routes/Overview';

// Sync route definition
export default {
  path: '/sub-accounts/:subAccountId',
  component: RequireAuth(SubAccount),
  indexRoute: OverviewRoute,
  childRoutes: []
};
