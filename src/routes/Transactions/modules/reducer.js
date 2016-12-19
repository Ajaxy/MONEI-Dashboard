import * as types from './types';
import {combineReducers} from 'redux';
import {isFailed, isIncome} from './utils';
export const stateKey = 'transactions';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.CLEAR_TRANSACTIONS:
      return [];
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return [...action.ids];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_TRANSACTIONS:
      return {};
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return {...action.byId};
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS_REQUEST:
      return true;
    case types.FETCH_TRANSACTIONS_SUCCESS:
    case types.FETCH_TRANSACTIONS_FAIL:
      return false;
    default:
      return state;
  }
};

const page = (state = {}, action) => {
  switch (action.type) {
    case types.CLEAR_TRANSACTIONS:
      return {};
    case types.FETCH_TRANSACTIONS_REQUEST:
      return Object.assign({}, state, {
        from: action.from,
        to: action.to
      });
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return {
        page: action.page,
        nextPage: action.nextPage,
        prevPage: action.prevPage,
        from: action.from,
        to: action.to
      };
    default:
      return state;
  }
};

const isDetailsModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.VIEW_TRANSACTIONS_START:
      return true;
    case types.VIEW_TRANSACTIONS_CANCEL:
      return false;
    default:
      return state;
  }
};

const transactionViewed = (state = null, action) => {
  switch (action.type) {
    case types.VIEW_TRANSACTIONS_START:
      return action.transactionId;
    case types.VIEW_TRANSACTIONS_CANCEL:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  page,
  isFetching,
  isDetailsModalOpen,
  transactionViewed
});

