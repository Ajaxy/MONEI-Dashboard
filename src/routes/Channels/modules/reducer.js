import * as types from './types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
export const stateKey = 'channels';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_CHANNELS_REQUEST:
      return [];
    case types.FETCH_CHANNELS_SUCCESS:
      return mergeArrays(state, action.ids);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_CHANNELS_REQUEST:
      return {};
    case types.FETCH_CHANNELS_SUCCESS:
      return Object.assign({}, state, action.byId);
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_CHANNELS_REQUEST:
      return true;
    case types.FETCH_CHANNELS_SUCCESS:
    case types.FETCH_CHANNELS_FAIL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  isFetching
});

