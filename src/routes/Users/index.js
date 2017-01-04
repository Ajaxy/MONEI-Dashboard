import {injectReducer} from 'store/reducers';
import RequireAuth from 'containers/RequireAuth';
import RequireAdmin from 'containers/RequireAdmin';

export default (store) => {
  return {
    path: '/users',
    getComponent(nextState, cb) {
      require.ensure([], require => {
        const Component = require('./containers/UsersContainer').default;
        const reducer = require('./modules/reducer').default;
        const key = require('./modules/reducer').stateKey;
        injectReducer(store, {key, reducer});
        cb(null, RequireAuth(RequireAdmin(Component)))
      }, 'users')
    }
  };
};
