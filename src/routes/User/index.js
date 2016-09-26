import {injectReducer} from 'store/reducers';
import User from './containers/UserContainer';
import RequireAuth from 'containers/RequireAuth';
import RequireAdmin from 'containers/RequireAdmin';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/users/:userId',
    component: RequireAuth(RequireAdmin(User))
  };
};
