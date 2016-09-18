import {injectReducer} from 'store/reducers';
import Dashboard from './containers/DashboardContainer';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/dashboard',
    component: RequireAuth(Dashboard)
  };
};
