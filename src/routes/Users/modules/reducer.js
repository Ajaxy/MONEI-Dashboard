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
      return mergeArrays(state, action.ids);
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
      return Object.assign({}, state, action.byId);
    case userTypes.FETCH_USER_SUCCESS:
    case userTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        [action.userId]: {
          ...state[action.userId],
          ...action.byId[action.userId],
          _isUpToDate: true
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

const page = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_USERS:
      return {
        current: 0,
        filter: null,
        lastLoaded: 0,
      };
    case types.FETCH_USERS_SUCCESS:
      const {start, end, total, length, limit, page, filter} = action;
      return {start, end, total, length, limit, filter,
        current: page,
        last: Math.ceil(total / (limit * 1.0)),
        lastLoaded: Math.max(state.lastLoaded || 0, end)
      };
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  page,
  isFetching
});

