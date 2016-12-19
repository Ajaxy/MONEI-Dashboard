import {injectReducer} from 'store/reducers';
import Customer from './containers/CustomerContainer';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/customers/:customerId',
    component: RequireAuth(Customer),
    childRoutes: []
  };
};
