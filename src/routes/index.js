// We only need to import the modules necessary for initial render
import CoreLayout from 'layouts/CoreLayout';
import HomeRoute from './Home';
import SignInRoute from './SignIn';
import UserRoute from './User';
import UsersRoute from './Users';
import DashboardRoute from './Dashboard';
import CustomersRoute from './Customers';
import TransactionsRoute from './Transactions';
import OnboardingRoute from './Onboarding';
import ProfileRoute from './Profile';
import ChannelRoute from './Channel';
import ChannelsRoute from './Channels';
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
    OnboardingRoute(store),
    ProfileRoute(store),
    ChannelRoute(store),
    ChannelsRoute(store),
    NotFoundRoute,
  ]
});

export default createRoutes;
