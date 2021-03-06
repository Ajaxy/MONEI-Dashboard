// We only need to import the modules necessary for initial render
import CoreLayout from 'layouts/CoreLayout';
import HomeRoute from './Home';
import SignInRoute from './SignIn';
import UserRoute from './User';
import UsersRoute from './Users';
import DashboardRoute from './Dashboard';
import CustomersRoute from './Customers';
import CustomerRoute from './Customer';
import TransactionsRoute from './Transactions';
import NewTransactionRoute from './NewTransaction';
import ProfileRoute from './Profile';
import SubAccountsRoute from './SubAccounts';
import SubAccountRoute from './SubAccount';
import GettingStartedRoute from './GettingStarted';
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
    CustomerRoute(store),
    DashboardRoute(store),
    NewTransactionRoute,
    TransactionsRoute(store),
    ProfileRoute(store),
    SubAccountsRoute(store),
    SubAccountRoute(store),
    GettingStartedRoute,
    NotFoundRoute
  ]
});

export default createRoutes;
