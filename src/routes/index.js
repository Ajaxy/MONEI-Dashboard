// We only need to import the modules necessary for initial render
import MaterialLayout from 'layouts/MaterialLayout';
import HomeRoute from './Home';
import SignInRoute from './SignIn';

export const createRoutes = (store) => ({
  path: '/',
  component: MaterialLayout,
  indexRoute: HomeRoute,
  childRoutes: [
    SignInRoute,
  ]
});

export default createRoutes;
