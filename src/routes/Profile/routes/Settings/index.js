import Settings from './containers/SettingsContainer';
import {injectReducer} from 'store/reducers';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: 'settings',
    component: Settings
  };
};
