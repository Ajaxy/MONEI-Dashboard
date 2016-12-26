import * as types from './types';
import * as userTypes from 'routes/User/modules/types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
export const stateKey = 'users';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.CLEAR_USERS:
      return [];
    case types.FETCH_USERS_SUCCESS:
      return action.ids || [];
    case userTypes.FETCH_USER_SUCCESS:
      return mergeArrays(state, [action.userId]);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_USERS:
      return {};
    case types.FETCH_USERS_SUCCESS:
      return action.byId || {};
    case userTypes.FETCH_USER_SUCCESS:
    case userTypes.UPDATE_USER_SUCCESS:
    case userTypes.VERIFY_USER_SUCCESS:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          ...action.byId[action.userId]
        }
      };
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_USERS_REQUEST:
      return true;
    case types.FETCH_USERS_SUCCESS:
    case types.FETCH_USERS_FAIL:
      return false;
    default:
      return state;
  }
};

const queryParams = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_USERS_SUCCESS:
      return {
        prevPage: action.prevPage,
        nextPage: action.nextPage,
        email: action.email
      };
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  queryParams,
  isFetching
});

