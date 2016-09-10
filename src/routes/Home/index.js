import HomeView from './components/HomeView';
import RequireAuth from 'containers/RequireAuth';

// Sync route definition
export default {
  component: RequireAuth(HomeView)
};
