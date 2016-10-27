import {injectReducer} from 'store/reducers';
import Channel from './containers/ChannelContainer';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/channels/:channelId/:currentTab',
    component: RequireAuth(Channel)
  };
};
