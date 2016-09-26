import HomeContainer from './containers/HomeContainer';
import RequireAuth from 'containers/RequireAuth';

// Sync route definition
export default {
  component: RequireAuth(HomeContainer)
};
