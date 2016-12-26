import {injectReducer} from 'store/reducers';
import Transactions from './containers/TransactionsContainer';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: 'transactions',
    component: Transactions
  };
};
