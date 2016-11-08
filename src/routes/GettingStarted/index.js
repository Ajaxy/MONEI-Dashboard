import GettingStarted from './containers/GettingStartedContainer';
import RequireAuth from 'containers/RequireAuth';

// Sync route definition
export default {
  path: 'getting-started',
  component: RequireAuth(GettingStarted)
};
