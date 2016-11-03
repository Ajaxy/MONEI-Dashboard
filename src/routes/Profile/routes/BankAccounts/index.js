import BankAccounts from './containers/BankAccountsContainer';
import {injectReducer} from 'store/reducers';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: 'bank-accounts',
    component: BankAccounts
  };
};
