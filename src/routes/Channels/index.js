import {injectReducer} from 'store/reducers';
import Channels from './containers/ChannelsContainer';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/channels',
    component: RequireAuth(Channels)
  };
};
