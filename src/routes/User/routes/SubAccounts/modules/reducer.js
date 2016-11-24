import * as types from './types';
import {mergeArrays} from 'lib/utils';
import {combineReducers} from 'redux';
import {FETCH_USER_REQUEST} from 'routes/User/modules/types';
export const stateKey = 'UserSubAccounts';

const subAccountIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return [];
    case types.SYNC_USER_SUCCESS:
    case types.FETCH_USER_SUB_ACCOUNTS_SUCCESS:
      return mergeArrays(state, action.ids);
    default:
      return state;
  }
};

const subAccountsById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {};
    case types.SYNC_USER_SUCCESS:
    case types.FETCH_USER_SUB_ACCOUNTS_SUCCESS:
      return {...state, ...action.byId};
    case types.UPDATE_USER_SUB_ACCOUNT_SUCCESS:
      return {
        ...state,
        [action.subAccountId]: {
          ...state[action.subAccountId],
          ...action.byId[action.subAccountId]
        }
      };
    default:
      return state;
  }
};

const bankAccountIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return [];
    case types.FETCH_USER_BANK_ACCOUNTS_SUCCESS:
      return mergeArrays(state, action.ids);
    default:
      return state;
  }
};



const bankAccountsById = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {};
    case types.FETCH_USER_BANK_ACCOUNTS_SUCCESS:
      return {...state, ...action.byId};
    default:
      return state;
  }
};

const isSyncing = (state = false, action) => {
  switch (action.type) {
    case types.SYNC_USER_REQUEST:
      return true;
    case types.SYNC_USER_SUCCESS:
    case types.SYNC_USER_FAIL:
      return false;
    default:
      return state;
  }
};

const isFetchingSubAccounts = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_USER_SUB_ACCOUNTS_REQUEST:
      return true;
    case types.FETCH_USER_SUB_ACCOUNTS_SUCCESS:
    case types.FETCH_USER_SUB_ACCOUNTS_FAIL:
      return false;
    default:
      return state;
  }
};

const isFetchingBankAccounts = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_USER_BANK_ACCOUNTS_REQUEST:
      return true;
    case types.FETCH_USER_BANK_ACCOUNTS_SUCCESS:
    case types.FETCH_USER_BANK_ACCOUNTS_FAIL:
      return false;
    default:
      return state;
  }
};

const isSubAccountsUpToDate = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_USER_SUB_ACCOUNTS_REQUEST:
      return true;
    case FETCH_USER_REQUEST:
      return false;
    default:
      return state;
  }
};

const isBankAccountsUpToDate = (state = false, action) => {
  switch (action.type) {
    case types.FETCH_USER_BANK_ACCOUNTS_REQUEST:
      return true;
    case FETCH_USER_REQUEST:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isSyncing,
  isFetchingBankAccounts,
  isFetchingSubAccounts,
  subAccountIds,
  subAccountsById,
  bankAccountIds,
  bankAccountsById,
  isSubAccountsUpToDate,
  isBankAccountsUpToDate
});

