// We only need to import the modules necessary for initial render
import CoreLayout from 'layouts/CoreLayout';
import HomeRoute from './Home';
import SignInRoute from './SignIn';
import UserRoute from './User';
import UsersRoute from './Users';
import CustomersRoute from './Customers';
import DashboardRoute from './Dashboard';
import TransactionsRoute from './Transactions';
import ProfileRoute from './Profile';
import NotFoundRoute from './NotFound';

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: HomeRoute,
  childRoutes: [
    SignInRoute,
    UserRoute(store),
    UsersRoute(store),
    CustomersRoute(store),
    DashboardRoute(store),
    TransactionsRoute(store),
    ProfileRoute(store),
    NotFoundRoute,
  ]
});

export default createRoutes;
