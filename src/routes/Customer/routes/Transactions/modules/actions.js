import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/transactions';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';

export const fetchTransactions = (customerId, {page, limit, forceRefresh = false}) => {
  return async dispatch => {
    if (forceRefresh) {
      dispatch({type: types.CLEAR_C_TRANSACTIONS});
    }
    dispatch({type: types.FETCH_C_TRANSACTIONS_REQUEST});
    try {
      const transactions = await api.fetchCustomerTransactions(customerId, {page, limit: PAGE_LIMIT});
      const normalized = normalize(transactions.items, schema.arrayOfTransactions);
      dispatch({
        type: types.FETCH_C_TRANSACTIONS_SUCCESS,
        byId: normalized.entities.transactions,
        ids: normalized.result,
        nextPage: transactions.nextPage,
        prevPage: transactions.prevPage
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_C_TRANSACTIONS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchTransactions(customerId, {page, limit, forceRefresh}));
        }
      }));
    }
  };
};
