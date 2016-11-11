import {injectReducer} from 'store/reducers';
import SubAccounts from './containers/SubAccountsContainer';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/sub-accounts',
    component: RequireAuth(SubAccounts)
  };
};
