import * as types from './types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
export const stateKey = 'activeUser';

const isFetching = (state = true, action) => {
  switch (action.type) {
    case types.FETCH_USER_REQUEST:
      return true;
    case types.FETCH_USER_SUCCESS:
    case types.FETCH_USER_FAIL:
      return false;
    default:
      return state;
  }
};

const isUpdating = (state = false, action) => {
  switch (action.type) {
    case types.UPDATE_USER_REQUEST:
      return true;
    case types.UPDATE_USER_SUCCESS:
    case types.UPDATE_USER_FAIL:
      return false;
    default:
      return state;
  }
};

const isUpToDate = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_USER_SUCCESS:
      return true;
    case types.FETCH_USER_REQUEST:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  isUpdating,
  isUpToDate,
});

