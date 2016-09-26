// We only need to import the modules necessary for initial render
import CoreLayout from 'layouts/CoreLayout';
import HomeRoute from './Home';
import SignInRoute from './SignIn';
import CustomersRoute from './Customers';
import DashboardRoute from './Dashboard';
import TransactionsRoute from './Transactions';
import NotFoundRoute from './NotFound';

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: HomeRoute,
  childRoutes: [
    SignInRoute,
    CustomersRoute(store),
    DashboardRoute(store),
    TransactionsRoute(store),
    NotFoundRoute,
  ]
});

export default createRoutes;
