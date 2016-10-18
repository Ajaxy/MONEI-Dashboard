import {injectReducer} from 'store/reducers';
import Profile from './containers/ProfileContainer';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/profile',
    component: RequireAuth(Profile)
  };
};
