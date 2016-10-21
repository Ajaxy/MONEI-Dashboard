import {injectReducer} from 'store/reducers';
import Onboarding from './containers/OnboardingContainer';
import RequireAuth from 'containers/RequireAuth';
import reducer, {stateKey} from './modules/reducer';

export default (store) => {
  injectReducer(store, {key: stateKey, reducer});
  return {
    path: '/onboarding',
    component: RequireAuth(Onboarding),
    isPlain: true
  };
};
