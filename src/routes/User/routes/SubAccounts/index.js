import {injectReducer} from 'store/reducers';
import reducer, {stateKey} from './modules/reducer';
import SubAccounts from './containers/SubAccountsContainer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: 'sub-accounts',
    component: SubAccounts
  };
};
