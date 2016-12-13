import * as api from 'lib/api';
import * as types from './types';
import * as subSchema from 'schema/subAccounts';
import * as bankSchema from 'schema/bankAccounts';
import {copyTextToClipboard} from 'lib/utils';
import {getIsBankAccountsUpToDate, getIsSubAccountsUpToDate} from './selectors';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

export const copyToClipboard = (text, name) => dispatch => {
  copyTextToClipboard(text);
  dispatch(addMessage({
    text: `${name} copied to clipboard`,
    style: 'success'
  }));
};

export const syncUser = (userId, {mid, smid}) => {
  return async dispatch => {
    dispatch({type: types.SYNC_USER_REQUEST});
    try {
      const result = await api.syncUser(userId, {mid, smid});
      const normalized = normalize(
        result,
        subSchema.arrayOfSubAccounts
      );
      dispatch({
        type: types.SYNC_USER_SUCCESS,
        byId: normalized.entities.subAccounts,
        ids: normalized.result
      });
      dispatch(addMessage({
        text: 'User was synchronised',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.SYNC_USER_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(syncUser(userId, mid));
        }
      }));
    }
  };
};

export const fetchSubAccounts = (userId) => {
  return async(dispatch, getState) => {
    const isUpToDate = getIsSubAccountsUpToDate(getState());
    if (isUpToDate) return;
    dispatch({type: types.FETCH_USER_SUB_ACCOUNTS_REQUEST});
    try {
      const subAccounts = await api.fetchUserSubAccounts(userId);
      const normalized = normalize(
        subAccounts.items,
        subSchema.arrayOfSubAccounts
      );
      dispatch({
        type: types.FETCH_USER_SUB_ACCOUNTS_SUCCESS,
        byId: normalized.entities.subAccounts,
        ids: normalized.result
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_USER_SUB_ACCOUNTS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(syncUser(userId));
        }
      }));
    }
  };
};

export const updateSubAccountStart = (subAccountId) => ({
  type: types.UPDATE_USER_SUB_ACCOUNT_START,
  subAccountId
});

export const updateSubAccountCancel = () => ({
  type: types.UPDATE_USER_SUB_ACCOUNT_CANCEL
});

export const updateSubAccount = (userId, subAccountId, data) => {
  return async dispatch => {
    dispatch({type: types.UPDATE_USER_SUB_ACCOUNT_REQUEST});
    try {
      const subAccount = await api.updateUserSubAccount(userId, subAccountId, data);
      const normalized = normalize(subAccount, subSchema.subAccount);
      dispatch({
        type: types.UPDATE_USER_SUB_ACCOUNT_SUCCESS,
        byId: normalized.entities.subAccounts,
        subAccountId: normalized.result
      });
      dispatch(addMessage({
        text: 'Sub account was updated.',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.UPDATE_USER_SUB_ACCOUNT_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(syncUser(userId));
        }
      }));
    }
  };
};

export const fetchBankAccounts = (userId) => {
  return async(dispatch, getState) => {
    const isUpToDate = getIsBankAccountsUpToDate(getState());
    if (isUpToDate) return;
    dispatch({type: types.FETCH_USER_BANK_ACCOUNTS_REQUEST});
    try {
      const bankAccounts = await api.fetchUserBankAccounts(userId);
      const normalized = normalize(
        bankAccounts.items,
        bankSchema.arrayOfBankAccounts
      );
      dispatch({
        type: types.FETCH_USER_BANK_ACCOUNTS_SUCCESS,
        byId: normalized.entities.bankAccounts,
        ids: normalized.result
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_USER_BANK_ACCOUNTS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(syncUser(userId));
        }
      }));
    }
  };
};

export const confirmBankAccount = (userId, subAccountId) => {
  return async dispatch => {
    dispatch({type: types.CONFIRM_USER_BANK_ACCOUNT_REQUEST});
    try {
      const subAccount = await api.confirmUserBankAccount(userId, subAccountId);
      console.log(subAccount);
      const normalized = normalize(subAccount, subSchema.subAccount);
      dispatch({
        type: types.CONFIRM_USER_BANK_ACCOUNT_SUCCESS,
        byId: normalized.entities.subAccounts,
        subAccountId: normalized.result
      });
      dispatch(addMessage({
        text: 'Sub account was updated.',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.CONFIRM_USER_BANK_ACCOUNT_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(confirmBankAccount(userId, subAccountId));
        }
      }));
    }
  };
};

