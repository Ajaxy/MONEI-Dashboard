import * as types from './types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
export const stateKey = 'customers';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.CLEAR_CUSTOMERS:
      return [];
    case types.FETCH_CUSTOMERS_SUCCESS:
      return mergeArrays(state, action.ids);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_CUSTOMERS:
      return {};
    case types.FETCH_CUSTOMERS_SUCCESS:
      return Object.assign({}, state, action.byId);
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS_REQUEST:
      return true;
    case types.FETCH_CUSTOMERS_SUCCESS:
    case types.FETCH_CUSTOMERS_FAIL:
      return false;
    default:
      return state;
  }
};

const page = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_CUSTOMERS:
      return {nextPage: null, filter: null, lastItem: 0};
    case types.FETCH_CUSTOMERS_SUCCESS:
      const {nextPage, filter, length} = action;
      return {
        lastItem: state.lastItem + length,
        nextPage,
        filter
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

