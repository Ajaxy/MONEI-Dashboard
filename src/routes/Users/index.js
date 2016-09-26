import {injectReducer} from 'store/reducers';
import Users from './containers/UsersContainer';
import RequireAuth from 'containers/RequireAuth';
import RequireAdmin from 'containers/RequireAdmin';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/users',
    component: RequireAuth(RequireAdmin(Users))
  };
};
