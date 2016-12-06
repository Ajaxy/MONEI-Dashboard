import * as types from './types';
import {combineReducers} from 'redux';
import {isTokenExpired} from 'lib/jwt';
import storage from 'store';

export const stateKey = 'auth';

const token = storage.get('authToken');
const isAuthenticatedState = !!token && !isTokenExpired(token);
const isAuthenticated = (state = isAuthenticatedState, action) => {
  switch (action.type) {
    case types.AUTH_SUCCESS:
      return true;
    case types.UNAUTH:
    case types.AUTH_FAIL:
      return false;
    default:
      return state;
  }
};

const isAuthenticating = (state = false, action) => {
  switch (action.type) {
    case types.AUTH_REQUEST:
      return true;
    case types.AUTH_FAIL:
    case types.AUTH_SUCCESS:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isAuthenticated,
  isAuthenticating
});
