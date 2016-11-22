import * as api from 'lib/api';
import * as types from './types';
import {getIsUpToDate} from './selectors';
import * as schema from 'schema/bankAccounts';
import {normalize} from 'normalizr';
import {addMessage} from 'modules/messages/actions';

export const fetchBankAccounts = () => {
  return async (dispatch, getState) => {
    const isUpToDate = getIsUpToDate(getState());
    if (isUpToDate) return;
    dispatch({
      type: types.FETCH_BANK_ACCOUNTS_REQUEST
    });
    try {
      const bankAccounts = await api.fetchBankAccounts();
      const normalized = normalize(bankAccounts.items, schema.arrayOfBankAccounts);
      dispatch({
        type: types.FETCH_BANK_ACCOUNTS_SUCCESS,
        byId: normalized.entities.bankAccounts,
        ids: normalized.result
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_BANK_ACCOUNTS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchBankAccounts());
        }
      }));
    }
  };
};

export const saveBankAccountStart = (bankAccountId) => ({
  type: types.SAVE_BANK_ACCOUNT_START,
  bankAccountId
});

export const saveBankAccountCancel = () => ({
  type: types.SAVE_BANK_ACCOUNT_CANCEL
});

export const saveBankAccount = ({id, iban, routingNumber, accountNumber, ...rest}) => {
  return async dispatch => {
    dispatch({
      type: types.SAVE_BANK_ACCOUNT_REQUEST
    });
    try {
      const bankAccount = await api[id ? 'updateBankAccount' : 'createBankAccount']({
        number: iban || routingNumber + accountNumber,
        id,
        ...rest
      });
      const normalized = normalize(bankAccount, schema.bankAccount);
      dispatch({
        type: types.SAVE_BANK_ACCOUNT_SUCCESS,
        byId: normalized.entities.bankAccounts,
        bankAccountId: normalized.result
      });
      dispatch(addMessage({
        style: 'success',
        text: 'Your bank account has been successfully added'
      }));
    } catch (error) {
      dispatch({
        type: types.SAVE_BANK_ACCOUNT_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};

export const deleteBankAccountStart = (bankAccountId) => ({
  type: types.DELETE_BANK_ACCOUNT_START,
  bankAccountId
});

export const deleteBankAccountCancel = () => ({
  type: types.DELETE_BANK_ACCOUNT_CANCEL
});

export const deleteBankAccount = (bankAccountId) => {
  return async dispatch => {
    dispatch({
      type: types.DELETE_BANK_ACCOUNT_REQUEST
    });
    try {
      await api.deleteBankAccount(bankAccountId);
      dispatch({
        type: types.DELETE_BANK_ACCOUNT_SUCCESS,
        bankAccountId
      });
      dispatch(addMessage({
        text: 'Bank account was deleted',
        style: 'success'
      }));
    } catch (error) {
      dispatch({
        type: types.DELETE_BANK_ACCOUNT_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};
