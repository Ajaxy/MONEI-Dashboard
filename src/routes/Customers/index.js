import {injectReducer} from 'store/reducers';
import Customers from './containers/CustomersContainer';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/customers',
    component: RequireAuth(Customers)
  };
};
