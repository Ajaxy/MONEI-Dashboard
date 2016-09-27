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

    // if we selected a new Date, let's clear the current list
    if(!page || from !== previous.from || to !== previous.to || forceRefresh) {
      dispatch({type: types.CLEAR_TRANSACTIONS});
    }

    dispatch({type: types.FETCH_TRANSACTIONS_REQUEST});
    try {
      const transactions = await api.fetchTransactions({from, to, page});
      const normalized = normalize(transactions.items, schema.arrayOfTransactions);
      dispatch({
        type: types.FETCH_TRANSACTIONS_SUCCESS,
        byId: normalized.entities.transactions,
        ids: normalized.result,
        nextPage: transactions.nextPage,
        from,
        to,
      });
    } catch (error) {
      dispatch({
        type: types.FETCH_TRANSACTIONS_FAIL
      });
      dispatch(addMessage({
        text: error,
        onRetry() {
          dispatch(fetchTransactions(page, true));
        }
      }));
    }
  };
};
