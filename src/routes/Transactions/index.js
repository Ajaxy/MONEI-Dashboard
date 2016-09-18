import {injectReducer} from 'store/reducers';
import Transactions from './containers/TransactionsContainer';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/transactions',
    component: RequireAuth(Transactions)
  };
};
