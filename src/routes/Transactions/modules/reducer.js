import * as types from './types';
import * as transactionTypes from 'routes/Transactions/modules/types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
export const stateKey = 'transactions';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return [...action.ids];
    case types.CREATE_TRANSACTION_SUCCESS:
    case types.DUPLICATE_TRANSACTION_SUCCESS:
    case transactionTypes.FETCH_TRANSACTION_SUCCESS:
      return mergeArrays(state, [action.transactionId]);
    case types.DELETE_TRANSACTION_SUCCESS:
      let index = state.indexOf(action.transactionId);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return {...action.byId};
    case types.CREATE_TRANSACTION_SUCCESS:
    case types.DUPLICATE_TRANSACTION_SUCCESS:
    case transactionTypes.FETCH_TRANSACTION_SUCCESS:
    case transactionTypes.UPDATE_TRANSACTION_SUCCESS:
    case transactionTypes.TRANSACTION_REPORT_SUCCESS:
    case transactionTypes.SEND_TRANSACTION_SUCCESS:
      return {
        ...state,
        [action.transactionId]: {
          ...state[action.transactionId],
          ...action.byId[action.transactionId],
          _isUpToDate: true
        }
      };
    case types.DELETE_TRANSACTION_SUCCESS:
      const newState = {...state};
      delete newState[action.transactionId];
      return newState;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.DUPLICATE_TRANSACTION_REQUEST:
    case types.FETCH_TRANSACTIONS_REQUEST:
      return true;
    case types.FETCH_TRANSACTIONS_SUCCESS:
    case types.FETCH_TRANSACTIONS_FAIL:
    case types.DUPLICATE_TRANSACTION_SUCCESS:
    case types.DUPLICATE_TRANSACTION_FAIL:
      return false;
    default:
      return state;
  }
};

const isDeleting = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_TRANSACTION_REQUEST:
      return true;
    case types.DELETE_TRANSACTION_SUCCESS:
    case types.DELETE_TRANSACTION_FAIL:
    case types.FETCH_TRANSACTIONS_SUCCESS:
    case types.FETCH_TRANSACTIONS_FAIL:
      return false;
    default:
      return state;
  }
};

const isCreating = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_TRANSACTION_REQUEST:
      return true;
    case types.CREATE_TRANSACTION_SUCCESS:
    case types.CREATE_TRANSACTION_FAIL:
      return false;
    default:
      return state;
  }
};

const transactionToDelete = (state = null, action) => {
  switch (action.type) {
    case types.DELETE_TRANSACTION_START:
      return action.transactionId;
    case types.DELETE_TRANSACTION_SUCCESS:
    case types.DELETE_TRANSACTION_CANCEL:
      return null;
    default:
      return state;
  }
};

const isDeleteModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_TRANSACTION_START:
      return true;
    case types.DELETE_TRANSACTION_SUCCESS:
    case types.DELETE_TRANSACTION_FAIL:
    case types.DELETE_TRANSACTION_CANCEL:
      return false;
    default:
      return state;
  }
};

const isUpToDate = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return true;
    case types.REQUEST_TRANSACTIONS_FETCH:
      return false;
    default:
      return state;
  }
};

const pages = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_TRANSACTIONS_SUCCESS:
      return {
        prevPage: action.prevPage,
        nextPage: action.nextPage
      };
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  pages,
  transactionToDelete,
  isUpToDate,
  isFetching,
  isDeleting,
  isCreating,
  isDeleteModalOpen
});

