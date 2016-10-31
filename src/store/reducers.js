import {combineReducers} from 'redux';
import {routeParamsReducer as router} from 'react-router-redux-params';
import {reducer as form} from 'redux-form';
import authReducer, {stateKey as authKey} from 'modules/auth/reducer';
import userInfoReducer, {stateKey as userInfoKey} from '../modules/profile/reducer';
import messagesReducer, {stateKey as messagesKey} from 'modules/messages/reducer';
import modalsReducer, {stateKey as modalsKey} from 'modules/modals/reducer';
import {UNAUTH} from 'modules/auth/types';

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    // Add sync reducers here
    router,
    form,
    [authKey]: authReducer,
    [messagesKey]: messagesReducer,
    [userInfoKey]: userInfoReducer,
    [modalsKey]: modalsReducer,
    ...asyncReducers
  });

  // Clear state on sign out
  return (state, action) => {
    if (action.type === UNAUTH) {
      state = {router: state.router};
    }
    return appReducer(state, action);
  };
};

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
