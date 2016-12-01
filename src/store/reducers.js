import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {routeParamsReducer as route} from 'react-router-redux-params';
import {reducer as form} from 'redux-form';
import authReducer, {stateKey as authKey} from 'modules/auth/reducer';
import userInfoReducer, {stateKey as userInfoKey} from '../modules/profile/reducer';
import messagesReducer, {stateKey as messagesKey} from 'modules/messages/reducer';
import {UNAUTH} from 'modules/auth/types';

export const makeRootReducer = (asyncReducers) => {
  const appReducer = combineReducers({
    // Add sync reducers here
    routing,
    route,
    form,
    [authKey]: authReducer,
    [messagesKey]: messagesReducer,
    [userInfoKey]: userInfoReducer,
    ...asyncReducers
  });

  // Clear state on sign out
  return (state, action) => {
    if (action.type === UNAUTH) {
      state = {routing: state.routing};
    }
    return appReducer(state, action);
  };
};

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
