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

const subAccountIds = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_USER_REQUEST:
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
    case types.FETCH_USER_REQUEST:
      return {};
    case types.SYNC_USER_SUCCESS:
    case types.FETCH_USER_SUB_ACCOUNTS_SUCCESS:
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

export default combineReducers({
  isFetching,
  isUpdating,
  isUpToDate,
  subAccountIds,
  subAccountsById,
  isSyncing,
  isFetchingSubAccounts
});

