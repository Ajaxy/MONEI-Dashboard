import * as types from './types';
import {combineReducers} from 'redux';
export const stateKey = 'customerTransactions';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.CLEAR_C_TRANSACTIONS:
      return [];
    case types.FETCH_C_TRANSACTIONS_SUCCESS:
      return [...action.ids];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_C_TRANSACTIONS:
      return {};
    case types.FETCH_C_TRANSACTIONS_SUCCESS:
      return {...action.byId};
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_C_TRANSACTIONS_REQUEST:
      return true;
    case types.FETCH_C_TRANSACTIONS_SUCCESS:
    case types.FETCH_C_TRANSACTIONS_FAIL:
      return false;
    default:
      return state;
  }
};

const page = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_C_TRANSACTIONS_SUCCESS:
      return {
        nextPage: action.nextPage,
        prevPage: action.prevPage
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

