import PersonalData from './containers/PersonalDataContainer';
import {injectReducer} from 'store/reducers';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    component: PersonalData
  };
};
