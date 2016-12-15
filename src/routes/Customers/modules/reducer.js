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
      return {...state, ...action.byId};
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

const params = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_CUSTOMERS_SUCCESS:
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
  params,
  isFetching
});

