import * as api from 'lib/api';
import * as types from './types';
import * as schema from 'schema/transactions';
import {PAGE_LIMIT} from 'lib/constants';
import {addMessage} from 'modules/messages/actions';
import {normalize} from 'normalizr';
import {getPage} from './selectors';

export const fetchTransactions = (from, to, page, forceRefresh = false) => {
  return async(dispatch, getState) => {
    const previous = getPage(getState());

    // prevent double requests
    if (!forceRefresh && page === previous.page && from === previous.from && to === previous.to) {
      return;
    }

    // if we selected a new Date, let's clear the current list
    if (forceRefresh) {
      dispatch({type: types.CLEAR_TRANSACTIONS});
    }

    dispatch({type: types.FETCH_TRANSACTIONS_REQUEST, from, to, page});
    try {
      const transactions = await api.fetchTransactions({from, to, page, limit: PAGE_LIMIT});
      const normalized = normalize(transactions.items, schema.arrayOfTransactions);
      dispatch({
        type: types.FETCH_TRANSACTIONS_SUCCESS,
        byId: normalized.entities.transactions,
        ids: normalized.result,
        nextPage: transactions.nextPage,
        prevPage: transactions.prevPage,
        page,
        from,
        to
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_TRANSACTIONS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchTransactions(from, to, page, true));
        }
      }));
    }
  };
};

export const viewTransactionStart = (transactionId) => ({
  type: types.VIEW_TRANSACTIONS_START,
  transactionId
});

export const viewTransactionCancel = () => ({
  type: types.VIEW_TRANSACTIONS_CANCEL
});
