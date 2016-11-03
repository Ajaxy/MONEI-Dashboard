import * as types from './types';
import {combineReducers} from 'redux';
import {mergeArrays} from 'lib/utils';

export const stateKey = 'profileBankAccounts';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_BANK_ACCOUNTS_SUCCESS:
      return [...action.ids];
    case types.ADD_BANK_ACCOUNT_SUCCESS:
      return mergeArrays(state, [action.bankAccountId]);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_BANK_ACCOUNTS_SUCCESS:
      return {...action.byId};
    case types.ADD_BANK_ACCOUNT_SUCCESS:
      return {...state, ...action.byId};
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_BANK_ACCOUNTS_REQUEST:
      return true;
    case types.FETCH_BANK_ACCOUNTS_SUCCESS:
    case types.FETCH_BANK_ACCOUNTS_FAIL:
      return false;
    default:
      return state;
  }
};

const isUpToDate = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_BANK_ACCOUNTS_SUCCESS:
      return true;
    default:
      return state;
  }
};

const isAdding = (state = false, action) => {
  switch (action.type) {
    case types.ADD_BANK_ACCOUNT_REQUEST:
      return true;
    case types.ADD_BANK_ACCOUNT_SUCCESS:
    case types.ADD_BANK_ACCOUNT_FAIL:
      return false;
    default:
      return state;
  }
};

const isAddModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.ADD_BANK_ACCOUNT_START:
      return true;
    case types.ADD_BANK_ACCOUNT_CANCEL:
    case types.ADD_BANK_ACCOUNT_SUCCESS:
    case types.ADD_BANK_ACCOUNT_FAIL:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  isFetching,
  isUpToDate,
  isAdding,
  isAddModalOpen
});
