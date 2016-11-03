import * as api from 'lib/api';
import * as types from './types';
import {getIsUpToDate} from './selectors';
import * as schema from 'schema/bankAccounts';
import {normalize} from 'normalizr';
import {addMessage} from 'modules/messages/actions';

export const addBankAccountStart = () => ({
  type: types.ADD_BANK_ACCOUNT_START
});

export const addBankAccountCancel = () => ({
  type: types.ADD_BANK_ACCOUNT_CANCEL
});

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

export const addBankAccount = ({iban, routingNumber, accountNumber, country, currency}) => {
  return async dispatch => {
    dispatch({
      type: types.ADD_BANK_ACCOUNT_REQUEST
    });
    try {
      const bankAccount = await api.createBankAccount({
        number: iban || routingNumber + accountNumber,
        country,
        currency
      });
      dispatch({
        type: types.ADD_BANK_ACCOUNT_SUCCESS
      });
      dispatch(addMessage({
        style: 'success',
        text: 'Your bank account has been successfully added'
      }));
    } catch (error) {
      dispatch({
        type: types.ADD_BANK_ACCOUNT_FAIL
      });
      dispatch(addMessage({text: error}));
    }
  };
};
