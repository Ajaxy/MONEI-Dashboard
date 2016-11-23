import * as types from './types';
import {combineReducers} from 'redux';
import {mergeArrays} from 'lib/utils';

export const stateKey = 'profileBankAccounts';

const ids = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_BANK_ACCOUNTS_SUCCESS:
      return [...action.ids];
    case types.SAVE_BANK_ACCOUNT_SUCCESS:
      return mergeArrays(state, [action.bankAccountId]);
    case types.DELETE_BANK_ACCOUNT_SUCCESS:
      let index = state.indexOf(action.bankAccountId);
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
    case types.FETCH_BANK_ACCOUNTS_SUCCESS:
      return {...action.byId};
    case types.SAVE_BANK_ACCOUNT_SUCCESS:
      return {...state, ...action.byId};
    case types.DELETE_BANK_ACCOUNT_SUCCESS:
      const newState = {...state};
      delete newState[action.bankAccountId];
      return newState;
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

const isSaving = (state = false, action) => {
  switch (action.type) {
    case types.SAVE_BANK_ACCOUNT_REQUEST:
      return true;
    case types.SAVE_BANK_ACCOUNT_SUCCESS:
    case types.SAVE_BANK_ACCOUNT_FAIL:
      return false;
    default:
      return state;
  }
};

const isSaveModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.SAVE_BANK_ACCOUNT_START:
      return true;
    case types.SAVE_BANK_ACCOUNT_CANCEL:
    case types.SAVE_BANK_ACCOUNT_SUCCESS:
    case types.SAVE_BANK_ACCOUNT_FAIL:
      return false;
    default:
      return state;
  }
};

const isDeleting = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_BANK_ACCOUNT_REQUEST:
      return true;
    case types.DELETE_BANK_ACCOUNT_SUCCESS:
    case types.DELETE_BANK_ACCOUNT_FAIL:
      return false;
    default:
      return state;
  }
};

const isDeleteModalOpen = (state = false, action) => {
  switch (action.type) {
    case types.DELETE_BANK_ACCOUNT_START:
      return true;
    case types.DELETE_BANK_ACCOUNT_SUCCESS:
    case types.DELETE_BANK_ACCOUNT_FAIL:
    case types.DELETE_BANK_ACCOUNT_CANCEL:
      return false;
    default:
      return state;
  }
};

const activeId = (state = null, action) => {
  switch (action.type) {
    case types.DELETE_BANK_ACCOUNT_START:
    case types.SAVE_BANK_ACCOUNT_START:
      return action.bankAccountId;
    case types.DELETE_BANK_ACCOUNT_SUCCESS:
    case types.DELETE_BANK_ACCOUNT_CANCEL:
    case types.SAVE_BANK_ACCOUNT_SUCCESS:
    case types.SAVE_BANK_ACCOUNT_CANCEL:
      return null;
    default:
      return state;
  }
};

export default combineReducers({
  ids,
  byId,
  isFetching,
  isUpToDate,
  isSaving,
  isDeleting,
  isSaveModalOpen,
  isDeleteModalOpen,
  activeId
});
